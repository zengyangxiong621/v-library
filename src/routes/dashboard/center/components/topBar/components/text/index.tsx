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
  const moduleType = 'text'

  useEffect(() => {
    const init = () => {
      http({
        url:'/visual/module-manage/queryModuleList', 
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          type: ['text'],
          status: 0,
          pageNo: 0,
          pageSize: 100,
        }
      }).then((data: any) => {
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
