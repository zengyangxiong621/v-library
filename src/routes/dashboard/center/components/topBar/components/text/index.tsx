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
        const { data }: any = await myFetch('/visual/modules/queryModuleList', {
          body: JSON.stringify({
            type: 1,
            status: 0,
            pageNo: 1,
            pageSize: 100,
          })
        })
        data.content.push({ name: 'cccccccc' })
        console.log('sssssdata', data.content);
        setDataArr(data.content)
        setTimeout(() => {
          console.log('变量变量');
          setDataArr([{
            name: 'dddddddddddddddd'
          }])
        }, 2000);
      }
      // getData()
    }
    init()
  }, [])

  return (
    <div className='Text-wrap'>
      {
        dataArr.map((item: any, index: number) => {
          return (
            <EveryItem data={item} onClickFunc={() => componentCreate(props)} />
          )
        })
      }
    </div>
  )
}

export default connect(mapStateToProps)(Text);
// export default memo(Text)
