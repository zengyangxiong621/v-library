const isHex = (str) => {
  return str.startsWith('#')
}
const rgbToHex = (rgba) => {
  let { r, g, b } = rgba
  r=parseInt(r)
  g=parseInt(g)
  b=parseInt(b)
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
const hexToRgb = (hexValue) => {
  const rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b);
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  // if(!rgb) {
  //   return {}
  // }
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  return {
    r,
    g,
    b
  };
}
const getRgbaNum = (rgba) => {
  let value = rgba.match(/(\d(\.\d+)?)+/g)
  return {
    r: value[0],
    g: value[1],
    b: value[2],
    a: value[3]
  }
}

export {
  isHex,
  rgbToHex,
  hexToRgb,
  getRgbaNum
}
