import React, { memo, useEffect, useState } from 'react'
import './index.less'
import { Button } from 'antd'
import { http } from '@/services/request'
import { mergeSameAndAddDiff } from "@/routes/dashboard/components/moduleUpdate/methods/mergeModuleConfig";

// import { deepClone } from '@/utils/index'

const ComponentCard = props => {
  const [targetConfig, setTargetConfig] = useState({})
  const { allModulesConfig, dispatch } = props
  const {
    lastModuleVersion, id, name,
    moduleName, dashboardId, moduleVersion, config: oldConfig,
  } = props.data;

  useEffect(() => {
    const targetObj = Array.isArray(allModulesConfig) ? allModulesConfig.find((item) =>
      item.moduleName === moduleName
    ) : {}
    console.log('aaa')
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
      dispatch({
        type: 'bar/setComponentConfig',
        payload: newComponentConfig
      })
      // dispatch({
      //   type: 'bar/getDashboardDetails',
      //   payload: dashboardId
      // })
    }
  }
  return (
    <React.Fragment>
      <div className="component-wraper g-flex g-justify-between">
        <div>
          <h4 style={{ marginBottom: '0'}}>{`${name}_${id}`}</h4>
          {
            moduleVersion ? <p style={{ margin: '12px 0 0 0' }}>{`V${moduleVersion}`}</p> : <></>
          }
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
