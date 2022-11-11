/************** 由此导致的bug 请找 chendibo ****************/
/**
 * 以实现 选择单选框中的某一项后，在其下方添加一个新的组件为例,
 * 1、先为该单选框的config添加updateEffect对象
 * 2、在radioGroup组件中进行相应的处理(将updateEffect对象处理后传出)
 * 3、在singleLayer组件的<<<styleChange>>>方法中 根据updateEffect的信息来重新生成styleConfig(即componentConfig.config)
 */

// 见 config[2].options[0].value
const config = [
  {
    displayName: "位置尺寸",
    name: "dimension",
    type: "dimensionGroup",
    config: {
      lock: false,
    },
    value: [],
  },
  {
    displayName: "默认隐藏",
    name: "hideDefault",
    type: "checkBox",
    value: false,
  },
  {
    name: "水位图设置",
    displayName: "水位图设置",
    type: "tabs",
    activeKey: "1",
    options: [
      {
        key: "1",
        name: "图表",
        value: [
          {
            name: "numericalType",
            displayName: "数值类型",
            type: "radioGroup",
            direction: "horizontal",
            value: "percent",
            options: [
              {
                name: "百分比",
                value: "percent",
              },
              {
                name: "实际值",
                value: "actualValue",
              },
            ],
            // 选择单选框中的某项后, 增加/删除组件
            updateEffect: {
              // 将父节点的路径信息保存,之后就不用通过递归来寻找其父节点
              parentPath: "2.options.0.value",
              // value 在这儿随便给单选框选项中的一个值就行,真正赋值的时候需要与当前选中的项保持一致
              // value: "percent",
              updateType: {
                percent: "delete",
                actualValue: "add",
              },
              curIndex: 0,
              willAddObj: {
                name: "gridSpacing",
                displayName: "容量",
                value: 100,
                type: "number",
                config: {
                  min: 0,
                  max: 10000000000,
                  step: 1,
                },
              },
            },
          },
          {
            displayName: "水波颜色",
            name: "waveColor",
            type: "color",
            value: "#febb00",
          },
        ],
      },
    ],
  },
];
