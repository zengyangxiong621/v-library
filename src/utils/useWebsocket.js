import { useState, useRef, useEffect } from 'react'
import { localStore } from "@/services/LocalStoreService"

const useWebsocket = ({ url, moduleId, type, dashboardId, verify }) => {
    const ws = useRef(null);
    const [receiveData, setReceiveData] = useState('')
    const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' })

    const creatWebSocket = () => {
        const stateArr = [
            { key: 0, value: '正在链接中' },
            { key: 1, value: '已经链接并且可以通讯' },
            { key: 2, value: '连接正在关闭' },
            { key: 3, value: '连接已关闭或者没有链接成功' }
        ]
        try {
            const token = localStore.getToken();
            ws.current = new WebSocket("ws://10.201.83.166:31088"+url+"?webSocket-token=" + token)

            ws.current.onopen = () => {
                setReadyState(stateArr[ws.current?.readyState ?? 0])          
            }
            ws.current.onclose = (e) => {
                setReadyState(stateArr[ws.current?.readyState ?? 0])
                console.log("Connection closed.");
            }
            ws.current.onerror = (e) => setReadyState(stateArr[ws.current?.readyState ?? 0])
            ws.current.onmessage = (e) => {
                console.log("Received Message");
                setReceiveData(e.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const webSocketInit = () => {
        if (!ws.current || ws.current.readyState === 3) {
            creatWebSocket();
        }
    }

    const sendMessage = (sendData) => {
        ws.current?.send(JSON.stringify(sendData))
    }

    const closeWebSocket = () => {
        ws.current?.close()
    }
    
    const reconnect = () => {
        try {
            closeWebSocket();
            ws.current = null;
            creatWebSocket();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // verify 此参数控制是否有权限，请求该方法
        // verify && webSocketInit();
        webSocketInit();
        return () => {
            ws.current?.close();
        }
    },[ws]) // verify

    return {
        receiveData,
        readyState,
        sendMessage,
        closeWebSocket,
        reconnect
    }
}

export default useWebsocket