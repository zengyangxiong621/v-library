import PositionSize from './positionSize'
import LoadAnimation from './loadAnimation'
import TextStyleSetting from './textStyleSetting'
import AlignSetting from './alignSetting'
import ShadowSetting from './shadow'
import { EditableTable } from './fieldMapTable'
import CheckBox from './checkBox'
import ColorFullSetting from './colorFullSetting'

const componentLib = {
  dimensionGroup:PositionSize,
  checkBox:CheckBox,
  textFullStyleGroup:TextStyleSetting,
  color:ColorFullSetting,
  alignFull:AlignSetting,
  shadow:ShadowSetting,
}

export default componentLib