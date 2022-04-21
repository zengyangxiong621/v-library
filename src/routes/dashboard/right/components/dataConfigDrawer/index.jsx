import React, { memo, useState, useEffect } from 'react';
import './index.less';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash/debounce';

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
  Tag
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';

import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/theme-twilight"

const cfilters = [
  {
    id: uuidv4(),
    enable: true,
    name: '过滤器1',
    isEditName: false,
    content: 'return data',
    callbackKeys: [],
    isAddKey: false, // 是否正在添加key
    editkeycontent: '', // 正在编辑的key内容
    status: 0 // 0: 未编辑 1：编辑
  },
  {
    id: uuidv4(),
    enable: true,
    name: '过滤器2',
    isEditName: false,
    content: 'return data',
    callbackKeys: [],
    isAddKey: false,
    editkeycontent: '',
    status: 0 // 0: 未编辑 1：编辑
  },
]

const DataConfigDrawer = props => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { confirm } = Modal;

  const [visible, setVisible] = useState(props.visible)
  const [filters, setFilters] = useState(cfilters)
  const [isEdit, setEdit] = useState(false)

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  useEffect(() => {
    const flag = filters.find(item => item.status === 1)
    if (flag) {
      setEdit(true)
    }
  }, [filters])

  const onClose = () => {
    console.log('11111')
    setVisible(false)
    props.onClose()
  }

  const selectedFiltersChange = (val) => {
    console.log('val', val)
  }

  const addFilter = () => {
    const all = [...filters]
    all.push({
      id: uuidv4(),
      enable: true,
      name: '新增过滤器',
      isEditName: false,
      content: 'return data',
      callbackKeys: [],
      isAddKey: false,
      editkeycontent: '',
      status: 1 // 0: 未编辑 1：编辑
    })
    setFilters(all)
  }

  const genHeader = filter => (
    <React.Fragment>
      {
        filter.isEditName ?
          <React.Fragment>
            <Input style={{ width: '84px', float: 'left' }}
              className="cus-input"
              placeholder={filter.name}
              defaultValue={filter.name}
              onChange={e => editName(e, filter)}
              onClick={e => e.stopPropagation()}
            />
          </React.Fragment>
          :
          <React.Fragment>
            <span>{filter.name}</span>
            <EditOutlined style={{ color: '#2482FF', lineHeight: '32px', marginLeft: '8px' }} onClick={e => editFilterName(e, filter)} />
          </React.Fragment>
      }
    </React.Fragment>
  )

  const editFilterName = (e, filter) => {
    console.log('11111')
    e.stopPropagation()
    filter.status = 1
    filter.isEditName = true
    const all = [...filters]
    setFilters(all)
  }

  const editName = (e, filter) => {
    e.stopPropagation();
    filter.name = e.target.value
    // TODO: 调用接口保存
  }

  const genExtra = (id) => (
    <React.Fragment>
      <span className="collapse-header-opt">
        <span className="collapse-header-num">2</span>
        个组件正在调用
      </span>
      <DeleteOutlined
        style={{ color: '#2482FF' }}
        onClick={event => {
          deleteFilter(event, id)
        }}
      />
    </React.Fragment>
  )

  const deleteFilter = (event, id) => {
    event.stopPropagation()
    showConfirm(id)
  }

  const showConfirm = (id) => {
    confirm({
      title: '删除后可能导致相关组件不可用，是否删除数据过滤器？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteFilterHandle(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const deleteFilterHandle = (id) => {
    const allFilters = [...filters]
    const rest = allFilters.filter(item => item.id !== id)
    setFilters(rest)
    // TODO 接口保存
  }

  const enableFifter = (e, item) => {
    console.log('e', e)
    item.enable = e.target.checked
    const all = [...filters]
    setFilters(all)
  }

  const handleCallbackKeyClose = (key, item) => {
    item.status = 1
    item.callbackKeys = item.callbackKeys.filter(tag => tag !== key)
    const all = [...filters]
    setFilters(all)
  }

  const addKeyHandle = item => {
    item.isAddKey = true
    const all = [...filters]
    setFilters(all)
  }

  const handleKeyInputChange = debounce((e, item) => {
    item.editkeycontent = e.target.value
    const all = [...filters]
    setFilters(all)
  }, 300)

  const handleKeyInputConfirm = (item) => {
    if (item.editkeycontent) {
      item.callbackKeys.push(item.editkeycontent)
    }
    item.editkeycontent = ''
    item.isAddKey = false
    const all = [...filters]
    setFilters(all)
  }

  const codeChange = debounce((e, item) => {
    item.content = e
    item.status = 1
    const all = [...filters]
    setFilters(all)
  }, 300)

  const resetFilter = (pane) => {
    console.log('pane', pane)
  }

  const confirmFilter = (item) => {
    // TODO 保存接口
    item.status = 0
    const all = [...filters]
    setFilters(all)
    props.onSave(filters)
  }

  const arrayMove = (array, from, to) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('oldIndex, newIndex', oldIndex, newIndex)
    const all = [...filters]
    const newFifters = arrayMove(all, oldIndex, newIndex)
    setFilters(newFifters)

    // TODO: saves
  };

  const DragHandle = sortableHandle(() => <span className="sort-dot">::</span>);

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="sort-wraper">{children}</ul>;
  });

  const SortableItem = sortableElement(({ item }) => (
    <li className="fifter-sort-item">
      <DragHandle />
      <Checkbox defaultChecked={item.enable} onChange={v => enableFifter(v, item)} className="sort-box" />
      <Collapse
        accordion
        key={item.id}
        className="custom-collapse">
        <Panel header={genHeader(item)} key={item.id} extra={genExtra(item.id)}>
          <div className="filter-wraper">
            <div className="header">
              <span className="fif-title">回调字段</span>
              {
                item.callbackKeys.map(key => (
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
              {/* {JSON.stringify(item)} */}
              {item.isAddKey ? (
                <Input
                  type="text"
                  style={{ width: 78 }}
                  defaultValue={item.editkeycontent}
                  onChange={e => handleKeyInputChange(e, item)}
                  onBlur={()=>handleKeyInputConfirm(item)}
                  onPressEnter={()=>handleKeyInputConfirm(item)}
                />
              ) : (
                <Tag onClick={()=>addKeyHandle(item)} className="site-tag-plus">
                  <PlusOutlined /> 添加回调
                </Tag>
              )}
            </div>
            <div className="body">
              <div className="code-editor">
                <div className="cus-code">{`function filter(data){`}</div>
                <div className="code-wraper">
                  <AceEditor
                    mode='javascript'
                    theme="twilight"
                    onChange={e => codeChange(e, item)}
                    name={uuidv4()}
                    editorProps={{ $blockScrolling: true }}
                    value={item.content}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showGutter: true,
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className="cus-code">{`}`}</div>
              </div>
            </div>
            <div className="bottom">
              <p className={['status', item.status === 0 ? 'saved' : 'unsave'].join(' ')}>
                {item.status === 0 ? '已保存' : '未保存'}
              </p>
              <div className="btn-group">
                <Button ghost onClick={() => { resetFilter(item) }} style={{ marginRight: '8px' }}>取消</Button>
                <Button type="primary" onClick={() => { confirmFilter(item) }}>确认</Button>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </li>
  ));

  return (
    <Drawer
      title="数据过滤器"
      placement='right'
      closable={true}
      onClose={onClose}
      visible={visible}
      className='event-drawer data-config-drawer'
    >
      <div className="drawer-tool">
        <Select
          className="custom-select"
          placeholder="请选择过滤器"
          onChange={selectedFiltersChange}
          style={{ marginBottom: 0, width: '220px' }}
        >
          <Option value='1' key='1'>过滤器1</Option>
          <Option value='2' key='2'>过滤器2</Option>
        </Select>
        <Button disabled={isEdit} type="primary" onClick={addFilter}>添加条件</Button>
      </div>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {filters.map((item, index) => (
          <SortableItem key={item.id} index={index} item={item} />
        ))}
      </SortableContainer>
    </Drawer>
  )
}

export default memo(DataConfigDrawer)