/* eslint-disable no-debugger */
import React, { useContext } from "react";

import { deepCopy } from "src/utils/common";
import "./style.scss";

import FontSize from "./components/FontSize/index";
import Color from "./components/Color/index";
import Title from "./components/Title/index";
import MultiStyle from "./components/MultiStyle/index";

import { GlobalContext } from "src/global/globalCommon";

function Style() {
  const global = useContext(GlobalContext);
  const currentComponent = global.getSelectComponent();

  const update = (styleMap = {}) => {
    // 更新样式
    const component = deepCopy(global.getSelectComponent());
    for (const key in styleMap) {
      if (styleMap.hasOwnProperty(key)) {
        component.style[key] = styleMap[key];
      }
    }
    global.modify(component);
    global.runListeners("setUpdate");
    // 已订阅的组件 更新操作
    global.runListeners(component.key + "");
  };

  return (
    <div className="element-setting-style-wrapper">
      <div className="style-top-container">
        {/* 字体 待调研 */}
        {/* 字号 */}
        <FontSize update={update} style={currentComponent.style} />
        {/* 字体颜色 */}
        <Color update={update} style={currentComponent.style} />
        {/* 标题 */}
        <Title update={update} style={currentComponent.style} />
        {/* 字体样式 */}
        <MultiStyle
          update={update}
          style={currentComponent.style}
          global={global}
        />
      </div>
    </div>
  );
}

export default Style;
