import { memo, useCallback, useEffect } from 'react'
import { connect } from 'dva'
import axios from 'axios'
import './index.less'

const EveryItem = (props: any) => {
  const { data, dispatch, bar, type} = props
  let currentDefaultConfig: any = null

  // const { moduleDefaultConfig } = bar
  // const currentDefaultConfig = moduleDefaultConfig.find((item: any) => {
  //   return item.moduleName === data.moduleName
  // })

  const importComponent = useCallback(() => {
    return axios.get(`${ (window as any).CONFIG.COMP_URL }/modules/${type}/${data.moduleVersion}/${data.moduleName}.js`).then(res => res.data);
  }, [type])

  const loadComp = useCallback(async () => {
    window.eval(`${await importComponent()}`)
    const { ComponentDefaultConfig } = (window as any).VComponents;
    currentDefaultConfig = ComponentDefaultConfig
    console.log(currentDefaultConfig, 'currentDefaultConfig=======================')

  }, [importComponent])

  useEffect(() => {
    loadComp();
  }, [loadComp]);

  const componentCreate = () => {
    debugger
    dispatch({
      type: 'bar/createComponent',
      payload: currentDefaultConfig,
      itemData: data
    })
  }

  return (
    <div className='EveryItem-wrap' onClickCapture={componentCreate}>
      <div className='db-img'>
        <img src={data.photoPath} alt='图片加载' />
      </div>
      <span className='db-text'>{data.name}</span>
    </div>
  )
}

export default connect(({ bar }: any) => (
  { bar }
))(EveryItem)
