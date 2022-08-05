import axios from "axios";

const fetchComponentJsFile = (data: any) => {
  return axios
    .get(
      `${(window as any).CONFIG.COMP_URL}/${data.moduleType}/${
        data.moduleName
      }/${data.moduleVersion}/${data.moduleName}.js`
    )
    .then((res) => res.data);
};

export default fetchComponentJsFile;
