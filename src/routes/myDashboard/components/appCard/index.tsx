import { memo, useState, useRef } from 'react'
import './index.less'

import { IconFont } from '../../../../utils/useIcon'
import { Input } from 'antd'

const AppCard = (props: any) => {
  const { id, name, release } = props


  const [canEdit, setCanEdit] = useState(false)
  const [appName, setAppName] = useState(name)

  const inputRef = useRef<any>()

  /** 输入框事件 */
  const bianjiClick = () => {
    setCanEdit(true)
    Promise.resolve().then(() => {
      inputRef.current.focus({
        cursor: 'all'
      })
      console.log('编辑的哪个？', inputRef.current);
    })
  }
  const nameInputChange = (e: any) => {
    setAppName(e.target.value)
  }
  const nameInputEnter = (e: any) => {
    setCanEdit(false)
  }
  const nameBlur = (e: any) => {
    e.stopPropagation()
    setCanEdit(false)
  }

  /** Card 中图标 和 编辑、预览按钮 事件 */
  const scanDashboard = () => {
    // TODO 通过id跳转到预览界面
    console.log('预览应用，仪表盘Id为', id);
  }
  const editDashboard = () => {
    //TODO 通过id跳转到主画布
    console.log('编辑应用，仪表盘Id为', id);
  }
  const tuozhuai = (e: any) => { }
  const fuzhi = (e: any) => { }
  const fenxiang = (e: any) => { }
  const gengduo = (e: any) => { }

  return (
    <div className='AppCard-wrap'>
      <header className='head'
      >
        <div className='hoverOnImg'>
          <div className='icons-wrap'>
            <IconFont className='each-icon' onClickCapture={(e) => {
              tuozhuai(e)
            }} type='icon-tuozhuai' />
            <IconFont className='each-icon' onClickCapture={(e) => {
              fuzhi(e)
            }} type='icon-fuzhi' />
            <IconFont className='each-icon' onClickCapture={(e) => {
              fenxiang(e)
            }} type='icon-fenxiang' />
            <IconFont className='each-icon' onClickCapture={(e) => {
              gengduo(e)
            }} type='icon-gengduo' />
          </div>
          <div className='btns-wrap'>
            <span className='div-to-btns scan-btn' onClickCapture={() => scanDashboard()}>预览</span>
            <span className='div-to-btns edit-btn' onClickCapture={() => editDashboard()}>编辑</span>
          </div>
        </div>
        <div className="img-wrap">
          <image />
        </div>

      </header>
      <div className="foot">
        <div className="front">
          {
            canEdit ?
              <Input
                style={{ width: '230px' }}
                ref={inputRef}
                maxLength={30}
                value={appName}
                onChange={nameInputChange}
                onPressEnter={nameInputEnter}
                onBlur={nameBlur}
              />
              : <div>
                <IconFont className='bianjiIcon'
                  type="icon-bianji"
                  onClickCapture={() => bianjiClick()}
                />
                <span>{name}</span>
              </div>
          }
        </div>
        <div className="releaseState">
          <div className='customCircle' style={{
            backgroundColor: release ? '#00FF3D' : '#535353',
          }}></div>
          <span className='text'>{release ? '已' : '未'}发布</span>
        </div>

      </div>
    </div>
  )
}

export default memo(AppCard)