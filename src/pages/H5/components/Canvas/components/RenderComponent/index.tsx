import React, { useEffect, Fragment, useContext, useRef } from "react";
import { message } from "antd";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";
import { components } from "src/constants/components";

import CanvasSelectElement from '../CanvasSelectElement/index'

let isMove = false;
let targetElement = null;
let mouseDownX = 0;
let mouseDownY = 0;
let componentKey = undefined
function CanvasContent() {
  const global = useContext(GlobalContext);
  const { componentList } = global.globalData;
  const canvasWrapRef = useRef(null);

  // 订阅鼠标移动
  useEffect(() => {
    const unSubscribe = global.subscribe("mousemove", (e) => {
      mouseMove(e);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // 订阅鼠标抬起
  useEffect(() => {
    const unsubscribe = global.subscribe("mouseup", () => {
      mouseUp();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // 订阅鼠标按下
  useEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      mouseDown(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const mouseDown = (e) => {
    targetElement = e.target;
    componentKey = targetElement.dataset.componentKey;
    if (componentKey) {
      isMove = true;
      global.setSelectComponent(componentKey * 1);
      global.runListeners("setUpdate");
      // 计算点击元素的位置
      const { offsetLeft, offsetTop } = canvasWrapRef.current.parentNode;
      const { clientX, clientY } = e;
      mouseDownX = clientX - offsetLeft - targetElement.offsetLeft;
      mouseDownY = clientY - offsetTop - targetElement.offsetTop;
    }
  };

  const mouseMove = (e) => {
    if (isMove) {
      // 需要获取offsetLeft，需要找到第一个定位元素
      const { offsetLeft, offsetTop } = canvasWrapRef.current.parentNode;
      const { clientX, clientY } = e;
      const x = clientX - offsetLeft - mouseDownX;
      const y = clientY - offsetTop - mouseDownY;
      // 修改组件数据
      const component =global.getSelectComponent();
      component.style.left = x;
      component.style.top = y;
      global.modify(component);
      // 发布订阅，通知组件
      global.runListeners(componentKey)

    }
  };

  const mouseUp = () => {
    isMove = false;
  };

  const mouseOut = () => {
    isMove = false;
  };

  const renderComponent = (component) => {
    // 1 文本组件 2 图片组件
    const { type, key } = component;

    const FindComponent = components.find(
      (component) => component.type === type
    );
    if (!FindComponent) {
      message.error("没有找到要渲染的组件");
      return <Fragment></Fragment>;
    }
    return <FindComponent componentKey={key} key={key} />;
  };

  return (
    <div
      className="canvas-content-wrapper"
      onMouseDown={mouseDown}
      // onMouseOut={mouseOut}
      ref={canvasWrapRef}
    >
      {/* 选中元素框 */}
      <CanvasSelectElement />
      {/* {renderSelectElement()} */}
      {/* 组件 */}
      {componentList.map((component) => renderComponent(component))}
    </div>
  );
}

export default CanvasContent;
