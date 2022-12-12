import axios from "axios";

const fetchComponentJsFile = (data: any) => {
  return axios
    .get(
      `${(window as any).CONFIG.COMP_URL}/${data.moduleLastType}/${data.moduleName}/${
        data.moduleLastVersion
      }/${data.moduleName}.js`
    )
    .then((res) => res.data);
};

export default fetchComponentJsFile;
