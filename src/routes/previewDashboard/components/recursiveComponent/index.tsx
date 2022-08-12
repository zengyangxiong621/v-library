import React, { memo } from 'react'

import EveryComponent from '../everyComponent'
import ReferencePanel from '@/customComponents/referencePanel'
import DynamicPanel from '@/customComponents/dynamicPanel/index'
import { getComDataWithFilters } from '@/utils/data'

const MODULES = 'modules'
const OPACITY = 'opacity'

const RecursiveComponent = (props: any) => {
  const { layersArr, componentLists, bar, dispatch, scaleValue, panels } = props
  return (
    <div className='recursive-component-wrap'>
      {
        layersArr?.map((layer: any, ind: any) => {
          let isGroup: boolean = MODULES in layer
          let isPanel: boolean = ('panelType' in layer)
          let targetComponent, targetPanel
          if (!isGroup) {
            targetComponent = componentLists.find((item: any) => item.id === layer.id)
          }
          if (isPanel) {
            targetPanel = panels.find((item: any) => item.id === layer.id)
          }
          return (
            <div
              data-id={isGroup ? layer.id : 'component-' + layer.id}
              key={layer.id}
              style={{
                visibility: !layer.isShow ? 'hidden' : 'unset',
              }}
            >
              {
                isPanel ?
                  (layer.panelType === 0 ?
                      <div
                        className="panel-container"
                        style={{
                          position: 'absolute',
                          left: targetPanel.config.left + 'px',
                          top: targetPanel.config.top + 'px'
                        }}
                      >
                        <DynamicPanel
                          id={layer.id}
                          panels={panels}
                          isDashboard={false}
                        />
                      </div>:
                      <div
                        className="panel-container"
                      >
                        <ReferencePanel
                          id={layer.id}
                          panels={panels}
                          isDashboard={false}
                        />
                      </div>
                  ) :
                isGroup ?
                  <div className="no-cancel"
                    style={{
                      opacity: (layer[OPACITY] || 100) / 100
                    }}
                  >
                    {(layer as any)[MODULES]?.length > 0 &&
                      <div>
                        <RecursiveComponent
                          layersArr={layer[MODULES]}
                          componentLists={componentLists}
                          bar={bar}
                          dispatch={dispatch}
                          scaleValue={scaleValue}
                          panels={panels}
                        />
                      </div>
                    }
                  </div>
                  : <>
                    <div data-id={layer.id} style={{ width: '100%', height: '100%' }}>
                      {
                        <EveryComponent key={ind}
                          componentData={targetComponent}
                          comData={getComDataWithFilters(bar.componentData, targetComponent, bar.componentFilters, bar.dataContainerDataList, bar.dataContainerList, bar.callbackArgs, layer)}
                          scaleValue={scaleValue}
                        />
                      }
                    </div>
                  </>
              }
            </div>
          )
        })
      }

    </div>
  )
}

export default memo(RecursiveComponent)
