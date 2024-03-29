import React, {
  useContext,
  Fragment,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";
import { Component } from "src/constants/type";
import { rotateLineNumber } from "src/constants";
import { findElementId } from "src/utils/common";

let isMove = false;
let selectBoxType = "";
let componentKey = undefined;
let rotateStep = 0;
let selectElement: any = {};
const client = {
  startX: 0,
  startY: 0,
  startClientX: 0,
  startClientY: 0,
};
const CanvasSelectElement = () => {
  const global = useContext(GlobalContext);
  const [selectComponent, setSelectComponent] = useState<Component | undefined>(
    undefined
  );

  const rotateRef = useRef(null);

  useEffect(() => {
    const unsubscribe = global.subscribe("canvasSelectElement", (e) => {
      const select = global.getSelectComponent();
      componentKey = select?.key;
      selectElement = {};
      setSelectComponent(select);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      const el = e.target;
      const { componentKey: key, selectBox } = el.dataset;
      const { clientX, clientY } = e;
      let component = undefined;
      // 选中组件
      if (key || selectBox) {
        // 获取点击样式
        isMove = true;
        component = global.getSelectComponent();
        rotateStep = 0;
      }
      if (key) {
        componentKey = key;
        selectElement = el;
      }
      // 选中框
      if (selectBox) {
        client.startX = clientX;
        client.startY = clientY;
        client.startClientX = clientX;
        client.startClientY = clientY;
        selectBoxType = selectBox;
        if (selectBox === "rotate") {
          rotateRef.current.classList.add("rotate-line-show");
        }
      }
      if (findElementId(el, "show-setting")) {
        component = global.getSelectComponent();
      }
      // 控制选中框 显示隐藏
      setSelectComponent(component);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = global.subscribe("mousemove", (e) => {
      if (isMove) {
        // 选中框操作
        if (selectBoxType) {
          handleSelectBoxType(e);
        }
        // 移动元素 赋值给选中框
        setSelectComponent(global.getSelectComponent());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = global.subscribe("mouseup", () => {
      if (isMove) {
        setSelectComponent(global.getSelectComponent());
      }
      isMove = false;
      if (selectBoxType === "rotate") {
        rotateRef.current.classList.remove("rotate-line-show");
      }
      selectBoxType = "";
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSelectBoxType = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { startX, startY } = client;
    const moveX = startX - clientX;
    const moveY = startY - clientY;
    const currentComponent = global.getSelectComponent();
    const {
      style: { width: elWidth, height: elHeight, left, top, transform },
    } = global.getSelectComponent();
    const width = parseInt(elWidth);
    const height = parseInt(elHeight);
    switch (selectBoxType) {
      case "leftCenter": {
        if (width <= 0 && clientX < startX === false) {
          return;
        }
        currentComponent.style.left = left - moveX;
        currentComponent.style.width = width + moveX + "px";
        break;
      }
      case "rightCenter": {
        currentComponent.style.width = width - moveX + "px";
        break;
      }
      case "centerBottom": {
        currentComponent.style.height = height - moveY + "px";
        break;
      }
      case "centerTop": {
        if (height <= 0 && clientY < startY === false) {
          return;
        }
        currentComponent.style.top = top - moveY;
        currentComponent.style.height = height + moveY + "px";
        break;
      }
      case "leftTop": {
        if (width <= 0 && clientX < startX === false) {
          return;
        }
        if (height <= 0 && clientY < startY === false) {
          return;
        }
        currentComponent.style.left = left - moveX;
        currentComponent.style.width = width + moveX + "px";
        currentComponent.style.top = top - moveY;
        currentComponent.style.height = height + moveY + "px";
        break;
      }
      case "leftBottom": {
        if (width <= 0 && clientX < startX === false) {
          return;
        }
        currentComponent.style.left = left - moveX;
        currentComponent.style.width = width + moveX + "px";
        currentComponent.style.height = height - moveY + "px";
        break;
      }
      case "rightTop": {
        if (height <= 0 && clientY < startY === false) {
          return;
        }
        currentComponent.style.top = top - moveY;
        currentComponent.style.height = height + moveY + "px";
        currentComponent.style.width = width - moveX + "px";
        break;
      }
      case "rightBottom": {
        currentComponent.style.height = height - moveY + "px";
        currentComponent.style.width = width - moveX + "px";
        break;
      }
      case "rotate": {
        let rotate = 0;
        let isWithinRange = false;
        let rangeNumber = 0;
        if (!transform || transform.includes("rotate")) {
          const reg = /\((.*?)\)/g;
          if (rotateStep === 0) {
            rotate =
              parseInt(transform.match(reg)[0].replace(/\(|\)/g, "")) % 360;
            rotateStep = rotate;
          } else {
            rotate = rotateStep;
          }
        }
        // 左
        if (clientX < startX === false) {
          rotate += 2;
          rotateStep += 2;
        }
        // 右
        if (clientX > startX === false) {
          rotate -= 2;
          rotateStep -= 2;
        }
        // 吸住效果
        for (let i = 0; i < rotateLineNumber.length; i++) {
          const num = rotateLineNumber[i];
          if (num - 10 < Math.abs(rotate) && num + 10 > Math.abs(rotate)) {
            // 在范围内
            isWithinRange = true;
            rangeNumber = rotate > 0 ? num : -num;
            break;
          }
        }
        if (isWithinRange) {
          rotate = rangeNumber;
        } else {
          rotate = rotateStep;
          rotateStep %= 360;
        }
        currentComponent.style.transform = `rotate(${rotate}deg)`;
        break;
      }
    }
    global.modify(currentComponent);
    global.runListeners(componentKey);
    global.runListeners("settingPosition");
    client.startX = clientX;
    client.startY = clientY;
  };

  /**
   * @description 渲染参考线
   */
  const renderRotateLine = () => {
    const {
      width: elWidth,
      height: elHeight,
      left: elLeft,
      top: elTop,
    } = selectComponent.style;
    const width = parseInt(elWidth);
    const height = parseInt(elHeight);
    const left = parseInt(elLeft);
    const top = parseInt(elTop);
    const rotateLineLeft = width / 2 + left;
    const rotateLineRight = height / 2 + top;
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <ul
            className="rotate-line"
            ref={rotateRef}
            style={{ left: rotateLineLeft + "px", top: rotateLineRight + "px" }}
          >
            {[...new Array(4)].map((item, index) => (
              <li
                className={`rotate-line-item rotate-${index + 1}`}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>,
          document.querySelector(".h5-canvas-draw")
        )}
      </Fragment>
    );
  };

  if (!selectComponent) {
    return <Fragment></Fragment>;
  }
  const {
    left,
    top,
    transform,
    width: elWidth,
    height: elHeight,
  } = selectComponent.style;
  let width = parseInt(elWidth);
  let height = parseInt(elHeight);
  if (Object.keys(selectElement).length > 0) {
    width = parseInt(window.getComputedStyle(selectElement)?.width);
    height = parseInt(window.getComputedStyle(selectElement)?.height);
  }
  const selectElementStyle = {
    left: left + width / 2,
    top: top + height / 2,
    transform,
  };

  return (
    <section className="canvas-select-element" style={selectElementStyle}>
      {/* 旋转 */}
      <div
        className="icon-rotate canvas-select-rotate"
        data-select-box={"rotate"}
        style={{
          left: `0px`,
          top: `-${height <= 60 ? 60 : height}px`,
        }}
      ></div>
      {/* 旋转参考线 */}
      {renderRotateLine()}
      {/* 上 */}
      <div
        className="border"
        style={{
          width: `${width}px`,
          left: `-${width / 2}px`,
          top: `-${height / 2}px`,
        }}
      ></div>
      {/* 下 */}
      <div
        className="border"
        style={{
          width: `${width}px`,
          left: `-${width / 2}px`,
          top: `${height / 2}px`,
        }}
      ></div>
      {/* 左 */}
      <div
        className="border"
        style={{
          height: `${height}px`,
          left: `-${width / 2}px`,
          top: `-${height / 2}px`,
        }}
      ></div>
      {/* 右 */}
      <div
        className="border"
        style={{
          height: `${height}px`,
          left: `${width / 2}px`,
          top: `-${height / 2}px`,
        }}
      ></div>
      <div className="canvas-line-left line">
        {/* 左中 */}
        <div
          className="canvas-line-circle left-center"
          data-select-box={"leftCenter"}
          style={{
            left: `-${width / 2 + 5}px`,
            top: `0px`,
          }}
        ></div>
      </div>
      <div className="canvas-line-right line">
        {/* 右中 */}
        <div
          className="canvas-line-circle right-center"
          data-select-box={"rightCenter"}
          style={{
            left: `${width / 2}px`,
            top: `0px`,
          }}
        ></div>
      </div>
      <div className="canvas-line-bottom line">
        {/* 左下 */}
        <div
          className="canvas-line-circle left-bottom"
          data-select-box={"leftBottom"}
          style={{
            left: `-${width / 2 + 5}px`,
            top: `${height / 2 - 5}px`,
          }}
        ></div>
        {/* 中下 */}
        <div
          className="canvas-line-circle center-bottom"
          data-select-box={"centerBottom"}
          style={{
            left: `0px`,
            top: `${height / 2 - 5}px`,
          }}
        ></div>
        {/* 右下 */}
        <div
          className="canvas-line-circle right-bottom"
          data-select-box={"rightBottom"}
          style={{
            left: `${width / 2 - 5}px`,
            top: `${height / 2 - 5}px`,
          }}
        ></div>
      </div>
      <div className="canvas-line-top line">
        {/* 左上 */}
        <div
          className="canvas-line-circle left-top"
          data-select-box={"leftTop"}
          style={{
            left: `-${width / 2 + 5}px`,
            top: `-${height / 2 + 5}px`,
          }}
        ></div>
        {/* 中上 */}
        <div
          className="canvas-line-circle center-top"
          data-select-box={"centerTop"}
          style={{
            left: `0px`,
            top: `-${height / 2 + 5}px`,
          }}
        ></div>
        {/* 右上 */}
        <div
          className="canvas-line-circle right-top"
          data-select-box={"rightTop"}
          style={{
            left: `${width / 2 - 5}px`,
            top: `-${height / 2 + 5}px`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default CanvasSelectElement;
