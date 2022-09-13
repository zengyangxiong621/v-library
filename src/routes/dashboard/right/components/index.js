import PositionSize from "./positionSize";
import LoadAnimation from "./loadAnimation";
import TextStyle from "./textStyle";
import AlignSetting from "./alignSetting";
import CusCollapse from "./cusCollapse";
import { EditableTable } from "./fieldMapTable";
import CheckBox from "./checkBox";
import Color from "./color";
import BoxShadow from "./boxShadow";
import Range from "./range";
import Rotate from "./rotate";
import Border from "./border";
import PaMargin from "./paMargin";
import CusSelect from "./cusSelect";
import ChartText from "./chartText";
import InputNumber2 from "./inputNumber2";
import Input2 from "./input2";
import TextStroke from "./textStroke";
import RadioGroup from "./radioGroup";
import CusInput from "./cusInput";
import CheckBoxGroup from "./checkBoxGroup";
import CusTabs from "./cusTabs";
import UploadImg from "./uploadImg";
import CusInputNumber from "./cusInputNumber";
import TabArray from "./tabArray";
import CusSwitch from "./switch";
import BorderRadius from "./borderRadius";
import Origin from "./origin";
import UploadMedia from "./mediaUploadding";


const componentLib = {
  dimensionGroup:PositionSize,
  checkBox:CheckBox,
  textFullStyleGroup:TextStyle,
  color:Color,
  alignFull:AlignSetting,
  collapse:CusCollapse,
  boxShadow:BoxShadow,
  range:Range,
  rotate:Rotate,
  border:Border,
  padding:PaMargin,
  select:CusSelect,
  chartText:ChartText,
  textStroke:TextStroke,
  radioGroup:RadioGroup,
  inputNumber2:InputNumber2,
  input2:Input2,
  input:CusInput,
  checkBoxGroup:CheckBoxGroup,
  tabs:CusTabs,
  image:UploadImg,
  number:CusInputNumber,
  tabArray: TabArray,
  switch: CusSwitch,
  borderRadius:BorderRadius,
  origin:Origin,
  media:UploadMedia
};

export default componentLib;
