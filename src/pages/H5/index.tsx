import React, { Component, useEffect, useLayoutEffect } from "react";

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

  useEffect(() => {
    initEvent();
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


  const initEvent = () => {
    // 全局鼠标事件触发后、发布订阅
    document.body.addEventListener("mousemove", (e) => {
      globalData.runListeners("mousemove", e);
    });

    document.body.addEventListener("mouseup", (e) => {
      globalData.runListeners("mouseup", e);
    });
  };

  return (
    <div className="h5-wrapper">
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
