/* eslint-disable react/prop-types */
import { Button, Checkbox } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import DataConfigDrawer from "../dataConfigDrawer";
import { http } from "../../../../../services/request";
import "./index.less";

const DataFilter = (props) => {
  const _data = props.data;
  const resultData = props.resultData || [];
  const [filterFlag, setFilterFlag] = useState(_data.useFilter);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (props.type === "component") {
      setFilterFlag(_data.useFilter);
    }
  }, [_data.id]);

  const filterBoxChange = async (e) => {
    setFilterFlag(e.target.checked);
    props.onFilterBoxChange(e);
  };

  const showFilterDrawer = () => {
    if (filterFlag) {
      setDrawerVisible(true);
    }
  };

  const drawerClose = () => {
    setDrawerVisible(false);
  };

  const drawerSave = (filters) => {
    // todo
  };

  return (
    <div className="data-filter">
      <Checkbox checked={filterFlag} onChange={filterBoxChange}>
        数据过滤器
      </Checkbox>
      {_data.filters.length ? (
        <Button disabled={!filterFlag} className="filter-num" onClick={showFilterDrawer}>
          已添加{_data.filters.length}个过滤器
        </Button>
      ) : (
        <Button disabled={!filterFlag} onClick={showFilterDrawer}>
          +添加过滤器
        </Button>
      )}
      <DataConfigDrawer
        visible={drawerVisible}
        onClose={drawerClose}
        onSave={drawerSave}
        type={props.type}
        data={_data}
        resultData={resultData}
        onSelectedFiltersChange={props.onSelectedFiltersChange}
        onUpdateFilters={props.onUpdateFilters}
        onDeleteFilters={props.onDeleteFilters}
        onBindFilters={props.onBindFilters}
      />
    </div>
  );
};
export default DataFilter;
