export const WENBENYANGSHI = "文本样式";
export const WEIZHICHICUN = "位置尺寸";
export const MORENYINCANG = "默认隐藏";
export const DUIQIFANGSHI = "对齐方式";
export const YINYING = "阴影";

type TArr = {
  [k: string]: string | number;
};
/**
 * description: 将数组中所有的对象拼成一个行内样式
 * @params: [ {"name": "left",  "value": 100 }, {}, ...]
 * @return: { left: 100 }
 */
export const getTargetStyle = (
  Arr: TArr[],
  originalStyle?: Record<string, string | number>
): TArr => {
  const targetStyle: TArr = {};
  if (Array.isArray(Arr) && Arr.length) {
    Arr.forEach(({ name, value }) => {
      targetStyle[name] = value;
    });
  }
  return { ...originalStyle, ...targetStyle };
};

// const slideKeyframes = `@keyframes load-animation-slide {
//   0% {
//     transform: ${translateDirection};
//   }
//   100% {
//     transform: translate(0,0);
//   }
// }`

// // console.log('hhhhhhh', slideKeyframes);

// const slideSmallKeyframes = `@keyframes load-animation-slide-small {
//   0% {
//     transform: ${translateDirection};
//   }
//   100% {
//     transform: translate(0,0);
//   }
// }`
// const wipeKeyframes = `@keyframes load-animation-wipe {
//   0% {
//     width: '0%',
//   }
//   50%{
//     width: '50%'
//   }
//   100% {
//     width: '100%',
//   }
// }`
