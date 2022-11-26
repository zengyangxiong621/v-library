export const styleTransformFunc = (textStyle, type = true) => {
  const styleTransformFuncList = {
    fontFamily: (value) => ({
      [type ? "fontFamily" : "font-family"]: value,
    }),
    fontSize: (value) => ({
      [type ? "fontSize" : "font-size"]: value + "px",
    }),
    color: (value) => ({
      color: value,
    }),
    bold: (value) => ({
      [type ? "fontWeight" : "font-weight"]: value ? "bold" : "unset",
    }),
    italic: (value) => ({
      [type ? "fontStyle" : "font-style"]: value ? "italic" : "unset",
    }),
    letterSpacing: (value) => ({
      [type ? "letterSpacing" : "letter-spacing"]: value + "px",
    }),
    lineHeight: (value) => ({
      [type ? "lineHeight" : "line-height"]: value ? value + "px" : "unset",
    }),
    shadow: ({ hShadow, vShadow, color, blur }) => ({
      [type ? "boxShadow" : "box-shadow"]: `${hShadow}px ${vShadow}px ${blur}px ${color}`,
    }),
    textShadow: ({ hShadow, vShadow, color, blur }) => ({
      [type ? "textShadow" : "text-shadow"]: `${hShadow}px ${vShadow}px ${blur}px ${color}`,
    }),
  };
  textStyle = textStyle.reduce((pre, cur) => {
    if (Array.isArray(cur.value)) {
      const obj = cur.value.reduce((p, c) => {
        p[c.name] = c.value;
        return p;
      }, {});
      pre = {
        ...pre,
        ...obj,
      };
    } else {
      pre[cur.name] = cur.value;
    }
    return pre;
  }, {});
  return Object.keys(textStyle).reduce((pre, cur) => {
    if (cur === "themeColor") {
      return {
        ...pre,
        ...styleTransformFuncList["color"](textStyle[cur]),
      };
    }
    return {
      ...pre,
      ...styleTransformFuncList[cur](textStyle[cur]),
    };
  }, {});
};
// 样式对象key值转驼峰
export const transformStyleInObj = (style) => {
  return Object.entries(style).reduce((res, cur) => {
    let obj = {};
    const realKey = cur[0].replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
    obj[realKey] = cur[1];
    return {
      ...obj,
      ...res,
    };
  }, {});
};
