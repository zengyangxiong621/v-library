let componentJsFiles = {};
const getComponentJsFiles = () => {
  return componentJsFiles;
};
const setComponentJsFiles = (key, value) => {
  componentJsFiles[key] = value;
};
const deleteComponentJsFiles = (key) => {
  delete componentJsFiles[key];
};
const clearComponentJsFiles = () => {
  componentJsFiles = {};
};

let ComponentDefaultConfig = {};
const getComponentDefaultConfig = () => {
  return ComponentDefaultConfig;
};
const setComponentDefaultConfig = (key, value) => {
  ComponentDefaultConfig[key] = value;
};
const deleteComponentDefaultConfig = (key) => {
  delete ComponentDefaultConfig[key];
};
const clearComponentDefaultConfig = () => {
  ComponentDefaultConfig = {};
};
export {
  getComponentJsFiles,
  setComponentJsFiles,
  deleteComponentJsFiles,
  clearComponentJsFiles,
  getComponentDefaultConfig,
  setComponentDefaultConfig,
  deleteComponentDefaultConfig,
  clearComponentDefaultConfig,
};
