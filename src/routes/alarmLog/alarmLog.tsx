import React, { useState, useEffect } from 'react'
import './index.less';

import { http } from '@/services/request'

import 'moment/locale/zh-cn';
import moment from 'moment';
import type { Moment } from 'moment';

import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider, DatePicker, Select, Button, Input, message, Badge, Tooltip,  } from 'antd'
import type { TimeRangePickerProps } from 'antd';
import { FileDoneOutlined,UserOutlined  } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;


type RangeValue = [Moment | null, Moment | null] | null;


const AlarmLog: React.FC = (props:any) => {
  const [momentDates, setMomentDates] = useState<RangeValue>([moment().add(-1, 'M'),moment()]) //当前Moment时间
  const [startDate, setStartDate] = useState(moment().add(-1, 'M').format("YYYY-MM-DD") + " 00:00:00") //开始日期
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD") + " 23:59:59") //结束日期
  const [stateRead, setStateRead] = useState<string | number>('') //当前状态
  const [pageNo, setPageNo] = useState(1) //当前页码
  const [pageSize, setPageSize] = useState(10) //当前每页数量
  const [keywords, setKeywords] = useState('') //当前关键词
  const [map, setMap] = useState({updatedTime:false}) //时间字段排序
  const [unreadNum, setUnreadNum] = useState(0) //未读数量

  const [value, setValue] = useState<RangeValue>(null)
  const [hackValue, setHackValue] = useState<RangeValue>(null);

  // 转换stateRead
  const stateReadTransform = (state:string | number) => {
    return state === "" ? '' : Boolean(state)
  }
  // 初始化和改变时间
  useEffect(() => {
    requestData()
  }, [])
  // 请求列表
  const requestData = async (obj:object = {}) => {
    console.log('请求网络')
    const read = stateReadTransform(stateRead)
    const allParams = { startDate,endDate,pageNo,pageSize,keywords,read,map }
    console.log({...allParams,...obj});
    requestUnreadNum() //请求未读数量
    try {
      const data = await http({
        url: '/visual/alarmInfo/list',
        method: 'post',
        body: {...allParams,...obj}
      })
      console.log(data)
    } catch (error) {
      console.log(error); 
    }finally{

    }
  }
  // 改变时间
  const handerChangeTiem: TimeRangePickerProps['onChange'] = (val, dateStrings) => {
    let startDate = dateStrings[0] && dateStrings[0] + " 00:00:00"
    let endDate = dateStrings[1] && dateStrings[1] + " 23:59:59"
    setStartDate(startDate)
    setEndDate(endDate)
    setMomentDates(val)
    requestData({startDate,endDate})
  }
  // 弹出日历和关闭日历的回调
  const handerOpenChange = (open:boolean) => {
    if(open){
      setHackValue([null,null])
    }else{
      setHackValue(null)
    }
  }
  // 改变状态
  const handleChangeState = (value: string | number) => {
    setStateRead(value)
    const read = stateReadTransform(value)
    requestData({read})
  }
  // 重置
  const handleReset = () => {
    const startDate = moment().add(-1, 'M').format("YYYY-MM-DD") + " 00:00:00"
    const endDate = moment().format("YYYY-MM-DD") + " 23:59:59"
    const read = ""
    setStartDate(startDate)
    setEndDate(endDate)
    setMomentDates([moment().add(-1, 'M'),moment()])
    setStateRead('')
    requestData({startDate,endDate,read})
   }
  // 搜索回调
  const handleSearch = (value: string) => {
    setKeywords(value)
    requestData({keywords:value})
  }
  // 全部告警更新已读状态请求
  const requesAllRead = async (obj:object = {}) => {
    try {
      const data = await http({
        url: '/visual/alarmInfo/all/read',
        method: 'post',
      })
      message.success('全部标记为已读成功！');
      requestData()
    } catch (error) {
      console.log(error); 
    } finally{

    }
  } 
  // 未读数量请求请求
  const requestUnreadNum = async (obj:object = {}) => {
    try {
      const data = await http({
        url: '/visual/alarmInfo/unreadNum',
        method: 'post',
      })
      setUnreadNum(data)
    } catch (error) {
      console.log(error); 
    } finally{

    }
  } 
  return (
    <ConfigProvider locale={zhCN}>
      <div className='alarmLog-warp'>
        <div className='title'>告警管理</div>
        <div className='condition'>
          <div className='time-range'>
            <span>时间范围</span>
            <RangePicker
              value={hackValue || momentDates}
              onChange={handerChangeTiem}
              onOpenChange={handerOpenChange}
            />
          </div>
          <div className='state'>
            <span>状态</span>
            <Select value={stateRead} defaultValue="" style={{ width: 170 }} onChange={handleChangeState}>
              <Option value="">全部</Option>
              <Option value={0}>未读</Option>
              <Option value={1}>已读</Option>
            </Select>
          </div>
          <div>
           <Button onClick={handleReset} type="primary">重置</Button>
          </div>
        </div>
        <div className='search-read'>
          <div className='search'>
            <Search 
              placeholder="请输入异常对象或处置方案名称搜索" 
              allowClear 
              onSearch={handleSearch} 
              style={{ width: 300 }} 
            />
          </div>
          <div className='read' onClick={requesAllRead}>
            <Tooltip title="一键已读">
              <Badge count={unreadNum}>
                <FileDoneOutlined style={{fontSize: '30px',color: "#177ddc"}} />
              </Badge>
            </Tooltip>
          </div>
        </div>
        <div className='table-list'>
          123
        </div>
      </div>
    </ConfigProvider>
  )
}

export default AlarmLog;
