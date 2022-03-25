import { memo } from 'react'
import { connect } from '../../../../../../../utils/connect';
import './index.less'

import EveryItem from '../everyItem/index'

const dataArr = [
  {
    name: 'assssssssssssssssssddddddddddddddddss',
  },
  {
    name: 'bbbbbbbbbbbbbbbbbbbbbbbbbbb',
  },
  {
    name: 'c',
  },
  {
    name: 'd',
  },
  {
    name: 'e',
  },
  {
    name: 'f',
  },
  {
    name: 'g',
  },
  {
    name: 'h',
  },
  {
    name: 'i',
  },
  {
    name: 'j',
  },
]

const mapStateToProps = (state: any) => {
  return state
}

const componentCreate = ({ dispatch}: any) => {
  dispatch({
    type: 'dashboardGlobal/create',
    payload: {
      test: '1111'
    }
  })
}

const Text = (props: any) => {
  return (
    <div className='Text-wrap'>
      {
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem data={item}  onClickFunc={ () => componentCreate(props) } />
          )
        })
      }
    </div>
  )
}

export default connect(mapStateToProps)(Text);
// export default memo(Text)