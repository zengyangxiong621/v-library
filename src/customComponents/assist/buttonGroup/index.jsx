import React, { Component } from 'react';
import ComponentDefaultConfig from './config'
import './index.css'
class ButtonGroup extends Component {
  constructor(Props) {
    super(Props)
    this.state = { active: 1 };
  }
  componentDidMount() {
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig
    const componentData = this.props.comData  // 过滤后的数据
    const fieldKey = this.props.fields[0]
    let defaultValue = null

    const style = config.filter((item) => item.name !== 'dimension').reduce((pre, cur) => {
      if (Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p, c) => {
          p[c.name] = c.value
          return p
        }, {})
        pre = {
          ...pre,
          ...obj,
        }
      } else {
        pre[cur.name] = cur.value
      }
      return pre
    }, {})

    console.log('style', style)

    const handleChange = value => {
      const data = componentData.filter(item => {
        return item[fieldKey] === value
      })
      this.props.onChange && this.props.onChange(data[0])
    }

    // 处理默认选中
    const comDataLength = componentData?.length || 0
    if (comDataLength) {
      // 如果默认选中项大于数据的长度，则取第一项，否则取默认项
      const index = style.defaultSelect > comDataLength ? 0 : style.defaultSelect - 1
      this.setState({
        active: index + 1
      });
      defaultValue = componentData[index][fieldKey]
      handleChange(defaultValue)
    }
  }
  render() {
    const componentData = this.props.comData  // 过滤后的数据
    const fieldKey = this.props.fields[0]
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig
    const style = config.filter((item) => item.name !== 'dimension').reduce((pre, cur) => {
      if (Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p, c) => {
          p[c.name] = c.value
          return p
        }, {})
        pre = {
          ...pre,
          ...obj,
        }
      } else {
        pre[cur.name] = cur.value
      }
      return pre
    }, {})


    const handleClick = (index) => {
      this.setState({
        active: index + 1
      });
      this.props.onChange && this.props.onChange(componentData[index])
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        "--defaultBorder": `${style.defaultBorder.width}px ${style.defaultBorder.type} ${style.defaultBorder.color}`,
        "--defalutBgc": style.defaultBgImg ? `url(${style.defaultBgImg})` : style.defaultBgColor,
        "--defalutColor": style.defaultFont.color,
        "--defalutFontFamily": style.defaultFont.fontFamily,
        "--defalutFontSize": style.defaultFont.fontSize + 'px',
        "--defalutFontWeight": style.defaultFont.fontWeight,
        "--selectedBorder": `${style.selectedBorder.width}px ${style.selectedBorder.type} ${style.selectedBorder.color}`,
        "--selectedBgc": style.selectedBgImg ? `url(${style.selectedBgImg})` : style.selectedBgColor,
        "--selectedColor": style.selectedFont.color,
        "--selectedFontFamily": style.selectedFont.fontFamily,
        "--selectedFontSize": style.selectedFont.fontSize + 'px',
        "--selectedFontWeight": style.selectedFont.fontWeight,
      }}>
        {componentData && Array.isArray(componentData) && componentData.map((item, index) => {
          return <button
            style={{ flex: (1 / componentData.length).toFixed(2) }}
            onClick={() => handleClick(index)}
            className={["cus-component-br-btn", index + 1 === this.state.active ? "active" : null].join(' ')}
          >{item[fieldKey]}</button>
        })
        }
      </div>
    )
  }
}
export { ButtonGroup, ComponentDefaultConfig }
export default ButtonGroup