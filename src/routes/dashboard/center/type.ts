export interface IScaleDragData {
  position: {
    x: number;
    y: number;
  };
  style: {
    width: number;
    height: number;
  };
}
export interface IStyleConfig {
  config: object;
  displayName: string;
  name: string;
  type: string;
  value: number | string | Array<IStyleConfig>;
}
