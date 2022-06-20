/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react'
import { connect } from '../../../../../../../utils/connect';
import './index.less'

import { http } from "../../../../../../../services/request";

import EveryItem from '../everyItem/index'


const mapStateToProps = (state: any) => {
  return state
}

const Text = (props: any) => {
  const [dataArr, setDataArr] = useState<any>([])
  const moduleType = 'assist'

  useEffect(() => {
    const init = () => {
      http({
        url:'/visual/module-manage/queryModuleList', 
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: ['assist'],// 0:图表 2:文本
          status: 0,
          pageNo: 0,
          pageSize: 100,
        }
      }).then((data: any) => {
        data.content.forEach((item: any) => {
          item.photoPath = `${(window as any).CONFIG.COMP_URL}/${item.photoPath}`
        })
        setDataArr(() => data.content)
      })
    }
    init()
  }, [])

  return (
    <div className='Text-wrap'>
      {
        dataArr?.map((item: any, index: number) => {
          return (
            <EveryItem key={item.moduleName} data={item} type={moduleType} />
          )
        })
      }
    </div>
  )
}

export default memo(Text)
