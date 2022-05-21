import React, { memo, useState, useEffect, useRef } from 'react';
import './index.less';
import { connect } from 'dva'
import { v4 as uuidv4 } from 'uuid';
import MonacoEditor from 'react-monaco-editor';
import DataResult from '../dataConfig/dataResult'

import { http } from '../../../../../services/request'

import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';

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
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  MenuOutlined
} from '@ant-design/icons';

const cfilters = [
  {
    id: uuidv4(),
    enable: true,
    name: '过滤器1',
    isEditName: false,
    content: 'return data',
    callbackKeys: [],
    isAddKey: false, // 是否正在添加key
    status: 0,// 0: 未编辑 1：编辑
    moduleIds: [] // 使用该过滤器的组件ID的数组
  },
]

const DataConfigDrawer = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { confirm } = Modal;

  const [visible, setVisible] = useState(props.visible)
  const [filters, setFilters] = useState([])
  const [activeCollapseKeys, setActiveCollapseKeys] = useState([])
  const [filterOfAdd, setFilterOfAdd] = useState(null)
  const [selectFilterOprions, setSelectFilterOprions] = useState([])

  const inputNameRef = useRef(null)
  const inputFiledRef = useRef(null)

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  useEffect(() => {
    effectHandler()
  }, [bar.componentConfig.filters, bar.componentFilters])

  const effectHandler = () => {
    const conFifters = bar.componentConfig?.filters?.map(item => {
      const filterDetail = bar.componentFilters.find(jtem => jtem.id === item.id)
      return {
        ...filterDetail,
        enable: item.enable,
        isEditName: false,
        isAddKey: false,
        status: 0,
      }
    }) || []
    setFilters(conFifters)
    const options = bar.componentFilters.filter(v => {
      if (!bar.componentConfig) {
        return v
      } else {
        return !bar.componentConfig.filters.some((item) => item.id === v.id)
      }
    })
    setSelectFilterOprions(options)
  }

  const onClose = () => {
    setVisible(false)
    props.onClose()
  }

  const selectedFiltersChange = async (val) => {
    await http({
      url: '/visual/module/filter/add',
      method: 'POST',
      body: {
        filterId: val,
        id: bar.key[0]
      }
    })
    // 更新过滤器信息
    const componentFilters = [...bar.componentFilters]
    componentFilters.forEach(filter => {
      if (filter.id === val) {
        filter.moduleIds.push(bar.key[0])
      }
    })
    dispatch({
      type: 'bar/save',
      payload: {
        componentFilters
      }
    })
    // 跟新组件配置信息
    const componentConfig = { ...bar.componentConfig }
    const comFilters = [...componentConfig.filters]
    comFilters.push(
      {
        enable: true,
        id: val
      }
    )
    componentConfig.filters = comFilters
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const addFilter = () => {
    const id= uuidv4()
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

  const editFilterName = (e, filter) => {
    e.stopPropagation()
    filter.isEditName = true
    const all = [...filters]
    setFilters(all)
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
      const componentFilters = [...bar.componentFilters]
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

  const collapseChange = e => {
    setActiveCollapseKeys(e)
  }

  const showComponentDetail = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const useingComponent = (filter) => (
    <React.Fragment>
      {
        filter?.moduleIds?.length ?
          <ul className="component-pop-wraper">
            {filter.moduleIds.map(item => {
              return (
                <li className="component-list">
                  <i className="dot"></i>
                  <span className="title" onClick={e => showComponentDetail(e)}>
                    {bar.components.find(jtem => jtem.id === item).name + "_" + item}
                  </span>
                </li>)
            })}
          </ul>
          : '无正在使用的组件'
      }
    </React.Fragment>
  );

  const deleteFilter = async (event, filter) => {
    event.stopPropagation()
    if (filter.isNewAdd) {
      setFilterOfAdd(null)
    } else {
      // 如果是项目过滤器里面的删除，则需要提示
      // showConfirm(filter)
      // 组件里面的删除，只是解除关联关系
      const data = await http({
        url: '/visual/module/filter/remove',
        method: 'POST',
        body: {
          moduleId: bar.key[0],
          filterIds: [filter.id]
        }
      })
      // 更新过滤器的moduleIds信息
      const componentFilters = [...bar.componentFilters]
      componentFilters.forEach(item => {
        if (item.id === filter.id) {
          item.moduleIds = item.moduleIds.filter(jtem => jtem !== bar.key[0])
        }
      })
      dispatch({
        type: 'bar/save',
        payload: {
          componentFilters
        }
      })
      // 跟新组件配置信息
      const componentConfig = { ...bar.componentConfig }
      componentConfig.filters = componentConfig.filters.filter(item => item.id !== filter.id)
      dispatch({
        type: 'bar/setComponentConfig',
        payload: componentConfig
      })
    }
  }

  const showConfirm = (filter) => {
    confirm({
      title: '删除后可能导致相关组件不可用，是否删除数据过滤器？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确认',
      cancelText: '取消',
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
        filterIds: [filter.id],
        modules: [...filter.moduleIds]
      }
    })
  }

  const enableFifter = async (e, item) => {
    item.enable = e.target.checked
    const data = await http({
      url: '/visual/module/filter/trigger',
      method: 'POST',
      body: {
        id: bar.key[0],
        filterId: item.id,
        enable: e.target.checked
      }
    })
    const componentConfig = { ...bar.componentConfig }
    const comFilters = [...componentConfig.filters]
    comFilters.forEach(filter => {
      if (filter.id === item.id) {
        filter.enable = e.target.checked
      }
    })
    componentConfig.filters = comFilters
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  }

  const handleCallbackKeyClose = (key, item) => {
    item.status = 1
    item.callbackKeys = item.callbackKeys.filter(tag => tag !== key)
    const all = [...filters]
    setFilters(all)
  }

  const addKeyHandle = (e, item) => {
    e.preventDefault();
    item.isAddKey = true
    const filtersNew = [...filters]
    setFilters(filtersNew)
    setTimeout(() => {
      inputFiledRef.current.focus()
    })
  }

  const handleKeyInputConfirm = (e, item) => {
    const value = e.target.value
    if (value && !item.callbackKeys.includes(value)) {
      item.callbackKeys.push(e.target.value)
      item.status = 1
    }
    item.isAddKey = false
    const all = [...filters]
    setFilters(all)
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
    }
  }

  const confirmFilter = item => {
    if (item.isNewAdd) {
      saveNewFifterHandle()
    } else {
      updateFifterHandle(item)
    }
  }

  const saveNewFifterHandle = async () => {
    // 新增保存,创建过滤器，把过滤器添加到当前组件
    const { id, enable, isEditName, isAddKey, status, isNewAdd, ...rest } = filterOfAdd
    const data = await http({
      url: '/visual/module/filter/create',
      method: 'POST',
      body: {
        ...rest,
        dashboardId: bar.dashboardId
      }
    })
    if (data) {
      // 把过滤器添加到当前组件
      const res = await http({
        url: '/visual/module/filter/add',
        method: 'POST',
        body: {
          filterId: data.id,
          id: bar.key[0]
        }
      })
      // 更新过滤器信息
      const componentFilters = [...bar.componentFilters]
      componentFilters.push({
        id: data.id,
        name: data.name,
        content: data.content,
        callbackKeys: data.callbackKeys,
        moduleIds: [bar.key[0]]
      })
      dispatch({
        type: 'bar/save',
        payload: {
          componentFilters
        }
      })
      // 跟新组件配置信息
      const componentConfig = { ...bar.componentConfig }
      componentConfig.filters = res.filters
      dispatch({
        type: 'bar/setComponentConfig',
        payload: componentConfig
      })
      setFilterOfAdd(null)
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
    // 更新过滤器信息
    const componentFilters = [...bar.componentFilters]
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
  }

  const arrayMove = (array, from, to) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  }

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const all = [...filters]
    const newFifters = arrayMove(all, oldIndex, newIndex)
    const comFilters = newFifters.map(item => {
      return {
        id: item.id,
        enable: item.enable
      }
    })
    await http({
      url: '/visual/module/filter/order',
      method: 'POST',
      body: {
        moduleId: bar.key[0],
        filters: comFilters
      }
    })
    // 跟新组件配置信息
    const componentConfig = { ...bar.componentConfig }
    componentConfig.filters = comFilters
    dispatch({
      type: 'bar/setComponentConfig',
      payload: componentConfig
    })
  };

  const DragHandle = sortableHandle(() => <span className="cus-fifter-sort-dot"><MenuOutlined /></span>);

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="cus-sort-wraper">{children}</ul>;
  });

  const editorDidMountHandle = (editor, monaco) => {
    editor.getAction('editor.action.formatDocument').run()  //格式化
  }

  const SortableItem = sortableElement(({ item }) => (
    FilterItem(item)
  ));

  const FilterItem = item => (
    <li className="cus-fifter-sort-item" key={item.id}>
      {!item.isNewAdd ?
        <React.Fragment>
          <DragHandle />
          <Checkbox defaultChecked={item.enable} onChange={v => enableFifter(v, item)} className="sort-box" />
        </React.Fragment> : null
      }
      <Collapse
        defaultActiveKey={activeCollapseKeys}
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
                <div className="cus-code">{`function filter(data){`}</div>
                <div className="code-wraper">
                  <MonacoEditor
                    language="javascript"
                    theme="vs-dark"
                    value={item.content}
                    onChange={(e) => codeChange(e, item)}
                    editorDidMount={editorDidMountHandle}
                    options={{
                      contextmenu: false,
                    }}
                  />
                </div>
                <div className="cus-code">{`}`}</div>
              </div>
            </div>
            <div className="bottom">
              <div className="btn-group">
                <Button ghost onClick={() => { resetFilter(item) }} style={{ marginRight: '8px' }}>取消</Button>
                <Button type="primary" onClick={() => { confirmFilter(item) }}>确认</Button>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </li>
  )

  return (
    <Drawer
      title="数据过滤器"
      placement='right'
      closable={true}
      onClose={onClose}
      visible={visible}
      className='data-config-drawer'
      width="520"
    >
      <div className="drawer-tool">
        <Select
          key={selectFilterOprions.length + 'key'}
          className="custom-select"
          placeholder="请选择过滤器"
          onChange={selectedFiltersChange}
          style={{ marginBottom: 0, width: '374px' }}
        >
          {selectFilterOprions.map(item => {
            return (<Option value={item.id} key={item.id}>{item.name}</Option>)
          })}
        </Select>
        <Button disabled={!!filterOfAdd} type="primary" onClick={addFilter}>新建过滤器</Button>
      </div>
      {
        (filters.length || filterOfAdd) ?
          <SortableContainer onSortEnd={onSortEnd} useDragHandle>
            {filters.map((item, index) => (
              <SortableItem key={item.id} index={index} item={item} />
            ))}
            {
              filterOfAdd ?
                FilterItem(filterOfAdd) : null
            }
          </SortableContainer> : null
      }
      <DataResult data={bar.componentConfig} style={{ width: '488px', height: '326px' }}></DataResult>
    </Drawer>
  )
}

export default connect(({ bar }) => ({
  bar
}))(DataConfigDrawer)