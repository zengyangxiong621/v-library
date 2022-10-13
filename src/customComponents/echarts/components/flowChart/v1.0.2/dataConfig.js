export const nodes = [{
    x: 0,
    y: 100,
    nodeName: 'Log',
    type: 'send',
    startColor: '#96C6FE',
    endColor: '#588CDB',
  },
  {
    x: 0,
    y: 300,
    nodeName: '全包',
    type: 'send',
    startColor: '#96C6FE',
    endColor: '#588CDB',
  },
  {
    x: 0,
    y: 500,
    nodeName: 'Netflow',
    type: 'send',
    startColor: '#96C6FE',
    endColor: '#588CDB',
  },
  {
    x: 500,
    y: 300,
    nodeName: 'Flume',
    type: 'access',
    startColor: '#ADE8FF',
    endColor: '#67D4FF',
  },
  {
    x: 700,
    y: 300,
    nodeName: 'Kafka',
    type: 'access',
    startColor: '#ADE8FF',
    endColor: '#67D4FF',
  },
  {
    x: 900,
    y: 300,
    nodeName: 'Spark',
    type: 'access',
    startColor: '#ADE8FF',
    endColor: '#67D4FF',
  },
  {
    x: 1150,
    y: 300,
    nodeName: 'Kafka',
    type: 'forward',
    startColor: '#b4efd7',
    endColor: '#61DDAB',
  },
  {
    x: 1350,
    y: 300,
    nodeName: 'Spark',
    type: 'forward',
    startColor: '#b4efd7',
    endColor: '#61DDAB',
  },
  {
    x: 1800,
    y: 100,
    nodeName: 'ES',
    type: 'process',
    startColor: '#FFE8AB',
    endColor: '#F8C12F',
  },
  {
    x: 1800,
    y: 300,
    nodeName: 'Kafka',
    type: 'process',
    startColor: '#FFE8AB',
    endColor: '#F8C12F',
  },
  {
    x: 1800,
    y: 500,
    nodeName: 'HDFS',
    type: 'process',
    startColor: '#FFE8AB',
    endColor: '#F8C12F',
  },
];
export const labelNodes = [{
    x: 180,
    y: 150,
    name: 'Log',
    bgColor: '#ebf3fc',
    type: 'send',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 180,
    y: 350,
    name: '全包',
    bgColor: '#ebf3fc',
    type: 'send',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 180,
    y: 550,
    name: 'Netflow',
    bgColor: '#ebf3fc',
    type: 'send',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 700,
    y: 430,
    name: 'Kafka',
    bgColor: '#e4f6fe',
    type: 'access',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1260,
    y: 430,
    name: 'Kafka',
    bgColor: '#dff8ee',
    type: 'forward',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 150,
    name: 'ES',
    bgColor: '#fef3d6',
    type: 'process',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 350,
    name: 'Kafka',
    bgColor: '#fef3d6',
    type: 'process',
    customData: {
      count: 0,
      rate: 0,
    },
  },
  {
    x: 1620,
    y: 550,
    name: 'HDFS',
    bgColor: '#fef3d6',
    type: 'process',
    customData: {
      count: 0,
      rate: 0,
    },
  },
];
export const linesData = [{
    coords: [
      [0, 300],
      [500, 300],
    ],
    lineColor: '#316bc4',
    type: 'send',
  },
  {
    coords: [
      [0, 100],
      [300, 100],
      [300, 300],
      [500, 300],
    ],
    lineColor: '#316bc4',
    type: 'send',
  },
  {
    coords: [
      [0, 500],
      [300, 500],
      [300, 300],
      [500, 300],
    ],
    lineColor: '#316bc4',
    type: 'send',
  },
  {
    coords: [
      [500, 300],
      [700, 300],
    ],
    lineColor: '#92defa',
    type: 'access',
  },
  {
    coords: [
      [700, 300],
      [900, 300],
    ],
    lineColor: '#92defa',

  },
  {
    coords: [
      [900, 300],
      [1200, 300],
    ],
    lineColor: '#88dcb3',
    type: 'forward',
  },
  {
    coords: [
      [1200, 300],
      [1300, 300],
    ],
    lineColor: '#88dcb3',
  },
  {
    coords: [
      [1300, 300],
      [1800, 300],
    ],
    lineColor: '#f9c541',
    type: 'process',
  },
  {
    coords: [
      [1300, 300],
      [1500, 300],
      [1500, 100],
      [1800, 100],
    ],
    lineColor: '#f9c541',
    type: 'process',
  },
  {
    coords: [
      [1300, 300],
      [1500, 300],
      [1500, 500],
      [1800, 500],
    ],
    lineColor: '#f9c541',
    type: 'process',
  },

];

export const dashedLinesData = [{
    coords: [
      [400, 100],
      [1000, 100],
      [1000, 500],
      [400, 500],
      [400, 100],
    ],
    lineType: 'dashed',
    lineColor: '#7cd7f8',
  },
  {
    coords: [
      [1050, 100],
      [1450, 100],
      [1450, 500],
      [1050, 500],
      [1050, 100],
    ],
    lineType: 'dashed',
    lineColor: '#7cd7f8',
  },
];

export default {
  nodes,
  labelNodes,
  linesData,
  dashedLinesData,
};