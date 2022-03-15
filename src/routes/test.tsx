import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { connect } from 'dva';
import { connect } from '../utils/connect';
// import EC from '../components/charts/echarts/EC';
// import Echarts from '../components/charts/echarts/index';
// import * as echarts from 'echarts';

import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, SVGRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

interface Props {}

interface State {}

const mapStateToProps = (state: any) => {
  return state
}

// @connect(mapStateToProps)
class Test extends Component<Props, State> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(){    
    // this.init()  
    this.lazyInit()                                          
  }  

  lazyInit = () => {
    var chartDom = document.getElementById('echartsExample')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    option && myChart.setOption(option);
  }
  
  init = () => {
    const ele: any = document.getElementById('echartsExample')                                                                              
    const mychart = echarts.init(ele)                    
    const option = {                                                                                               
      title: {                                                                                                         
        text: '某站点用户访问来源',                                                                     
        subtext: '纯属虚构',                                                                                 
        left: 'center'                                                                                             
    },                                                                                                                 
    tooltip: {                                                                                                       
        trigger: 'item'                                                                                           
    },                                                                                                                 
    legend: {                                                                                                     
        orient: 'vertical',                                                                                      
        left: 'left',                                                                                                 
    },                                                                                                                 
    series: [                                                                                                      
        {                                                                                                             
            name: '访问来源',                                                                               
            type: 'pie',                                                                                           
            radius: '50%',                                                                                     
            data: [                                                                                                
                {value: 1048, name: '搜索引擎'},                                                   
                {value: 735, name: '直接访问'},                                                     
                {value: 580, name: '邮件营销'},                                                     
                {value: 484, name: '联盟广告'},                                                     
                {value: 300, name: '视频广告'}                                                      
            ],                                                                                                        
            emphasis: {                                                                                       
                itemStyle: {                                                                                    
                    shadowBlur: 10,                                                                        
                    shadowOffsetX: 0,                                                                    
                    shadowColor: 'rgba(0, 0, 0, 0.5)'                                              
                }                                                                                                    
            }                                                                                                        
        }                                                                                                            
    ]                                                                                                                
      }                                                                                                              
    option && mychart.setOption(option)    
  }

  render() {
    return (
      <div className="">
        <div id="echartsExample" className="echarts-example" style={{width:'800px',height:'400px'}}></div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Test); 