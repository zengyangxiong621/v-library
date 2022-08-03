import { memo } from 'react'

import EveryComponent from '../everyComponent'

import { getComDataWithFilters } from '@/utils/data'

const MODULES = 'modules'
const OPACITY = 'opacity'

const RecursiveComponent = (props: any) => {
  const { layersArr, componentLists, bar, dispatch,
    screenHeightRatio, screenWidthRatio, scaleValue
  } = props
  return (
    <div className='recursive-component-wrap'>
      {
        layersArr?.map((layer: any, ind: any) => {
          let isGroup: boolean = MODULES in layer
          let targetComponent
          if (!isGroup) {
            targetComponent = componentLists.find((item: any) => item.id === layer.id)
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
                          screenWidthRatio={screenWidthRatio}
                          screenHeightRatio={screenHeightRatio}
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