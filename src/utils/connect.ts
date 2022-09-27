import { connect as connectComponent } from "dva";

export const connect = (mapStateToProps: any) => {
  return (target: any) => (
    connectComponent(mapStateToProps)(target) as any
  );
};
