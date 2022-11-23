import React, { useEffect, useLayoutEffect } from "react";

import "./style.scss";
import {
  useForceUpdate,
  useGlobalData,
  GlobalContext,
} from "src/global/globalCommon";
import { jsonPage } from "src/constants/json";

import Header from "./components/Header/index";
import Canvas from "./components/Canvas/index";
import ElementSetting from "./components/ElementSetting/index";
import PageConfig from "./components/PageConfig/index";

function H5() {
  const forceUpdate = useForceUpdate();
  const globalData = useGlobalData();

  useEffect(() => {
    // 添加第一页
    globalData.addPage(jsonPage);
    globalData.runListeners("pageConfig");
  }, []);

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
        {/* 页面设置 */}
        {/* <PageConfig /> */}
      </GlobalContext.Provider>
    </div>
  );
}

export default H5;
