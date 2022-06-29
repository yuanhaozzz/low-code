/* eslint-disable no-debugger */
import React, { useState, useContext } from "react";

import {deepCopy} from 'src/utils/common'
import "./style.scss";

import FontSize from "./components/FontSize/index";
import { GlobalContext } from "src/global/globalCommon";

function Style() {
  const global = useContext(GlobalContext);
  const currentComponent = global.getSelectComponent()
  console.log(currentComponent)
  const update = (styleKey, styleValue) => {
    // 更新样式
    const component = deepCopy(currentComponent)
    component.style[styleKey] = styleValue;
    global.modify(component);
    global.runListeners('setUpdate');
    // 已订阅的组件 更新操作
    global.runListeners(component.key + '');
  };

  return (
    <div className="element-setting-style-wrapper">
      {/* 字体 */}
      {/* 字号 */}
      <div className="style-top-container">
        <FontSize update={update} style={currentComponent.style}/>
      </div>
    </div>
  );
}

export default Style;
