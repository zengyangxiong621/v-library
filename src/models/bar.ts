/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */
import {
  findLayerById,
  findParentNode,
  calculateGroupPosition,
  findNode,
  moveChildrenComponents,
  mergeComponentLayers,
  layerComponentsFlat,
  calcGroupPosition,
  handleLayersStatus,
} from "../utils";

import {
  ILayerComponent,
  ILayerGroup,
} from "../routes/dashboard/center/components/CustomDraggable/type";

import {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  // copy,
  lock,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
  hidden,
} from "../utils/sideBar";
import { DIMENSION } from "../routes/dashboard/center/constant";

import { generateLayers } from "./utils/generateLayers";
import { myFetch } from "./utils/request";

interface IBarState {
  key: string[];
  isFolder: boolean;
  operate: string;
  lastRightClick: string;
  treeData: any[];
  components: any[];
  isSupportMultiple: boolean;
  selectedComponentOrGroup: any[];
  selectedComponentIds: string[];
  componentLayers: any;
  selectedComponentRefs: any;
  selectedComponentDOMs: any;
  supportLinesRef: any;
  scaleDragCompRef: any;
  selectedComponents: any;
  scaleDragData: any;
  componentConfig: any;
  isMultipleTree: boolean;
  allComponentRefs: any;
  allComponentDOMs: any;
  isAreaChoose: boolean;
  rulerLines: Array<{
    position: {
      x: number;
      y: number;
    };
    direction: "horizon" | "vertical";
    display: "none" | "block";
  }>;
  currentDblTimes: number;
}

export default {
  namespace: "bar",
  state: {
    currentDblTimes: 0,
    key: [],
    isFolder: false,
    lastRightClick: "",
    isMultipleTree: true,
    operate: "",
    treeData: [],
    selectedComponentOrGroup: [],
    isSupportMultiple: false,
    selectedComponentIds: [],
    allComponentRefs: {},
    allComponentDOMs: {},
    selectedComponents: [],
    selectedComponentRefs: {},
    selectedComponentDOMs: {},
    dragStatus: "",
    supportLinePositionInfo: {
      x: 100,
      y: 200,
    },
    supportLinesRef: null,
    scaleDragCompRef: null,
    scaleDragData: {
      position: {
        x: 0,
        y: 0,
      },
      style: {
        display: "none",
        width: 100,
        height: 100,
      },
    },
    components: [
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 100,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 100,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-2", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 200,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 200,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-3", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 300,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 300,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-2", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 400,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 400,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-3", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 500,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 500,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-1-2", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 600,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 600,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-1-3", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 700,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 800,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-1-1-2", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
      {
        config: [
          // 样式配置
          {
            name: "dimension",
            displayName: "位置尺寸",
            type: "dimensionGroup",
            config: {
              lock: false,
            },
            value: [
              {
                name: "left",
                displayName: "X轴坐标",
                value: 800,
                type: "number",
                config: {
                  suffix: "X",
                },
              },
              {
                name: "top",
                displayName: "Y轴坐标",
                value: 800,
                type: "number",
                config: {
                  suffix: "Y",
                },
              },
              {
                name: "width",
                displayName: "宽度",
                value: 100,
                type: "number",
                config: {
                  suffix: "W",
                },
              },
              {
                name: "height",
                displayName: "高度",
                value: 100,
                type: "number",
                config: {
                  suffix: "H",
                },
              },
            ],
          },
          {
            name: "hideDefault",
            displayName: "默认隐藏",
            type: "checkBox",
            value: false,
          },
          {
            name: "textStyle",
            displayName: "文本样式",
            type: "textFullStyleGroup",
            value: [
              {
                name: "fontFamily",
                displayName: "",
                value: "Microsoft Yahei",
              },
              {
                name: "fontSize",
                displayName: "",
                value: 32,
              },
              {
                name: "color",
                displayName: "",
                type: "color",
                value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
              },
              {
                name: "bold",
                displayName: "",
                value: false,
              },
              {
                name: "italic",
                displayName: "",
                value: false,
              },
              {
                name: "letterSpacing",
                displayName: "字距",
                value: 0,
              },
              {
                name: "lineHeight",
                displayName: "行距",
                value: "unset",
              },
            ],
          },
          {
            name: "align",
            displayName: "对齐方式",
            type: "alignFull",
            value: [
              {
                name: "textAlign",
                displayName: "水平对齐",
                type: "align",
                value: "left", // left , center, right,bothEnds
              },
              {
                name: "textVertical",
                displayName: "垂直对齐",
                type: "vertical",
                value: "top", // top bottom vertical
              },
            ],
          },
          {
            name: "shadow",
            displayName: "阴影",
            type: "collapse",
            hasSwitch: true,
            defaultExpand: true,
            value: [
              {
                name: "show",
                displayName: "",
                value: true,
                type: "switch",
              },
              {
                name: "shadow",
                displayName: "外阴影",
                type: "boxShadow",
                value: {
                  color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                  vShadow: 0, // 垂直阴影的位置
                  hShadow: 0, // 水平阴影的位置
                  blur: 8, // 模糊的距离
                },
              },
            ],
          },
        ],
        dataConfig: {}, //数据源配置
        dataType: "static", //数据类型：static;mysql;api;clickhouse
        id: "components_1-1-1-1-3", //组件ID
        moduleName: "textV2", //组件标识
        moduleVersion: "1.1.0", //组件版本号
        name: "标题", //图层名称
        parent: "", //组件父级配置
        dashboardId: "11", //画布id
        staticData: {
          //静态数据
          data: [
            {
              text: "我是文字组件111",
            },
          ],
          fields: [
            {
              name: "text",
              value: "text",
              desc: "文本",
              status: true, // 状态
            },
          ],
        },
        interaction: {
          // 交互
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
    ],
    componentLayers: [],
    treeRef: null,
    canvasScaleValue: 0,
    pageConfig: [
      {
        name: "recommend",
        displayName: "屏幕大小",
        value: "0",
        options: [
          {
            name: "大屏推荐尺寸1920*1080",
            value: "0",
          },
          {
            name: "web最常见尺寸1366*768",
            value: "1",
          },
          {
            name: "web最小尺寸1024*768",
            value: "2",
          },
          {
            name: "自定义",
            value: "4",
          },
        ],
        width: 1920,
        height: 1080,
      },
      {
        name: "styleColor",
        displayName: "背景",
        value: "#222430", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
      },
      {
        name: "backgroundImg",
        displayName: "背景图",
        value: "", // 有背景图则返回背景图的url，没有背景图返回空或者null
      },
      {
        name: "gridSpacing",
        displayName: "栅格间距",
        value: 5,
        type: "number",
        config: {
          min: 0,
          step: 1,
          suffix: "", // 输入框后缀
        },
      },
      {
        name: "zoom",
        displayName: "缩放设置",
        value: "0",
        type: "radioGroup",
        direction: "vertical", // 方向
        options: [
          {
            name: "按屏幕比例适配",
            value: "0",
          },
          {
            name: "强制铺满",
            value: "1",
          },
          {
            name: "原比例展示溢出滚动",
            value: "2",
          },
        ],
      },
    ],
    groupConfig: [
      {
        name: "dimension",
        displayName: "位置尺寸",
        type: "dimensionGroup",
        config: {
          lock: false,
        },
        value: [
          {
            name: "left",
            displayName: "X轴坐标",
            value: 900,
            type: "number",
            config: {
              suffix: "X",
            },
          },
          {
            name: "top",
            displayName: "Y轴坐标",
            value: 900,
            type: "number",
            config: {
              suffix: "Y",
            },
          },
          {
            name: "width",
            displayName: "宽度",
            value: 100,
            type: "number",
            config: {
              suffix: "W",
            },
          },
          {
            name: "height",
            displayName: "高度",
            value: 100,
            type: "number",
            config: {
              suffix: "H",
            },
          },
        ],
      },
      {
        name: "hideDefault",
        displayName: "默认隐藏",
        value: false,
        type: "checkBox",
      },
      {
        name: "opacity",
        displayName: "透明度",
        value: 0.7,
        type: "range",
        config: {
          min: 0,
          max: 1,
          step: 0.01,
          suffix: "%", // 输入框后缀
        },
      },
      {
        name: "interaction",
        displayName: "交互",
        value: {
          // 该部分实际上来自于layers设置
          mountAnimation: {
            // 如果不存在载入动画，该项为null
            delay: 2, // 延迟
            direction: "right", // 方向
            duration: 304, // 持续时间(ms)
            opacityOpen: true, // 渐隐渐现
            timingFunction: "ease", // 速率
            type: "slide", // 动画类型
          },
        },
      },
    ],
    componentConfig: {
      config: [
        // 样式配置
        {
          name: "dimension",
          displayName: "位置尺寸",
          type: "dimensionGroup",
          config: {
            lock: false,
          },
          value: [
            {
              name: "left",
              displayName: "X轴坐标",
              value: 1000,
              type: "number",
              config: {
                suffix: "X",
              },
            },
            {
              name: "top",
              displayName: "Y轴坐标",
              value: 1000,
              type: "number",
              config: {
                suffix: "Y",
              },
            },
            {
              name: "width",
              displayName: "宽度",
              value: 100,
              type: "number",
              config: {
                suffix: "W",
              },
            },
            {
              name: "height",
              displayName: "高度",
              value: 100,
              type: "number",
              config: {
                suffix: "H",
              },
            },
          ],
        },
        {
          name: "hideDefault",
          displayName: "默认隐藏",
          type: "checkBox",
          value: false,
        },
        {
          name: "textStyle",
          displayName: "文本样式",
          type: "textFullStyleGroup",
          value: [
            {
              name: "fontFamily",
              displayName: "",
              value: "Microsoft Yahei",
            },
            {
              name: "fontSize",
              displayName: "",
              value: 32,
            },
            {
              name: "color",
              displayName: "",
              type: "color",
              value: "#000", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            },
            {
              name: "bold",
              displayName: "",
              value: false,
            },
            {
              name: "italic",
              displayName: "",
              value: false,
            },
            {
              name: "letterSpacing",
              displayName: "字距",
              value: 0,
            },
            {
              name: "lineHeight",
              displayName: "行距",
              value: 48,
            },
          ],
        },
        {
          name: "align",
          displayName: "对齐方式",
          type: "alignFull",
          value: [
            {
              name: "textAlign",
              displayName: "水平对齐",
              type: "align",
              value: "left", // left , center, right,bothEnds
            },
            {
              name: "textVertical",
              displayName: "垂直对齐",
              type: "vertical",
              value: "top", // top bottom vertical
            },
          ],
        },
        {
          name: "shadow",
          displayName: "阴影",
          type: "collapse",
          hasSwitch: true,
          defaultExpand: true,
          value: [
            {
              name: "show",
              displayName: "",
              value: true,
              type: "switch",
            },
            {
              name: "shadow",
              displayName: "外阴影",
              type: "boxShadow",
              value: {
                color: "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                vShadow: 0, // 垂直阴影的位置
                hShadow: 0, // 水平阴影的位置
                blur: 8, // 模糊的距离
              },
            },
          ],
        },
      ],
      dataConfig: {}, //数据源配置
      dataType: "static", //数据类型：static;mysql;api;clickhouse
      id: 111, //组件ID
      moduleName: "textV2", //组件标识
      moduleVersion: "1.1.0", //组件版本号
      name: "标题", //图层名称
      parent: "", //组件父级配置
      dashboardId: "11", //画布id
      staticData: {
        //静态数据
        data: [
          {
            text: "我是文字组件111",
          },
        ],
        fields: [
          {
            name: "text",
            value: "text",
            desc: "文本",
            status: true, // 状态
          },
        ],
      },
      interaction: {
        // 交互
        mountAnimation: {
          // 如果不存在载入动画，该项为null
          delay: 2, // 延迟
          direction: "right", // 方向
          duration: 304, // 持续时间(ms)
          opacityOpen: true, // 渐隐渐现
          timingFunction: "ease", // 速率
          type: "slide", // 动画类型
        },
      },
    },
    sizeChange: {
      change: false,
      config: {
        left: 100,
        top: 100,
        width: 100,
        height: 100,
      },
    },
    isAreaChoose: false,
    rulerLines: [
      {
        position: {
          x: 0,
          y: 0,
        },
        direction: "horizon",
        display: "block",
      },
      {
        position: {
          x: 0,
          y: 0,
        },
        direction: "vertical",
        display: "block",
      },
    ],
  } as IBarState,
  subscriptions: {
    init({ dispatch }: any) {
      const treeData = generateTreeData();
      dispatch({
        type: "initTreeData",
        payload: treeData,
      });
    },
    setup({ dispatch, history }: { dispatch: any; history: any }) {
      // eslint-disable-line
      history.listen((location: any) => {
        // console.log("location", location);
      });
    },
    onResize({ dispatch, history }: any) {
      window.onresize = (e) => {};
    },
    keyEvent({ dispatch, history }: any) {
      document.onkeydown = (e) => {};
    },
  },

  effects: {
    *group({ payload }: any, { call, put, select }: any): any {
      const tree: any = yield select(({ bar }: any) => bar.treeData);
      console.log("tree", tree);
      const { treeDataCopy, newLayerId }: any = yield group(tree, payload.key);
      console.log("newTree", treeDataCopy);
      console.log("nuew", newLayerId);
      yield put({
        type: "update",
        payload: treeDataCopy,
      });
      yield put({
        type: "bar/selectedNode",
        payload: {
          key: [newLayerId],
        },
      });
    },
    // 更改图层组织
    *update({ payload }: any, { call, put }: any) {
      console.log("更改");
      const { data } = yield myFetch("/visual/layer/update", {
        body: JSON.stringify({
          dashboardId: "1513702962304577537",
          layers: payload,
        }),
      });
      console.log("data", data);
      yield put({
        type: "updateTree",
        payload: data,
      });
    },
    // 修改图层属性图层
    *change({ payload }: any, { call, put }: any) {
      const { data } = yield myFetch("/visual/layer/change", {
        body: JSON.stringify({
          dashboardId: "1513702962304577537",
          configs: [
            {
              id: "1514070775583035393",
              key: "isShow",
              value: true,
            },
          ],
        }),
      });
      yield put({
        type: "updateTree",
        payload: data,
      });
    },
    // 添加组件到画布
    *addComponent({ payload }: any, { call, put }: any) {
      // 请求接口数据，获得component id
      // const componentId = yield call()
      // const componentId = "aabbcc";
      // const final: any = {
      //   componentId,
      //   name: payload.name,
      //   moduleName: payload.module_name,
      // };
      const componentId = "components_1-14";
      const final: any = {
        id: componentId,
        name: "新增的",
        moduleName: "新增的组件的标识",
      };
      yield put({
        type: "addLayer",
        payload: { final, insertId: payload.insertId },
      });
    },
    //
    *fetch({ payload }: any, { call, put }: any): any {
      // eslint-disable-line
      yield put({ type: "selectedNode", payload });
    },
    *chooseLayer({ payload }: any, { call, put }: any): any {
      yield put({
        type: "save",
        payload: {
          isAreaChoose: true,
        },
      });
      yield put({
        type: "clearLayersSelectedStatus",
      });
      yield put({
        type: "setSelectedKeys",
        payload,
      });
      yield put({
        type: "calcDragScaleData",
      });
    },
    *setKeys({ payload }: any, { call, put }: any): any {
      yield put({
        type: "clearLayersSelectedStatus",
      });
      yield put({
        type: "setNodeList",
        payload,
      });
      yield put({
        type: "calcDragScaleData",
      });
    },
  },

  reducers: {
    initTreeData(state: IBarState, { payload }: any) {
      payload.forEach((layer: any) => {
        layer.cancel = false;
        layer.disabled = false;
      });
      return { ...state, treeData: payload };
    },
    // 更新树
    updateTree(state: IBarState, { payload }: any) {
      console.log("payloaddddddddddd", payload);
      return { ...state, treeData: payload };
    },
    // 添加新的图层和组件
    addLayer(state: IBarState, { payload }: any) {
      generateLayers(state.treeData, payload.insertId, payload.final);
      console.log("新增后的treeData", state.treeData);
      return { ...state };
    },
    selectedNode(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    clearLayersSelectedStatus(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = false;
      });
      return {
        ...state,
      };
    },
    setSelectedKeys(state: IBarState, { payload }: any) {
      state.key = payload;
      state.selectedComponentOrGroup = state.key.reduce(
        (pre: any, cur: string) => {
          pre.push(findLayerById(state.treeData, cur));
          return pre;
        },
        []
      );
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true;
      });
      state.isAreaChoose = state.selectedComponentOrGroup.length > 0;
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      state.selectedComponents = state.selectedComponents =
        state.components.filter((component) =>
          state.selectedComponentIds.includes(component.id)
        );
      state.selectedComponentRefs = {};
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key];
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key];
        }
      });

      return { ...state };
    },
    calcDragScaleData(state: IBarState, { payload }: any) {
      let xPositionList: number[] = [];
      let yPositionList: number[] = [];
      if (state.selectedComponentOrGroup.length === 1) {
        const firstLayer = state.selectedComponentOrGroup[0];
        if ("components" in firstLayer) {
          // 单个组
          const positionArr = calcGroupPosition(
            firstLayer.components,
            state.components
          );
          xPositionList = positionArr[0];
          yPositionList = positionArr[1];
        } else {
          // 单个组件
          const component = state.components.find(
            (component) => component.id === firstLayer.id
          );
          const dimensionConfig: any = component.config.find(
            (item: any) => item.name === DIMENSION
          );
          dimensionConfig.value.forEach((config: any) => {
            if (["left", "width"].includes(config.name)) {
              xPositionList.push(config.value);
            } else if (["top", "height"].includes(config.name)) {
              yPositionList.push(config.value);
            }
          });
          state.scaleDragData = {
            position: {
              x: xPositionList[0],
              y: yPositionList[0],
            },
            style: {
              display: "block",
              width: xPositionList[1],
              height: yPositionList[1],
            },
          };
          return { ...state };
        }
      } else if (state.selectedComponentOrGroup.length > 1) {
        state.selectedComponentOrGroup.forEach((layer: any) => {
          const positionArr = calcGroupPosition(
            state.selectedComponentOrGroup,
            state.components
          );
          xPositionList = positionArr[0];
          yPositionList = positionArr[1];
        });
      }
      xPositionList.sort((a, b) => a - b);
      yPositionList.sort((a, b) => a - b);
      state.scaleDragData = {
        position: {
          x: xPositionList[0] || 0,
          y: yPositionList[0] || 0,
        },
        style: {
          display: xPositionList[0] ? "block" : "none",
          width:
            xPositionList[xPositionList.length - 1] - xPositionList[0] || 0,
          height:
            yPositionList[yPositionList.length - 1] - yPositionList[0] || 0,
        },
      };
      return {
        ...state,
      };
    },
    // 选中节点时，保存住整个node对象
    setNodeList(state: IBarState, { payload }: any) {
      state.selectedComponentOrGroup = payload;
      state.selectedComponentOrGroup.forEach((item) => {
        item.selected = true;
      });
      return { ...state };
    },
    // 在已经多选的情况下，点击右键时应该是往已选择节点[]里添加，而不是上面那种替换
    pushToSelectedNode(state: IBarState, { payload }: any) {
      const { key, isFolder } = payload;
      const newArr = [...(new Set(state.key.concat(key)) as any)];
      return { key: newArr, isFolder };
    },
    // 点击icon或者右键菜单里的操作
    selectOperate(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    findNode(state: IBarState, { payload: { id, callback } }: any) {
      callback(id);
      return { ...state };
    },
    selectSingleNode(state: IBarState, { payload: id }: any) {
      return { ...state };
    },
    testDrag(state: IBarState, { payload: { parentId } }: any) {
      // console.log('parentId', parentId)
      const ids = ["1-1", "1-1-1", "1-1-1-1"];
      const copyState: IBarState = JSON.parse(JSON.stringify(state));
      // let childrenComponents = findParentNode(
      //   copyState.draggableItems,
      //   ids
      // ).filter((item: any) => item);
      // calculateGroupPosition(childrenComponents.reverse());
      return copyState;
    },
    moveGroupPosition(
      state: IBarState,
      { payload: { id, xMoveLength, yMoveLength } }: any
    ) {
      // const node = findNode(state.draggableItems, id);
      // moveChildrenComponents(node.components, xMoveLength, yMoveLength);
      // console.log("node", node);
      return { ...state };
    },
    // 多选时候，记录最后一次被右键点击的节点
    saveLastRightClickKey(state: IBarState, { payload }: any) {
      return { ...state, lastRightClick: payload };
    },
    // 置顶
    placedTop(state: IBarState, { payload }: any) {
      const newTreeData = placeTop(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 置底
    placeBottom(state: IBarState, { payload }: any) {
      const newTreeData = placeBottom(state.treeData, state.key);
      return { ...state, treeData: newTreeData };
    },
    // 上移
    moveUp(state: IBarState, { payload }: any) {
      const newTree = moveUp(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 下移
    moveDown(state: IBarState, { payload }: any) {
      const newTree = moveDown(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 成组
    frontgroup(state: IBarState, { payload }: any) {
      const { treeDataCopy } = group(state.treeData, state.key);
      return { ...state, treeData: treeDataCopy };
    },
    // 取消成组
    cancelGroup(state: IBarState, { payload }: any) {
      const newTree = cancelGroup(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // TODO 粘贴
    // paste(state: IBarState, { payload }: any) {
    //   return { ...state };
    // },
    // 锁定
    lock(state: IBarState, { payload }: any) {
      const newTree = lock(state.treeData, state.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 删除
    delete(state: IBarState, { payload }: any) {
      const newTree = remove(state.treeData, state.key);
      return { ...state, treeData: newTree };
    },
    // 复制
    copy(state: IBarState, { payload }: any) {
      // const newTree = copy(state.treeData, state.key);
      // return { ...state, treeData: newTree };
      return { ...state };
    },
    //单独显示图层
    singleShowLayer(state: IBarState, { payload }: any) {
      const newTree = singleShowLayer(
        state.treeData,
        state.key,
        payload.singleShowLayer
      );
      return { ...state, treeData: newTree };
    },
    // 隐藏
    hidden(state: IBarState, { payload }: any) {
      // 此处只能用payload.key,因为eyes图标在没有任何节点被选中时也要能响应点击
      const newTree = hidden(state.treeData, payload.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 改变重命名输入框的显示状态
    reName(state: IBarState, { payload }: any) {
      const newTree = showInput(state.treeData, state.key, payload.value);
      return { ...state, treeData: newTree };
    },
    // 真正改变名字的地方
    changeName(state: IBarState, { payload }: any) {
      const newTree = reName(state.treeData, state.key, payload.newName);
      return { ...state, treeData: newTree };
    },
    mergeComponentLayers(state: IBarState, { payload }: any) {
      state.componentLayers = mergeComponentLayers(
        state.components,
        state.treeData
      );
      return { ...state };
    },
    test(state: IBarState, { payload }: any) {
      return { ...state };
    },
    test2(state: IBarState) {
      return { ...state };
    },
    testDelete(state: IBarState) {
      state.components.pop();
      state.treeData.pop();
      return { ...state };
    },
    save(state: IBarState, { payload }: any) {
      return { ...state, ...payload };
    },
    selectComponentOrGroup(
      state: IBarState,
      { payload: { layer, config } }: any
    ) {
      // 这里的 layer 代表的是 group / component
      // 是否支持多选
      if (state.isSupportMultiple) {
        // 多选
        layer.selected = true;
        // 如果 selectedComponentOrGroup 里不存在当前点击的组件/分组的话，就添加
        if (
          !state.selectedComponentOrGroup.find((item) => item.id === layer.id)
        ) {
          (state.selectedComponentOrGroup as any).push(layer);
        }
      } else {
        // 单选
        // 单选分为单选组件、单选分组
        // 单选的话，将其他组件的 select 状态取消掉
        state.selectedComponentOrGroup.forEach((item) => {
          item.selected = false;
        });
        // 再将自己的 select 状态设置为 true
        layer.selected = true;
        // 再重新赋值 selectedComponentOrGroup 长度为 1
        state.selectedComponentOrGroup = [layer];
      }
      // 将选中的 layer 中的包含的所有 component 的 id 提取出来
      state.key = state.selectedComponentOrGroup.map((item) => item.id);
      state.selectedComponentIds = layerComponentsFlat(
        state.selectedComponentOrGroup
      );
      state.selectedComponentRefs = {};
      Object.keys(state.allComponentRefs).forEach((key) => {
        if (state.selectedComponentIds.includes(key)) {
          state.selectedComponentRefs[key] = state.allComponentRefs[key];
          state.selectedComponentDOMs[key] = state.allComponentDOMs[key];
        }
      });
      state.selectedComponents = state.selectedComponents =
        state.components.filter((component) =>
          state.selectedComponentIds.includes(component.id)
        );
      return {
        ...state,
      };
    },
    // 清除所有状态
    clearAllStatus(state: IBarState, payload: any) {
      // 先将选中的 layer 的 select 状态清除
      handleLayersStatus(
        state.treeData,
        (layer: ILayerGroup | ILayerComponent, index: number) => {
          if ((layer as any).parentId === "1") {
            layer.cancel = false;
            layer.disabled = false;
          } else {
            layer.cancel = true;
            layer.disabled = true;
          }
        }
      );
      localStorage.removeItem("dblComponentTimes");
      localStorage.removeItem("currentTimes");
      state.currentDblTimes = 0;
      state.selectedComponentOrGroup.forEach((layer) => {
        layer.selected = false;
      });
      // 清空 selectedComponentOrGroup、selectedComponentIds、selectedComponents
      state.selectedComponentOrGroup.length = 0;
      state.selectedComponentIds.length = 0;
      state.selectedComponents.length = 0;
      state.selectedComponentRefs = {};
      state.isSupportMultiple = false;
      // todo 选区的时候会点击到这里
      state.scaleDragData.style.display = "none";
      state.key.length = 0;
      state.isFolder = false;
      state.supportLinesRef.handleSetPosition(0, 0, "none");
      return { ...state };
    },
    setComponentConfig(state: IBarState, { payload }: any) {
      const componentConfig = payload;
      state.componentConfig = payload;
      // console.log('componentConfig', componentConfig)
      const index = state.components.findIndex((item: any) => {
        return item.id === payload.id;
      });
      state.components.splice(index, 1, componentConfig);
      return { ...state };
    },
  },
};
