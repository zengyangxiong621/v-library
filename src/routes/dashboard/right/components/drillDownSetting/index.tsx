import { memo, useEffect } from 'react'
import './index.less'

import { connect } from 'dva'
import { http } from '@/services/request'

import { TreeSelect } from "antd";
import { useSetState } from 'ahooks'

const DrillDownSetting = ({ bar, drillDownGlobalState, dispatch, selectedNextLevelComponent, componentConfig }: any) => {
  const { panelStatesList, stateId } = bar
  const { id, name } = componentConfig
  const [state, setState] = useSetState({
    layersInNextState: [],
    parentDataSample: null, // 父级组件的结构示例
    isLastState: false, // 最后一个状态不用选择下层组件
  })

  // 通过当前组件的id去 drillDownGlobalState.hasParentCompSet中寻找父级组件的信息
  useEffect(() => {
    console.log('当前组件id', id)
    const parentCompInfo = drillDownGlobalState.hasParentCompSet.find((x: any) => x.id === id)
    console.log('parentCompInfo', parentCompInfo)
    if (parentCompInfo) {
      setState({
        parentDataSample: parentCompInfo.dataSample
      })
    }
  }, [])
  // 选取下一个状态中的组件并放入下钻组件列表
  useEffect(() => {
    try {
      let curStateIndex = panelStatesList.findIndex((x: any) => x.id === stateId)
      const nextStateIndex = curStateIndex + 1
      if (nextStateIndex > panelStatesList.length - 1) {
        setState({
          layersInNextState: [],
          isLastState: true
        })
      } else {
        const { id: nextStateId } = panelStatesList[nextStateIndex]
        const getLayersInPanelState = async () => {
          const { layers, components } = await http({
            url: `/visual/application/dashboard/detail/${nextStateId}`,
            method: "get",
          })
          const formatterLayers = layers.map((item: any) => ({
            id: item.id,
            name: item.name
          }))
          setState({
            layersInNextState: formatterLayers
          })
        }
        getLayersInPanelState()
      }
    } catch {

    }
  }, [])

  // 之前已经选中了的组件
  let echoDrillDownComponents = Array.isArray(componentConfig.drillDownArr) ? componentConfig.drillDownArr.map((item: any) => item.id) : []
  console.log('echoDrillDownComponents', echoDrillDownComponents)

  const curCompConfigStaticDataSample = componentConfig.staticData.data[0];



  // 添加下钻组件
  const selectNextLevelComponent = (val: any, label: any, extra: any) => {
    const extendVal = val.map((item: string, index: number) => {
      return {
        id: item,
        name: label[index],
        dataSample: curCompConfigStaticDataSample,
        // parent:
      }
    })
    componentConfig.drillDownArr = extendVal

    // 当前被作为下钻组件的组件应当被放入“有父组件”的组件集合中
    const isExitInCompSet = drillDownGlobalState.hasParentCompSet.find((item: any) => val.includes(item.id))
    if (!isExitInCompSet) {
      drillDownGlobalState.hasParentCompSet.push(...extendVal)
    }
    // 将含有drillDownArr的新componentConfig传出去
    selectedNextLevelComponent(componentConfig)
    // 需要改变 全局状态中的 componentConfig, 不然其它触发module/update接口时(比如移动一下组件),会覆盖这个带有drillDownArr的componentConfig
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
    // 更改后端存储的 componentConfig
    http({
      url: "/visual/module/update",
      method: "post",
      body: {
        dashboardId: bar.dashboardId,
        // dashboardId: bar.stateId,
        configs: [componentConfig],
      },
    })
  }
  return (
    <div className='DrillDownSetting-wrap'>
      {
        state.parentDataSample &&
        <>
          <div>父级数据示例：</div>
          <div>{`${JSON.stringify(state.parentDataSample)}`}</div>
        </>
      }
      {
        !state.isLastState && <div className="level">
          <div className="level-title">下层组件：</div>
          <div className='treeSelect-wrap'>
            <TreeSelect
              treeData={state.layersInNextState}
              fieldNames={
                { label: 'name', value: 'id' }
              }
              onChange={selectNextLevelComponent}
              treeCheckable={true}
              showCheckedStrategy={TreeSelect.SHOW_PARENT}
              // value={state.layersInNextState[0]}
              defaultValue={echoDrillDownComponents}
              placeholder=''
              style={{ width: '100%' }}
              dropdownClassName="action-select"
            />
          </div>
        </div>
      }

    </div>
  )
}

export default memo(connect(({ bar, drillDownGlobalState }: any) => ({ bar, drillDownGlobalState }))(DrillDownSetting))