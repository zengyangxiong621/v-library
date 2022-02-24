import * as React from 'react';
import { unique, getMaxDistance } from './utils';


interface Props {
  tag: keyof JSX.IntrinsicElements
  style: React.CSSProperties
  lineStyle: React.CSSProperties,
  directions: Array<Direction>
  threshold: number,
  className: string,
  activeClassName: string,
  limit: boolean,
}

interface State {
  vLines: Array<AlignToken>
  hLines: Array<AlignToken>
  indices: Array<Number>
}

type AlignToken = {
  $: Element,
  i: number
  // 长度
  length: number
  // 辅助线起点坐标
  origin: number
  // 辅助线坐标
  value: number
}

type DraggableElement = {
  $: Element,
  i: number,
  x: number,
  y: number,
  w: number,
  h: number,
  l: number,
  r: number,
  t: number,
  b: number,
  clr: number,
  ctb: number,
}


type Grid = {
  x: number,
  y: number,
}

type GridKey = keyof Grid
//                左左  | 右右 | 横向中间 | 左右 | 右左
type DirectionX = 'll' | 'rr' | 'clr' | 'lr' | 'rl'
//                上上  | 下下 | 竖向中间 | 上下 | 下上
type DirectionY = 'tt' | 'bb' | 'ctb' | 'tb' | 'bt'

type Direction = DirectionY | DirectionX

export class DraggableContainer extends React.Component<Props, State> {
  // container HTMLElement
  $: HTMLElement | null = null;
  // children HTMLElement
  $children: Array<DraggableElement> = [];

  static defaultProps = {
    tag: 'div',
    style: {},
    directions: ['tt', 'bb', 'll', 'rr', 'ctb', 'clr', 'lr', 'rl', 'tb', 'bt'],
    threshold: 5,
    className: '',
    activeClassName: 'active',
    limit: true,
    lineStyle: {},
  };

  state: State = {
    indices: [],
    vLines: [],
    hLines: [],
  };

  initialize = () => {
    if (Array.isArray(this.props.children)) {
      this.$children = this.props.children.map((_, i) => {
        // const $ = this.$.childNodes[i]
        const $ = this.$!.children[i];
        const x = Number($.getAttribute('data-x'));
        const y = Number($.getAttribute('data-y'));
        const w = $.clientWidth;
        const h = $.clientHeight;

        const draggableElement: DraggableElement = {
          $,
          i,
          x,
          y,
          w,
          h,
          l: x,
          r: x + w,
          t: y,
          b: y + h,
          clr: x + w / 2,
          ctb: y + h / 2,
        };

        return draggableElement;
      });
    }
  };

  reset = () => {
    this.setState({ vLines: [], hLines: [], indices: [] });
  };

  // 拖动中计算是否吸附/显示辅助线
  calc = (index: number) => {
    return (x: number, y: number) => {
      const target = this.$children[index];
      const compares = this.$children.filter((_, i) => i !== index);

      if (this.props.limit) {
        const { limitX, limitY } = this.checkDragOut({ x, y }, target);
        x = limitX;
        y = limitY;
      }

      if (compares.length === 0) {
        return { x, y };
      }

      return this.calcAndDrawLines({ x, y }, target, compares);
    };
  };

  /**
   * @param {Object} values xy坐标
   * @param {Object} target 拖拽目标
   * @param {Array} compares 对照组
   */
  calcAndDrawLines (values: Grid, target: DraggableElement, compares: Array<DraggableElement>) {
    const { v: x, indices: indices_x, lines: vLines } = this.calcPosValues(values, target, compares, 'x');
    const { v: y, indices: indices_y, lines: hLines } = this.calcPosValues(values, target, compares, 'y');

    const indices = unique(indices_x.concat(indices_y));

    // https://github.com/zcued/react-dragline/issues/9
    if (vLines.length && hLines.length) {
      vLines.forEach(line => {
        const compare = compares.find(({ i }) => i === line.i);
        const { length, origin } = this.calcLineValues({ x, y }, target, compare, 'x');

        line.length = length;
        line.origin = origin;
      });


      hLines.forEach(line => {
        const compare = compares.find(({ i }) => i === line.i);
        const { length, origin } = this.calcLineValues({ x, y }, target, compare, 'y');

        line.length = length;
        line.origin = origin;
      });
    }

    this.setState({
      vLines,
      hLines,
      indices,
    });

    return { x, y };
  }

  calcLineValues (
    values: Grid,
    target: DraggableElement,
    compare: any,
    key: GridKey,
  ) {
    const { x, y } = values;
    const { h: H, w: W } = target;
    const { l, r, t, b } = compare;
    const
      T = y,
      B = y + H,
      L = x,
      R = x + W;

    const direValues = {
      x: [t, b, T, B],
      y: [l, r, L, R],
    };

    const length = getMaxDistance(direValues[key]);
    const origin = Math.min(...direValues[key]);
    return { length, origin };
  }

  calcPosValues (values: Grid, target: DraggableElement, compares: Array<DraggableElement>, key: GridKey) {
    const results: { [key: number]: Array<AlignToken> } = {};

    const directions: {
      x: Array<DirectionX>
      y: Array<DirectionY>
    } = {
      x: ['ll', 'rr', 'clr', 'lr', 'rl'],
      y: ['tt', 'bb', 'ctb', 'tb', 'bt'],
    };

    // filter unnecessary directions
    const current: Direction[] = directions[key];
    const validDirections = current.filter(dire => this.props.directions.includes(dire));
    compares.forEach((compare) => {
      validDirections.forEach(dire => {
        const { near, dist, value, origin, length } = this.calcPosValuesSingle(values, dire, target, compare, key);
        if (near) {
          const alignToken: AlignToken = { i: compare.i, $: compare.$, value, origin, length };
          if (Array.isArray(results[dist])) {
            results[dist].push(alignToken);
          } else {
            results[dist] = [alignToken];
          }
        }
      });
    });

    const resultArray = Object.entries(results);
    if (resultArray.length) {
      const [minDistance, activeCompares] = resultArray.sort(([d1], [d2]) => Math.abs(parseInt(d1)) - Math.abs(parseInt(d2)))[0];

      const dist = parseInt(minDistance);

      return {
        v: values[key] - dist,
        dist: dist,
        lines: activeCompares,
        indices: activeCompares.map(({ i }) => i),
      };
    }

    return {
      v: values[key],
      dist: 0,
      lines: [],
      indices: [],
    };
  }

  calcPosValuesSingle (
    values: Grid,
    dire: Direction,
    target: DraggableElement,
    compare: DraggableElement,
    key: GridKey,
  ) {

    const { x, y } = values;
    const W = target.w;
    const H = target.h;
    const { l, r, t, b, clr, ctb } = compare;
    const { origin, length } = this.calcLineValues({ x, y }, target, compare, key);

    const result = {
      // 距离是否达到吸附阈值
      near: false,
      // 距离差
      dist: Number.MAX_SAFE_INTEGER,
      // 辅助线坐标
      value: 0,
      // 辅助线长度
      length,
      // 辅助线起始坐标（对应绝对定位的top/left）
      origin,
    };

    switch (dire) {
      case 'clr': // 横向中间
        result.dist = x + W / 2 - clr;
        result.value = clr;
        break;
      case 'll': // 左左
        result.dist = x - l;
        result.value = l;
        break;
      case 'rr': // 右右
        result.dist = x + W - r;
        result.value = r;
        break;
      case 'lr': // 左右 // 前为己
        result.dist = x - l + W;
        result.value = l;
        break;
      case 'rl': // 右左 // 前为己
        result.dist = x - r;
        result.value = r;
        break;
      case 'ctb':
        result.dist = y + H / 2 - ctb;
        result.value = ctb;
        break;
      case 'tt':
        result.dist = y - t;
        result.value = t;
        break;
      case 'bb':
        result.dist = y + H - b;
        result.value = b;
        break;
      case 'tb': // 上下
        result.dist = y - b;
        result.value = b;
        break;
      case 'bt':
        result.dist = y - t + H;
        result.value = t;
        break;

    }
    if (Math.abs(result.dist) < this.props.threshold + 1) {
      result.near = true;
    }

    return result;
  }

  // 检查是否拖出容器
  checkDragOut ({ x, y }: { x: number, y: number }, target: DraggableElement) {
    const maxLeft = this.$!.clientWidth - target.w;
    const maxTop = this.$!.clientHeight - target.h;

    let limitX = x;
    let limitY = y;

    if (x < 0) {
      limitX = 0;
    } else if (x > maxLeft) {
      limitX = maxLeft;
    }

    if (y < 0) {
      limitY = 0;
    }
    if (y > maxTop) {
      limitY = maxTop;
    }

    console.log('');

    return { limitX, limitY };
  }

  _renderGuideLine () {
    const { vLines, hLines } = this.state;
    const { lineStyle } = this.props;
    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: '#FF00CC',
      ...lineStyle,
    };

    // support react 15
    const Fragment = React.Fragment || 'div';

    return (
      <Fragment>
        {vLines.map(({ length, value, origin }, i) => (
          <span
            className="v-line"
            key={`v-${i}`}
            style={{ left: value, top: origin, height: length, width: 1, ...commonStyle }}
          />
        ))}
        {hLines.map(({ length, value, origin }, i) => (
          <span
            className="h-line"
            key={`h-${i}`}
            style={{ top: value, left: origin, width: length, height: 1, ...commonStyle }}
          />
        ))}
      </Fragment>
    );
  }

  _renderChildren () {
    const { activeClassName, children } = this.props;
    const { indices } = this.state;

    return React.Children.map(children as any, (child: React.ReactElement, index) => {
      return React.cloneElement(child, {
        _start: this.initialize,
        _drag: this.calc(index),
        _stop: this.reset,
        active: indices.includes(index),
        activeClassName,
      });
    });
  }

  render () {
    const { tag, style } = this.props;
    const Wrapper = tag as 'div';

    return (
      <Wrapper
        style={style}
        ref={ref => this.$ = ref}
      >
        {this._renderChildren()}
        {this._renderGuideLine()}
      </Wrapper>
    );
  }
}
