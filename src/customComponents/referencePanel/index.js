import { connect } from 'dva'
import { Button } from 'antd'

const ReferencePanel = (props) => {
  console.log('引用面板props', props.id)
  return (
    <div className="reference-panel">
      <Button>引用面板</Button>
    </div>
  )
}

export default connect(({ bar }) => ({ bar }))(ReferencePanel)
