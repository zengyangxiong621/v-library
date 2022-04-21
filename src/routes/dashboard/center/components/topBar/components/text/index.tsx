/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import { connect } from '../../../../../../../utils/connect';
import './index.less'

import { myFetch } from '../../fetch'

import EveryItem from '../everyItem/index'


const mapStateToProps = (state: any) => {
  return state
}

const Text = (props: any) => {
  const [dataArr, setDataArr] = useState<any>([])
  useEffect(() => {
    const init = async () => {
      const getData = async () => {
        const { data }: any = await myFetch('/visual/module-manage/queryModuleList', {
          body: JSON.stringify({
            type: [2],// 0:图表 2:文本
            status: 0,
            pageNo: 0,
            pageSize: 100,
          })
        })
        data.content.push({ name: 'cccccccc' })
        setDataArr(data.content)
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

export default memo(Text)
