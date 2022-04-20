/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import { connect } from '../../../../../../../utils/connect';
import './index.less'

import { myFetch } from '../../fetch'

import EveryItem from '../everyItem/index'


const mapStateToProps = (state: any) => {
  return state
}

const componentCreate = ({ dispatch }: any) => {
  console.log(dispatch, '===============================================')
  dispatch({
    type: 'dashboard/create',
    payload: {
      test: '1111'
    }
  })
}

const Text = (props: any) => {
  const [dataArr, setDataArr] = useState<any>([])
  useEffect(() => {
    const init = async () => {
      const getData = async () => {
        const { data }: any = await myFetch('/visual/module-manage/queryModuleList', {
          body: JSON.stringify({
            type: [0],
            status: 0,
            pageNo: 0,
            pageSize: 100,
          })
        })
        data.content.push({ name: 'cccccccc' })
        setDataArr(data.content)
        setTimeout(() => {
          console.log('变量变量');
          setDataArr([{
            name: 'dddddddddddddddd'
          }])
        }, 2000);
      }
      getData()
    }
    init()
  }, [])

  return (
    <div className='Text-wrap'>
      {
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem data={item} />
          )
        })
      }
    </div>
  )
}

export default connect(mapStateToProps)(Text);
// export default memo(Text)