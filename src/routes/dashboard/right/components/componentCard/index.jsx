import React, { memo, useEffect, useState } from 'react'
import './index.less'
import { Button } from 'antd'
import { http } from '@/services/request'
import { mergeSameAndAddDiff } from '@/routes/dashboard/components/moduleUpdate/methods/mergeModuleConfig'
import importComponent from '@/routes/dashboard/components/moduleUpdate/methods/fetchComponentJsFile'

// import { deepClone } from '@/utils/index'

const ComponentCard = props => {
  const [targetConfig, setTargetConfig] = useState({})
  const { allModulesConfig, dispatch, bar } = props
  const {
    lastModuleVersion, id, name, moduleType,
    moduleName, dashboardId, moduleVersion, config: oldConfig,
  } = props.data;

  useEffect(() => {
    const targetObj = Array.isArray(allModulesConfig) ? allModulesConfig.find((item) =>
      item.moduleName === moduleName
    ) : {}
    if (targetObj) {
      // const deepCopyTargetObj = deepClone(targetObj)
      // console.log('deepCopyTargetObj', deepCopyTargetObj.config)
      // setTargetConfig(deepCopyTargetObj)
      setTargetConfig(targetObj.config)
    } else {
      setTargetConfig({})
    }
  }, [])

  const updateVersion = async () => {
    // debugger
    const hadMergeConfig = mergeSameAndAddDiff(oldConfig, targetConfig)
    const finalBody = {
      id,
      name,
      moduleName,
      moduleVersion: lastModuleVersion,
      config: hadMergeConfig,
    }

    const data = await http({
      url: '/visual/module/update',
      method: 'post',
      body: {
        configs: [finalBody],
        dashboardId,
      },
    }).catch(() => { console.log('单个组件升级, Error') })
    if (data) {
      const newComponentConfig = {
        ...props.data,
        ...finalBody,
        lastModuleVersion: null
      }
      // 不同于批量更新组件，这儿没有必要再调用getDashboardDetails发一次请求去更改全局状态中的componentConfig,直接前端更改即可
      // dispatch({
      //   type: 'bar/setComponentConfig',
      //   payload: newComponentConfig
      // })
      // 更新组件成功后,重新请求最新版本组件的js文件
      const fetchComponentOptions = {
        moduleType,
        moduleName,
        moduleVersion: lastModuleVersion
      }
      // alert('执行咯')
      window.eval(`${await importComponent(fetchComponentOptions)}`)
      const { ComponentDefaultConfig } = window.VComponents;
      const currentDefaultConfig = ComponentDefaultConfig
      const index = bar.components.findIndex(item => item.id === id)
      bar.components.splice(index, 1, { ...currentDefaultConfig, id })
      // dispatch({
      //   type: 'bar/save'
      // })
      dispatch({
        type: 'bar/getDashboardDetails',
        payload: dashboardId
      })
    }
  }
  return (
    <React.Fragment>
      <div className="component-wraper g-flex g-justify-between">
        <div>
          <h4>{`${name}_${id}`}</h4>
          <p>{`V${moduleVersion}`}</p>
        </div>
        {
          lastModuleVersion &&
          <Button
            ghost={true}
            type="primary"
            size='small'
            onClickCapture={updateVersion}
          >更新版本</Button>
        }
      </div>
      <div className="detail-setting">
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default memo(ComponentCard)
