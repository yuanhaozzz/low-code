import React, { useLayoutEffect } from "react";

import "./style.scss";
import {
  useForceUpdate,
  useGlobalData,
  GlobalContext,
} from "src/global/globalCommon";

import Header from "./components/Header/index";
import Canvas from "./components/Canvas/index";
import ElementSetting from "./components/ElementSetting/index";

function H5() {
  const forceUpdate = useForceUpdate();
  const globalData = useGlobalData();

  useLayoutEffect(() => {
    // 订阅根组件刷新
    const unSubscribe = globalData.subscribe("rootUpdate", () => {
      forceUpdate();
    });
    return () => {
      unSubscribe("rootUpdate");
    };
  }, []);

  const mouseMove = (e: React.MouseEvent) => {
    globalData.runListeners("mousemove", e);
  };

  const mouseDown = (e: React.MouseEvent) => {
    globalData.runListeners("mousedown", e);
  };

  const mouseUp = (e: React.MouseEvent) => {
    globalData.runListeners("mouseup", e);
  };

  return (
    <div
      className="h5-wrapper"
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
    >
      <GlobalContext.Provider value={globalData}>
        {/* 顶部导航 */}
        <Header />
        {/* 画布 */}
        <Canvas />
        {/* 元素属性 */}
        <ElementSetting />
      </GlobalContext.Provider>
    </div>
  );
}

export default H5;
