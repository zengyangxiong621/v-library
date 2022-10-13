import React, { memo, useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.less'
import {
  Drawer,
  Button,
  Collapse,
  Select,
  Input,
  Modal,
  Checkbox,
  Tag,
  Popover
} from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'

import { cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { http } from '../../../../services/request'
import { findLayerById } from '@/utils/index'
import ModalConfirm from '@/components/modalConfirm'
import CodeEditor from '../../right/components/codeEditor/editor'

const cfilters = [
  {
    id: uuidv4(),
    name: '过滤器1',
    isEditName: false,
    content: 'return data',
    callbackKeys: [],
    isAddKey: false, // 是否正在添加key
    status: 0,// 0: 未编辑 1：编辑
    moduleIds: [] // 使用该过滤器的组件ID的数组
  },
]

const DataFilters = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;

  const drawerRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [isBatchManage, setIsBatchManage] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [delFilters, setDelFilters] = useState([])
  const [filterOfAdd, setFilterOfAdd] = useState(null)
  const [dataFilters, setDataFilters] = useState([])
  const [activeCollapseKeys, setActiveCollapseKeys] = useState([])

  const inputNameRef = useRef(null)
  const inputFiledRef = useRef(null)

  useEffect(() => {
    if (props.visible) {
      const dataFiltersTmp = cloneDeep(bar.componentFilters)
      dataFiltersTmp.forEach(item => {
        item.isEditName = false
        item.isAddKey = false
        item.status = 0
      })
      setDataFilters(dataFiltersTmp)
    }
  }, [props.visible])

  const onClose = () => {
    setInputValue('')
    handleSearch('')
    props.onChange(false)
  }

  const handleSearch = (value) => {
    let dataFiltersTmp = cloneDeep(bar.componentFilters)
    dataFiltersTmp.forEach(item => {
      item.isEditName = false
      item.isAddKey = false
      item.status = 0
    })
    if (value.trim()) {
      dataFiltersTmp = dataFiltersTmp.filter(item => {
        return item.name.indexOf(value) !== -1
      })
      setIsSearch(true)
    } else {
      setIsSearch(false)
    }
    setDataFilters(dataFiltersTmp)
  }

  const checkChange = (e, item) => {
    const checked = e.target.checked
    let delFiltersTmp = [...delFilters]
    if (checked) {
      delFiltersTmp.push(item)
    } else {
      delFiltersTmp = delFiltersTmp.filter(f => f.id !== item.id)
    }
    setDelFilters(delFiltersTmp)
  }

  const collapseChange = e => {
    setActiveCollapseKeys(e)
  }

  const editFilterName = (e, filter) => {
    e.stopPropagation()
    filter.isEditName = true
    const all = [...dataFilters]
    setDataFilters(all)
    setTimeout(() => {
      inputNameRef.current.focus()
    })
  }

  const editName = async (e, filter) => {
    e.stopPropagation();
    filter.name = e.target.value
    filter.isEditName = false
    if (filter.isNewAdd) {
      const filterOfAddNew = { ...filterOfAdd }
      setFilterOfAdd(filterOfAddNew)
    } else {
      const { id, name, callbackKeys, content } = filter
      await http({
        url: '/visual/module/filter/update',
        method: 'POST',
        body: {
          id,
          name,
          callbackKeys,
          content,
          dashboardId: bar.dashboardId
        }
      })
      // 更新bar里面的componentFilters
      const componentFilters = cloneDeep(bar.componentFilters)
      componentFilters.forEach(item => {
        if (item.id === id) {
          item.name = e.target.value
        }
      })
      dispatch({
        type: 'bar/save',
        payload: {
          componentFilters,
        },
      })
    }
  }

  const batchManageFilters = () => {
    setIsBatchManage(true)
  }

  const addFilter = () => {
    const id = uuidv4()
    setFilterOfAdd({
      id,
      enable: true,
      name: '新增过滤器',
      isEditName: false,
      content: 'return data',
      callbackKeys: [],
      isAddKey: false,
      status: 1, // 0: 未编辑 1：编辑
      isNewAdd: true,
    })
    const activeCollapseKeysNew = [...activeCollapseKeys]
    activeCollapseKeysNew.push(id)
    setActiveCollapseKeys(activeCollapseKeysNew)
  }

  const deleteFilters = () => {
    ModalConfirm({
      title: '删除确认',
      content: '删除后可能导致相关组件不可用，是否删除数据过滤器？',
      onOk() {
        const filterIds = delFilters.map(item => item.id)
        let moduleIds = delFilters.reduce((pre, cur, index) => {
          return pre.concat(...cur.moduleIds)
        }, [])
        moduleIds = [...new Set(moduleIds)]
        batchDeleteFilterHandle(filterIds,moduleIds)
      },
      onCancel() {
        // do nothing
      },
    });
  }

  const batchDeleteFilterHandle = async (filterIds,moduleIds) => {
    const data = await http({
      url: '/visual/module/filter/delete',
      method: 'POST',
      body: {
        filterIds
      }
    })
    // 更新bar中的过滤器
    let componentFilters = cloneDeep(bar.componentFilters)
    componentFilters = componentFilters.filter(item => {
      return !filterIds.includes(item.id)
    })
    dispatch({
      type: 'bar/save',
      payload: {
        componentFilters
      }
    })
    // 更新列表、
    let dataFiltersTmp = [...dataFilters]
    dataFiltersTmp = dataFiltersTmp.filter(item => {
      return !filterIds.includes(item.id)
    })
    setDataFilters(dataFiltersTmp)
    // 设置删除数据列表为空
    setDelFilters([])
    // 更新组件配置信息
    const componentConfig = { ...bar.componentConfig }
    if (moduleIds.includes(componentConfig.id)) {
      componentConfig.filters = componentConfig.filters.filter(item => !moduleIds.includes(item.id))
      dispatch({
        type: 'bar/setComponentConfig',
        payload: componentConfig
      })
    }
    // 更新所有组件中使用到该过滤器的配置信息
    if (moduleIds.length) {
      const components = [...bar.fullAmountComponents]
      moduleIds.forEach(id => {
        components.forEach(component => {
          if (id === component.id) {
            component.filters = component.filters.filter(item => !moduleIds.includes(item.id))
          }
        })
      })
      dispatch({
        type: 'bar/save',
        payload: {
          components
        }
      })
    }
  }

  const cancelOperation = () => {
    setIsBatchManage(false)
  }

  const useingComponent = (filter) => (
    <React.Fragment>
      {
        filter?.moduleIds?.length ?
          <ul className="component-pop-wraper">
            {filter.moduleIds.map(item => {
              return (
                <li className="component-list" key={item.id}>
                  <i className="dot"></i>
                  <span className="title" onClick={e => showComponentDetail(e, item)}>
                    {bar.fullAmountComponents.find(jtem => jtem.id === item)?.name + "_" + item}
                  </span>
                </li>)
            })}
          </ul>
          : '无正在使用的组件'
      }
    </React.Fragment>
  );

  const showComponentDetail = (e, id) => {
    const layer = findLayerById(bar.layers, id)
    dispatch({
      type: 'bar/selectLayers',
      payload: [layer]
    })
    dispatch({
      type: 'bar/save',
      payload: {
        key: [id]
      }
    })
    e.preventDefault()
    e.stopPropagation()
  }

  const deleteFilter = async (event, filter) => {
    event.stopPropagation()
    if (filter.isNewAdd) {
      setFilterOfAdd(null)
    } else {
      showConfirm(filter)
    }
  }
  const showConfirm = (filter) => {
    ModalConfirm({
      title: '删除确认',
      content: '删除后可能导致相关组件不可用，是否删除数据过滤器？',
      onOk() {
        deleteFilterHandle(filter)
      },
      onCancel() {
        // do nothing
      },
    });
  }

  const deleteFilterHandle = async (filter) => {
    const data = await http({
      url: '/visual/module/filter/delete',
      method: 'POST',
      body: {
        filterIds: [filter.id]
      }
    })
    // 更新bar中的过滤器
    let componentFilters = cloneDeep(bar.componentFilters)
    componentFilters = componentFilters.filter(item => item.id !== filter.id)
    dispatch({
      type: 'bar/save',
      payload: {
        componentFilters
      }
    })
    // 更新列表、
    let dataFiltersTmp = [...dataFilters]
    dataFiltersTmp = dataFiltersTmp.filter(item => item.id !== filter.id)
    setDataFilters(dataFiltersTmp)
    // 更新组件配置信息
    const componentConfig = { ...bar.componentConfig }
    if (filter.moduleIds.includes(componentConfig.id)) {
      componentConfig.filters = componentConfig.filters.filter(item => item.id !== filter.id)
      dispatch({
        type: 'bar/setComponentConfig',
        payload: componentConfig
      })
    }
    // 更新所有组件中使用到该过滤器的配置信息
    if (filter.moduleIds.length) {
      const components = [...bar.fullAmountComponents]
      filter.moduleIds.forEach(id => {
        components.forEach(component => {
          if (id === component.id) {
            component.filters = component.filters.filter(item => item.id !== filter.id)
          }
        })
      })
      dispatch({
        type: 'bar/save',
        payload: {
          components
        }
      })
    }
    // 更新所有数据容器中使用到该过滤器的配置信息
    const dataContainerList = [...bar.dataContainerList]
    if(dataContainerList.length){
      dataContainerList.forEach(item => {
        item.filters = item.filters.filter(fi => fi.id !==filter.id)
      })
    }
    dispatch({
      type: 'bar/save',
      payload: {
        dataContainerList
      }
    })
  }

  const genHeader = filter => (
    <div className="cus-fifter-pan-header">
      <div className="cus-fifter-pan-title">
        <span className="cus-fifter-name">
          {
            filter.isEditName ?
              <Input
                ref={inputNameRef}
                defaultValue={filter.name}
                onClick={e => { e.stopPropagation() }}
                onBlur={(e) => editName(e, filter)}
                onPressEnter={(e) => editName(e, filter)} />
              : <span title={filter.name}>{filter.name}</span>
          }
        </span>
        <EditOutlined onClick={event => editFilterName(event, filter)} />
        {
          filter.status === 1 ? <span className="cus-fifter-pan-add-status">
            <i></i>未保存
          </span> : null
        }
      </div>
      <div className="cus-fifter-pan-opt">
        {
          !filter.isNewAdd ?
            <span className="collapse-header-opt">
              <Popover overlayClassName="cus-component-popover" content={useingComponent(filter)} title="">
                <span className="collapse-header-num">{filter?.moduleIds?.length || 0}</span>
                个组件正在调用
              </Popover>
            </span>
            : null
        }
        <DeleteOutlined
          onClick={event => {
            deleteFilter(event, filter)
          }}
        />
      </div>
    </div>
  )

  const handleCallbackKeyClose = (key, item) => {
    item.status = 1
    item.callbackKeys = item.callbackKeys.filter(tag => tag !== key)
    const all = [...dataFilters]
    setDataFilters(all)
  }

  const handleKeyInputConfirm = (e, item) => {
    const value = e.target.value
    if (value && !item.callbackKeys.includes(value)) {
      item.callbackKeys.push(e.target.value)
      item.status = 1
    }
    item.isAddKey = false
    const all = [...dataFilters]
    setDataFilters(all)
  }

  const addKeyHandle = (e, item) => {
    e.preventDefault();
    item.isAddKey = true
    const filtersNew = [...dataFilters]
    setDataFilters(filtersNew)
    setTimeout(() => {
      inputFiledRef.current.focus()
    })
  }

  const codeChange = (e, item) => {
    item.content = e
    item.status = 1
  }

  const resetFilter = (filter) => {
    if (filter.isNewAdd) {
      setFilterOfAdd(null)
    } else {
      effectHandler()
      const activeCollapseKeysNew = [...activeCollapseKeys]
      setActiveCollapseKeys(activeCollapseKeysNew.filter(item => item !== filter.id))
    }
  }

  const effectHandler = () => {
    const filterDetail = cloneDeep(bar.componentFilters)
    filterDetail.map(item => {
      return {
        ...item,
        isEditName: false,
        isAddKey: false,
        status: 0,
      }
    })
    setDataFilters(filterDetail)
  }

  const confirmFilter = async (item) => {
    if (item.isNewAdd) {
      await saveNewFifterHandle()
    } else {
      await updateFifterHandle(item)
    }
  }

  const saveNewFifterHandle = async () => {
    // 新增保存,创建过滤器
    const { id, isEditName, isAddKey, status, isNewAdd, ...rest } = filterOfAdd
    const data = await http({
      url: '/visual/module/filter/create',
      method: 'POST',
      body: {
        ...rest,
        dashboardId: bar.dashboardId
      }
    })
    if (data) {
      const componentFilters = cloneDeep(bar.componentFilters)
      componentFilters.push({
        id: data.id,
        name: data.name,
        content: data.content,
        callbackKeys: data.callbackKeys,
        moduleIds: []
      })
      await dispatch({
        type: 'bar/save',
        payload: {
          componentFilters
        }
      })
      setFilterOfAdd(null)
      // 更新列表
      const componentFiltersTmp = cloneDeep(componentFilters)
      componentFiltersTmp.map(item => {
        return {
          ...item,
          isEditName: false,
          isAddKey: false,
          status: 0,
        }
      })
      setDataFilters(componentFiltersTmp)
    }
  }

  const updateFifterHandle = async (filter) => {
    const { id, name, callbackKeys, content } = filter
    const data = await http({
      url: '/visual/module/filter/update',
      method: 'POST',
      body: {
        id,
        name,
        callbackKeys,
        content,
        dashboardId: bar.dashboardId
      }
    })
    if (data) {
      const componentFilters = cloneDeep(bar.componentFilters)
      componentFilters.forEach(item => {
        if (item.id === filter.id) {
          item.id = id
          item.name = name
          item.callbackKeys = callbackKeys
          item.content = content
        }
      })
      dispatch({
        type: 'bar/save',
        payload: {
          componentFilters
        }
      })
      const componentFiltersTmp = cloneDeep(componentFilters)
      componentFiltersTmp.map(item => {
        return {
          ...item,
          isEditName: false,
          isAddKey: false,
          status: 0,
        }
      })
      setDataFilters(componentFiltersTmp)
      const activeCollapseKeysNew = [...activeCollapseKeys]
      setActiveCollapseKeys(activeCollapseKeysNew.filter(item => item !== filter.id))
    }
  }

  const FilterItem = item => {
    return <li className={['cus-fifter-sort-item', isBatchManage ? 'cus-fifter-sort-item-checkbox' : null].join(' ')} key={item.id}>
      {isBatchManage ?
        <React.Fragment>
          <Checkbox onChange={v => checkChange(v, item)} className="sort-box" />
        </React.Fragment> : null
      }
      <Collapse
        activeKey={activeCollapseKeys}
        onChange={collapseChange}
        className={['custom-collapse', item.isNewAdd ? 'collapse-add-filter' : null].join(' ')}
      >
        <Panel header={genHeader(item)} key={item.id}>
          <div className="cus-filter-content-wraper">
            <div className="cus-header">
              <span className="fif-title">回调字段</span>
              {
                item?.callbackKeys?.map(key => (
                  <Tag
                    closable
                    onClose={e => {
                      e.preventDefault();
                      handleCallbackKeyClose(key, item);
                    }}
                  >
                    {key}
                  </Tag>
                ))
              }
              {item.isAddKey ? (
                <Input
                  ref={inputFiledRef}
                  type="text"
                  style={{ width: 78 }}
                  onBlur={(e) => handleKeyInputConfirm(e, item)}
                  onPressEnter={(e) => handleKeyInputConfirm(e, item)}
                />
              ) : (
                <Tag onClick={(e) => addKeyHandle(e, item)} className="site-tag-plus">
                  <PlusOutlined /> 添加回调
                </Tag>
              )}
            </div>
            <div className="body">
              <div className="code-editor">
                <div className="cus-code">{`function filter(data,callbackArgs,crossCallback){`}</div>
                <div className="code-wraper">
                  <CodeEditor value={item.content} language="javascript" onChange={(e) => codeChange(e, item)}></CodeEditor>
                </div>
                <div className="cus-code">{`}`}</div>
              </div>
            </div>
            <div className="bottom">
              <div className="btn-group">
                <Button ghost onClick={() => { resetFilter(item) }} style={{ marginRight: '8px' }}>取消</Button>
                <Button type="primary" onClick={async () => {
                  await confirmFilter(item)
                }}>确认</Button>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </li>
  }

  return (
    <div className="data-filters-wrap">
      <Drawer
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            <span />
            项目过滤器
            <CloseOutlined onClick={onClose} className="g-cursor-pointer" />
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={props.visible}
        ref={drawerRef}
        className="data-filters-drawer"
        getContainer={false}
        style={{ position: 'absolute' }}
        width={520}
        maskStyle={{ animation: 'unset' }}
      >
        <div className="data-filters-body-wrapper">
          <div className="data-filters-handle">
            <Input
              placeholder="请输入"
              maxLength={30}
              suffix={<SearchOutlined
                className="input-search-icon"
                onClick={() => handleSearch(inputValue)}
              />}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              allowClear
              onSearch={(e) => handleSearch(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
            />
            {
              isBatchManage ?
                <React.Fragment>
                  <Button style={{ marginRight: '16px' }} disabled={!delFilters.length} onClick={deleteFilters}>删除</Button>
                  <Button onClick={cancelOperation}>取消操作</Button>
                </React.Fragment>
                :
                <React.Fragment>
                  <Button style={{ marginRight: '16px' }} onClick={batchManageFilters}>批量管理</Button>
                  <Button type="primary" disabled={!!filterOfAdd} onClick={addFilter}>添加过滤器</Button>
                </React.Fragment>
            }
          </div>
          <div className="data-filters-content">
            {
              (dataFilters.length || filterOfAdd) ?
                <React.Fragment>
                  {dataFilters.map((item, index) => {
                    return FilterItem(item)
                  })}
                  {
                    filterOfAdd && !isBatchManage && !isSearch ?
                      FilterItem(filterOfAdd) : null
                  }
                </React.Fragment>
                : '暂无数据'
            }
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataFilters)

