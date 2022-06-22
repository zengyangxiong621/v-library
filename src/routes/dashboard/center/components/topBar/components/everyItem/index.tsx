import { memo, useCallback, useEffect } from 'react'
import { connect } from 'dva'
import axios from 'axios'
import './index.less'

const EveryItem = (props: any) => {
  const { data, dispatch, bar } = props
  const importComponent = useCallback(() => {
    return axios.get(`${ (window as any).CONFIG.COMP_URL }/${data.moduleType}/${data.moduleName}/${data.moduleVersion}/${data.moduleName}.js`).then(res => res.data);
  }, [data.moduleType])

  const loadComp = useCallback(async () => {
    window.eval(`${await importComponent()}`)
    const { ComponentDefaultConfig } = (window as any).VComponents;
    const currentDefaultConfig = ComponentDefaultConfig
    dispatch({
      type: 'bar/setModuleDefaultConfig',
      payload: currentDefaultConfig,
      itemData: data
    })
  }, [importComponent])

  useEffect(() => {
    loadComp();
  }, [loadComp]);

  const componentCreate = () => {
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

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img src={(window as any).CONFIG.COMP_URL+data.photoPath} alt='图片加载' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)
