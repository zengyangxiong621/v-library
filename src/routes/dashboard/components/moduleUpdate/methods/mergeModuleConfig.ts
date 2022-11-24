/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { deepClone } from "@/utils/index";

type TIndexSignature = {
  [k: string]: string | number;
};

type TConfigItem = {
  name?: string;
  displayName?: string;
  type?: string;
  config?: TIndexSignature;
  value?: any;
  options?: any;
  range?: any;
  hasSwitch?: boolean;
  defaultExpand?: boolean;
  showDetail?: boolean;
  activeKey?: string | number;
  direction?: string;
  language?: string;
  showExpand?: string; // 是否展示下面的全屏按钮
  readOnly?: boolean; // 是否可编辑
  disabled?: boolean; //<自定义列中属性> 如果改项配置为true，则后面的添加和删除不可用
};

//@Mark 创建至少含有一个给定 KeysType中 的类型，并保持其余的Keys
type RequireAtLeastKey<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends keyof ObjectType ? ObjectType & Required<Pick<ObjectType, KeysType>> : never;
// 每个configItem中必须至少包含有 value 或者 options 中的一个作为key
type THasTargetKeyConfigItem = RequireAtLeastKey<TConfigItem, "value" | "options">;
type TConfigArr = THasTargetKeyConfigItem[];

// 目前 粒度更细(多层级)的配置项 只能放在 value数组或者options数组中, 简单配置(一层对象)直接将value归为“other类型”,
//@Mark 以后随着组件多样性以及丰富性可能扩展出其它key名 用来实现<value|options>一样的功能,那么相应的 mergeSameAndAddDiff 中的逻辑也需要进行对应的扩展, TMayChangeFlag 用于枚举出这些key,并确保coder 会在mergeSameAndAddDiff中加上<新key>对应的处理逻辑
type TMayChangeFlag = "value" | "options" | "other";

const mergeSameAndAddDiff = (oldConfig: TConfigArr, newConfig: TConfigArr) => {
  console.log("旧的config", oldConfig);
  console.log("新的config~~~~~~~~", newConfig);
  const recursive = (oldConfig: TConfigArr, newConfig: TConfigArr) => {
    const valueMap = new Map();
    const otherMap = new Map(); // value 为 (string、number) || {}
    const optionMap = new Map();
    oldConfig.forEach((x: TConfigItem) => {
      const { name, value, options } = x;
      // if(name !== "customColumn") {
      if (Array.isArray(value)) {
        //@Mark 开发者配置组件时，应该保证同一层级(value || options)下 每项配置名(name)的唯一性，如果不小心copy多了一份，在map中重复set相同的key也仅仅只是覆盖，所以此处不判断map中是否已经有key为 name 的项
        valueMap.set(name, value);
      } else {
        otherMap.set(name, value);
      }
      if (Array.isArray(options)) {
        optionMap.set(name, options);
      }
      // }
    });
    newConfig.forEach((item: TConfigItem) => {
      const { name, value, options } = item;
      const type: TMayChangeFlag = Array.isArray(value)
        ? "value"
        : Array.isArray(options)
        ? "options"
        : "other";
      switch (type) {
        case "value":
          if (valueMap.has(name)) {
            const oldValue = valueMap.get(name);
            recursive(oldValue, item.value);
          }
          break;
        case "options":
          if (optionMap.has(name)) {
            const oldOptions = optionMap.get(name);
            recursive(oldOptions, item.options);
          }
          break;
        case "other":
          // @Mark 因为有些组件的某些选项中会有value数组中不是对象的情况（value用来记录值而不是记录组件配置项信息）比如：常规表格组件中“排序方式”项中的value:['descend'],那么最终递归到这个value时，item为字符串'descend',此时使用一般的逻辑item.value = xxx 就会报错，所以此处针对item类型加一个判断
          if (typeof item === "object") {
            //<1> 如果旧config中有此配置项,让其覆盖新config中的此项
            //<2> 但也有可能此项对于旧config来讲是新增的,那么map中必然查无此项,所以直接使用新config中的配置
            if (otherMap.has(name)) {
              const oldConstant = otherMap.get(name);
              item.value = oldConstant;
            }
          }
          break;
        default:
          // 变量type 在此处收敛为nerve类型
          const aToolConstant: never = type;
          break;
      }
    });
  };
  recursive(oldConfig, newConfig); // 也可直接用addDiffAndMergeSame自身进行递归调用

  // @Mark 此处必须返回一个 "新"对象, 否则,单个升级没问题,批量升级时会出问题
  const independentConfig = deepClone(newConfig);
  return independentConfig;
};

export { mergeSameAndAddDiff };
