import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';

import { Spin } from 'antd'
const Loading = () => {
  return (
    <Spin/>
  )
}
const useLoading = (value: boolean, dom?: any) => {
  const [ loading, setLoading ] = useState(value)
  const loadingRef = useRef(null)
  const [copyDom, setCopyDom] = useState(dom)
  useEffect(() => {
    // if(loading) {
    //   // dom.appendChild(Loading);
    // }
  }, [])
  useEffect(() => {
    if (loading) {
      ReactDOM.render(<Loading/>, dom)
    } else {
      dom = copyDom
    }
  }, [loading])
  useEffect(() => {
    if (loading){
      if (dom) {
        setCopyDom(dom)
        ReactDOM.render(<Loading/>, dom)
      }
    }
  }, [dom])
  return [ loading, setLoading ]
}
export default useLoading
