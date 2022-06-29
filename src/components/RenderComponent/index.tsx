import React, { useEffect, Fragment, useContext, useRef } from "react";
// import { message } from "antd";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

import { components } from "src/constants/components";

let isMove = false;
let targetElement = null;
let mouseDownX = 0;
let mouseDownY = 0;
function CanvasContent(props) {
  const global = useContext(GlobalContext);
  const { componentList } = global.globalData;
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    const unSubscribe = global.subscribe("mousemove", (e) => {
      mouseMove(e);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = global.subscribe("mouseup", () => {
      mouseUp();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const mouseDown = (e) => {
    targetElement = e.target;
    const { key } = targetElement.dataset;
    if (key) {
      // eslint-disable-next-line no-debugger
      // debugger
      console.log(key)
      isMove = true;
      global.setSelectComponent(key * 1);
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
      // 移动画布元素
      targetElement.style.left = x + "px";
      targetElement.style.top = y + "px";
      // 修改组件数据
      const component =global.getSelectComponent();
      component.style.left = x;
      component.style.top = y;
      global.modify(component);
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
      // message.error("没有找到要渲染的组件");
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
      {componentList.map((component) => renderComponent(component))}
    </div>
  );
}

export default CanvasContent;
