/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState, Fragment } from "react";
import "./index.less";
import { BASEURL } from "@/services/request";
import { connect } from "dva";

import { Input, Select, Upload, Spin } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import LeftTree from "./components/LeftTree";
import RightContent from "./components/rightContent";
import UploadFile from "./components/uploadFile";

const { Option } = Select;
// 功能
const ResourceCenter = ({ resourceCenter, dispatch, history }: any) => {
  // 空间id
  let spaceId: any = 1;
  let pageParams: any = {
    pageNo: 1,
    pageSize: 1000,
  }
  // TODO 后端目前默认是倒排，后续可能需要更改
  // UI图上默认是按照修改时间排
  const [sortMap, setSortMap] = useState<any>({
    updated_time: false
  });
  const [inputValue, setInputValue] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [firstData, setFirstData] = useState({})

  // 获取模板列表数据的方法
  const getDataDispatch = (data?: any) => {
    const currentClass = data.origin ? data : resourceCenter.curSelectedGroup
    let groupId =
      ['-1', 'sysMatAll','myTempAll','sysTempAll'].indexOf(currentClass.groupId) > -1
        ? null
        : ['myTempOhter', 'sysTempOhter'].indexOf(currentClass.groupId) > -1 ? 0 : currentClass.groupId;
    let finalBody:any = {
      spaceId:['myresource','myTemp'].indexOf(currentClass.origin) > -1 ? spaceId : null,
      type: [currentClass.origin],
      ...pageParams,
      map: sortMap,
    };
    if(['myresource','myTemp','systemTemp'].indexOf(currentClass.origin) > -1){
      finalBody.groupId = groupId
    }else{
      finalBody.subType = groupId ? [groupId] : []
    }
    finalBody = data.origin ? finalBody : {...finalBody,...data }
    dispatch({
      type: "resourceCenter/getRightLists",
      payload: finalBody
    });
  };

  /**
   * description:  刷新左侧列表
   */
  const refreshGroupLists = () => {
     dispatch({
      type: "resourceCenter/getGroupTree",
      payload: {
        spaceId
      },
      cb: (data:any) => {
        // 默认选中第一个数据
        const first = data[0].children[0].children[0]
        // 设置左侧第一个
        dispatch({
          type: "resourceCenter/resetModel",
          payload: {
            curSelectedGroup: first,
            curSelectedGroupName: first.name
          }
        });
        let finalBody = {
          ...first,
          spaceId: first.origin === 'myresource' ? '1' : null,
          groupId: first.groupId === '-1' ? null : first.groupId, // 系统素材下不传
          type: [first.origin]
        };
        getDataDispatch(finalBody)
      }
    });
  };
  // 页面初始化- 请求模板列表数据
  useEffect(() => {
    // 先获取左侧数据
    refreshGroupLists()
  }, []);

  // 搜索框的值改变
  const changeSearchValue = (e: any) => {
    setInputValue(e.target.value);
  };
  // 当切换任意分组时，都需要清除输入框里的值
  const clearSearchInputState = () => {
    setInputValue("");
  };
  // 搜索应用
  const search = (value: string) => {
    let finalBody:any = {
      name: value,
    };
    getDataDispatch(finalBody);
  };
  // 选择排序的标准
  const selectSortType = (value: any, b: any) => {
    const newSortMap = {
      [value]: false
    };
    setSortMap(newSortMap);
    // 选择新标准后，需要发送一次请求
    const finalBody = {
      map: newSortMap
    };
    getDataDispatch(finalBody);
  };
  /**
   * description:  刷新左侧分组列表和右侧应用列表
   */
  // const refreshList = () => {
  //   getDataDispatch();
  //   dispatch({
  //     type: "resourceCenter/getGroupTree",
  //     payload: {
  //       spaceId
  //     }
  //   });
  // };
  const handleUpload = () => {
    setUploadVisible(true);
  };

  const changeShowState = (modalType: any) => {
    setUploadVisible(modalType);
  };

  return (
    <div className="resourceCenter-wrap">
      <div className="left">
        {  
          resourceCenter.treeLoading ?
          <Spin className='tree-loading' size="large" /> :
          <LeftTree
            clearSearchInputState={clearSearchInputState}
            getDataDispatch={getDataDispatch}
            refreshGroupLists={refreshGroupLists}
          />
        }
      </div>
      <div className="right">
      <Fragment>
        <div className="right-header">
          <div className="set-flex">
            <p className="title">
              {resourceCenter.curSelectedGroupName || "全部应用"}
            </p>
          </div>
          <div className="add-search">
            <div className="custom-btn" onClick={handleUpload}>
              <PlusOutlined style={{ fontSize: "12px", marginRight: "2px" }} />
              <span>{['myTemp', 'systemTemp'].indexOf(resourceCenter.curSelectedGroup?.origin) > -1 ? '上传模板' : '上传素材'}</span>
            </div>
            <div className="search-wrap">
              <Input.Search
                value={inputValue}
                onChange={changeSearchValue}
                placeholder="搜索"
                className="search"
                allowClear
                maxLength={40}
                onSearch={search}
              ></Input.Search>
              <Select
                className="db-select"
                defaultValue="按修改时间排序"
                onChange={selectSortType}
              >
                <Option value="updated_time">按修改时间排序</Option>
                <Option value="name">按名称排序</Option>
                <Option value="created_time">按新建时间排序</Option>
              </Select>
            </div>
          </div>
        </div>
        {/* 右侧 */}
        {
          resourceCenter.resourceLoading ?  <Spin size="large" className='right-loading' /> :
          <RightContent listData={resourceCenter.rightLists} refreshList={refreshGroupLists} />
        }
      </Fragment>
        {/* 上传素材 */}
        {resourceCenter.groupList.length > 0 && uploadVisible && (
          <UploadFile
            uploadVisible={uploadVisible}
            groupList={ ['design','myresource'].indexOf(resourceCenter.curSelectedGroup.origin) > -1 ? resourceCenter.groupList[1] : resourceCenter.groupList[0]}
            origin={resourceCenter.curSelectedGroup.origin}
            changeShowState={changeShowState}
            refreshList={refreshGroupLists}
          ></UploadFile>
        )}
      </div>
    </div>
  );
};

export default memo(
  connect(({ resourceCenter }: any) => ({ resourceCenter }))(ResourceCenter)
);
