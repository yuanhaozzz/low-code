import React, { useEffect, Fragment, useContext, useRef } from "react";
import { message } from "antd";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";
import { components } from "src/constants/components";
import {
  createReferenceLineElement,
  removeReferenceLineElement,
  sleep,
} from "src/utils/common";

let targetElement = null;
let mouseDownX = 0;
let mouseDownY = 0;
let componentKey = undefined;
let referencePoint = [];
// let isLeftLine: HTMLDivElement | null = null;
function CanvasContent() {
  const global = useContext(GlobalContext);
  const { pages, currentPageIndex } = global;
  const { componentList } = global.globalData;

  // 订阅鼠标按下
  useEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      mouseDown(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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

  const mouseDown = (e) => {
    targetElement = e.target;
    componentKey = targetElement.dataset.componentKey;
    const contenteditable = targetElement.getAttribute("contenteditable");
    if (componentKey) {
      const component = global.find(componentKey * 1);
      // 如果点击时为可输入则不可移动
      if (!contenteditable) {
        component.isMoving = true;
      }
      global.modify(component);
      global.runListeners("setUpdate");
      global.runListeners("canvasSelectElement");
      // 计算点击元素的位置
      const { offsetLeft, offsetTop } = global.getCanvasInfo();
      const { clientX, clientY } = e;
      mouseDownX = clientX - offsetLeft - targetElement.offsetLeft;
      mouseDownY = clientY - offsetTop - targetElement.offsetTop;
    }
  };

  const mouseMove = (e) => {
    const component = global.getSelectComponent();
    // 组件标记为可移动时，才能移动
    if (component && component.isMoving) {
      // 获取容器offset
      const { offsetLeft, offsetTop } = global.getCanvasInfo();
      const { clientX, clientY } = e;
      const x = clientX - offsetLeft - mouseDownX;
      const y = clientY - offsetTop - mouseDownY;

      component.alternateLeft = x;
      component.alternateTop = y;
      component.style.left = x;
      component.style.top = y;
      handleElementMove(component);
    }
  };
  /**
   * @description 处理元素移动 + 参考线
   * @params {*} component 当前组件
   */
  const handleElementMove = (component) => {
    const { top, left, width: elWidth, height: elHeight } = component.style;
    const width = parseInt(elWidth);
    const height = parseInt(elHeight);
    // 获取canvas 宽高
    const { width: canvasWidth, height: canvasHeight } = global.getCanvasInfo();
    // 画布内 元素、边界 点的位置
    referencePoint = [
      // 边界 0 0
      { h: 0, v: 0 },
      // 画布宽高
      { h: canvasWidth, v: canvasHeight },
      // 画布中心点
      { h: canvasWidth / 2, v: canvasHeight / 2 },
    ];
    global.getComponentList().forEach((component) => {
      const { left, top, width, height } = component.style;
      if (componentKey * 1 !== component.key) {
        referencePoint.push(
          ...[
            {
              h: left,
              v: top,
            },
            {
              h: left + parseInt(width),
              v: top + parseInt(height),
            },
          ]
        );
      }
    });
    // 记录 是否在点的范围内
    const scope = [];
    const scopeNum = 5;
    referencePoint.forEach((point) => {
      // h 水平 v 垂直
      const { h, v } = point;
      // 左
      if (h - scopeNum < left && h + scopeNum > left) {
        scope[0] = h;
      }
      // 右
      if (h - scopeNum < left + width && h + scopeNum > left + width) {
        scope[1] = h;
      }
      // 上
      if (v - scopeNum < top && v + scopeNum > top) {
        scope[2] = v;
      }
      // 下
      if (v - scopeNum < top + height && v + scopeNum > top + height) {
        scope[3] = v;
      }
      // 中
      if (v - scopeNum < top + height / 2 && v + scopeNum > top + height / 2) {
        scope[4] = v;
      }
      if (h - scopeNum < left + width / 2 && h + scopeNum > left + width / 2) {
        scope[5] = h;
      }
    });
    if (scope.length > 0) {
      for (let i = 0; i < scope.length; i++) {
        const num = scope[i];
        const index = i;
        // 创建参考线
        createReferenceLineElement(index, num, component.style);
        if (num !== undefined) {
          // 吸住效果
          switch (index) {
            case 0: {
              component.style.left = num;
              break;
            }
            case 1: {
              component.style.left = num - width;
              break;
            }
            case 2: {
              component.style.top = num;
              break;
            }
            case 3: {
              component.style.top = num - height;
              break;
            }
            case 4: {
              component.style.top = num - height / 2;
              break;
            }
            case 5: {
              component.style.left = num - width / 2;
              break;
            }
          }
        }
      }
    } else {
      // 删除参考线
      removeReferenceLineElement();
      component.style.left = component.alternateLeft;
      component.style.top = component.alternateTop;
    }
    // 修改组件属性
    global.modify(component);

    // 发布订阅，通知组件
    global.runListeners(componentKey);
    global.runListeners("settingPosition");
  };

  const mouseUp = () => {
    const component = global.getSelectComponent();
    console.log(component, "---------------------");
    if (component && component.isMoving) {
      // 设置组件 标记为不能移动
      component.isMoving = false;
      // 删除参考线
      removeReferenceLine();
      global.modify(component);
    }
  };

  const removeReferenceLine = () => {
    const lineAll = document.querySelectorAll(".reference-line");
    lineAll.forEach((line) => line.remove());
  };

  const renderComponent = (component, index) => {
    // 1 文本组件 2 图片组件
    const { type, key } = component;

    const FindComponent = components.find(
      (component) => component.type === type
    );
    if (!FindComponent) {
      message.error("没有找到要渲染的组件");
      return <Fragment></Fragment>;
    }
    return <FindComponent componentKey={key} key={key} index={index} />;
  };

  if (!pages[currentPageIndex]) {
    return <Fragment></Fragment>;
  }

  return (
    <ul className="canvas-content-wrapper" onMouseDown={mouseDown}>
      {/* 页面 */}
      {pages.map((item, pageIndex) => (
        <li key={item.page}>
          {/* 当前页面 组件列表 */}
          {pageIndex === currentPageIndex &&
            item.componentList.map((component, index) =>
              renderComponent(component, index)
            )}
        </li>
      ))}
    </ul>
  );
}

export default CanvasContent;
