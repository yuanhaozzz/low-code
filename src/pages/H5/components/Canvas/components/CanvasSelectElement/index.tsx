import React, { useEffect, useContext, Fragment, useState, useLayoutEffect } from 'react';

import './style.scss'
import { GlobalContext } from "src/global/globalCommon";
import {Component} from 'src/constants/type'

let isMove = false
let selectBoxType = ''
let componentKey = undefined
const client = {
    startX: 0,
    startY: 0,
    elOffsetLeft: 0,
    elWidth: 0
}
const CanvasSelectElement = () => {
    const global = useContext(GlobalContext);
    const [selectComponent, setSelectComponent] = useState<Component | undefined>(undefined)

    useLayoutEffect(() => {
        const unsubscribe = global.subscribe('mousedown', (e) => {
            const el = e.target
            const {componentKey: key, selectBox} = el.dataset
            const {clientX, clientY} = e
            let component = undefined
            // 选中组件
            if (key || selectBox) {
                // 获取点击样式
                isMove = true
                component = global.getSelectComponent()
            }
            if (key) {
                componentKey = key
                client.elOffsetLeft = el.offsetLeft
                client.elWidth = parseInt(el.style.width)
            }
            // 选中框
            if (selectBox) {
                client.startX = clientX
                client.startY = clientY
                selectBoxType = selectBox
                
            }
            // 控制选中框 显示隐藏
            setSelectComponent(component)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useLayoutEffect(() => {
        const unsubscribe = global.subscribe("mousemove", (e) => {
            if (isMove) {
                if (selectBoxType) {
                    handleSelectBoxType(e)
                }
                // 移动元素 赋值给选中框
                setSelectComponent(global.getSelectComponent())
            }
           
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useLayoutEffect(() => {
        const unsubscribe = global.subscribe('mouseup', () => {
            if (isMove) {
                setSelectComponent(global.getSelectComponent())
            }
            isMove = false
            selectBoxType = ''
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const handleSelectBoxType = (e) => {
        const {offsetLeft}:HTMLAnchorElement = document.querySelector('.h5-canvas-draw')
        const {clientX, clientY} = e
        const {startX, startY, elOffsetLeft, elWidth: elementWIdth} = client
        const moveX = startX - clientX
        const moveY = startY - clientY
        const currentComponent = global.getSelectComponent()
        const {style: {width: elWidth, height: elHeight, left, top}} = global.getSelectComponent()
        const width = parseInt(elWidth)
        const height = parseInt(elHeight)
        switch(selectBoxType) {
            case 'leftCenter':{
                const isLeft = clientX > elOffsetLeft + offsetLeft + elementWIdth
                if (isLeft) {
                    console.log(clientX > startX)
                    // 向左
                    if (clientX > startX === false) {
                        currentComponent.style.width = width - moveX + 'px'
                    } else {
                        currentComponent.style.width = width - moveX + 'px'
                    }
                } else {
                    currentComponent.style.left = left -  moveX
                    currentComponent.style.width = width + moveX + 'px'
                }
                   
             break
            }
            case 'rightCenter': {
                const isRight = clientX > elOffsetLeft + offsetLeft
                if (isRight) {
                    currentComponent.style.width = width - moveX + 'px'
                } else {
                    // 向左
                    if (clientX > startX === false) {
                        currentComponent.style.left = left - moveX
                        currentComponent.style.width = width + Math.abs(moveX) + 'px'
                    } else {
                        currentComponent.style.left = left -  moveX
                        currentComponent.style.width = width + moveX + 'px'
                    }
                   
                }
            }
            break
            case 'centerBottom':
                currentComponent.style.height = height - moveY + 'px'
            break
            case 'centerTop':
                currentComponent.style.top = top -  moveY
                currentComponent.style.height = height + moveY + 'px'
            break
        }
        global.modify(currentComponent)
        global.runListeners(componentKey)
        client.startX = clientX
        client.startY = clientY
    }

    if (!selectComponent) {
        return <Fragment></Fragment>
    }
    
    return <div className="canvas-select-element" style={{...selectComponent.style}} >
            {/* 旋转 */}
            <div className="icon-rotate canvas-select-rotate"></div>
            <div className="canvas-line-left line">
                {/* 左中 */}
                <div className="canvas-line-circle left-center" data-select-box={'leftCenter'}></div>
            </div>
            <div className="canvas-line-right line">
                 {/* 右中 */}
                <div className="canvas-line-circle right-center" data-select-box={'rightCenter'}></div>
            </div>
            <div className="canvas-line-bottom line">
                {/* 左下 */}
                 <div className="canvas-line-circle left-bottom" data-select-box={'leftBottom'}></div>
                {/* 中下 */}
                <div className="canvas-line-circle center-bottom" data-select-box={'centerBottom'}></div>
                {/* 右下 */}
                <div className="canvas-line-circle right-bottom" data-select-box={'rightBottom'}></div>
            </div>
            <div className="canvas-line-top line">
                {/* 左上 */}
                <div className="canvas-line-circle left-top" data-select-box={'leftTop'}></div>
                {/* 中上 */}
                <div className="canvas-line-circle center-top" data-select-box={'centerTop'}></div>
                {/* 右上 */}
                <div className="canvas-line-circle right-top" data-select-box={'rightTop'}></div>
            </div>
        </div>
}

export default CanvasSelectElement