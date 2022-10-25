export default {
  namespace: "components",
  state: {
    componentConfig: {
      dashboardId: "1",
      id: "1",
      name: "文字组件",
      dataStatic: {
        data: [
          {
            text: "文字组件",
          },
        ],
        fields: [
          {
            label: "content",
            value: "content",
            desc: "状态值",
          },
        ],
      },
    },
  },
  reducers: {
    inputChange(state: any, action: any) {
      const { componentConfig } = state;
      const { dataStatic } = componentConfig;
      const { fields } = dataStatic;

      const newDataStatic = {
        fields,
        ...action.payload,
      };

      return {
        ...state,
        componentConfig: {
          ...componentConfig,
          dataStatic: newDataStatic,
        },
      };
    },
  },
  effects: {
    *change(action: any, { call, put, select }: any) {
      yield put({
        type: "inputChange",
        payload: action.payload,
      });
    },
  },
};
