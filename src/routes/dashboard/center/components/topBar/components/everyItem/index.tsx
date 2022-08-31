import { memo, useCallback, useEffect } from 'react'
import { connect } from 'dva'
import axios from 'axios'
import './index.less'

const EveryItem = (props: any) => {
  const { data, dispatch, bar } = props

  const importComponent = (data: any) => {
    return axios.get(`${(window as any).CONFIG.COMP_URL}/${data.moduleType}/${data.moduleName}/${data.moduleVersion}/${data.moduleName}.js`).then(res => res.data);
  }

  const componentCreate = async() => {
    const { moduleType } = data
    if(moduleType === "design"){
      window.eval(`${await importComponent(data)}`)
      const { ComponentDefaultConfig } = (window as any).VComponents;
      dispatch({
        type: 'bar/createComponent',
        payload: ComponentDefaultConfig,
        itemData: data
      })
    }else{
      const { moduleDefaultConfig } = bar
      const currentDefaultConfig = moduleDefaultConfig.find((item: any) => {
        return item.moduleName === data.moduleName
      })
      dispatch({
        type: 'bar/createComponent',
        payload: currentDefaultConfig,
        itemData: data
      })
    }
  }

  

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img src={data.photoPath} alt='' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)
