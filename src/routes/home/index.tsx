import { useEffect } from 'react'
// react-beautiful-dnd
// ant
import './index.less';
import { Layout } from 'antd'


import CustomHeader from './components/header/index'
import Left from './left';
import Center from './center';
import Right from './right';
import CenterHeaderBar from '../home/center/components/topBar/index'

const { Header } = Layout


function App() {
  const detectZoom = () => {
    let ratio = 0,
      screen: any = window.screen,
      ua = navigator.userAgent.toLowerCase()

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio
    } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI
      }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth
    }

    if (ratio) {
      ratio = Math.round(ratio * 100)
    }
    return ratio
  }

  const isScale = () => {
    let rate = detectZoom()
    console.log('rate', rate)
    if (rate != 100) {
      //如何让页面的缩放比例自动为100,'transform':'scale(1,1)'没有用，又无法自动条用键盘事件，目前只能提示让用户如果想使用100%的比例手动去触发按ctrl+0
      // alert('当前页面不是100%显示，请按键盘ctrl+0恢复100%显示标准，以防页面显示错乱！')
    }
  }
  const keyCodeMap: any = {
    // 91: true, // command
    61: true,
    107: true, // 数字键盘 +
    109: true, // 数字键盘 -
    173: true, // 火狐 - 号
    187: true, // +
    189: true, // -
  };
  useEffect(() => {

    // 覆盖ctrl||command + ‘+’/‘-’
    document.onkeydown = function (event) {
      const e = event || window.event;
      const ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCodeMap[e.keyCode]) {
        e.preventDefault();
      } else if (e.detail) { // Firefox
        event.returnValue = false;
      }
    };
    // 覆盖鼠标滑动
    document.body.addEventListener('wheel', (e) => {
      if (e.ctrlKey) {
        console.log('1次')
        if (e.deltaY < 0) {
          e.preventDefault();
          return false;
        }
        if (e.deltaY > 0) {
          e.preventDefault();
          return false;
        }
      }
    }, { passive: false });

    // document.addEventListener('wheel', (ev) => {
    //   console.log('wheel', ev)
    //   console.log('ctrlKey', ev.ctrlKey)
    //   ev.stopPropagation()
    //
    //   ev.preventDefault()
    // })
    // document.addEventListener('mousewheel', (ev) => {
    //   ev.stopPropagation()
    //   ev.preventDefault()
    // })
    // window.addEventListener('resize', (ev) => {
    //   isScale()
    //   console.log('resize', ev)
    // })
    // document.addEventListener('keydown', (ev) => {
    //   ev.stopPropagation()
    //   ev.preventDefault()
    // })
    return () => {
    }
  }, [])

  return (
    <Layout>
      <Header className='home-header'>
        <CustomHeader />
      </Header>
      <div className="p-home">
        <Left />
        <div className='center-wrap'>
          <CenterHeaderBar />
          <Center />
        </div>
        <Right />
      </div>
    </Layout>
  );
  // const handleWheel = (ev: any) => {
  //   // console.log('ev', ev)
  // }
}



  export default App
