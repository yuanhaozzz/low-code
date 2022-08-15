import React, { Fragment, useContext, useState, useEffect } from "react";

import { deepCopy } from "src/utils/common";
import "./style.scss";

import FontSize from "./components/FontSize/index";
import Color from "./components/Color/index";
import Title from "./components/Title/index";
import MultiStyle from "./components/MultiStyle/index";
import Opacity from "./components/Opacity/index";
import Setting from "./components/Setting/index";
import Border from "./components/Border/index";
import Position from "./components/Position/index";

import { GlobalContext } from "src/global/globalCommon";
import { selectMenulist } from "./constants";

let menuList = selectMenulist;
function Style() {
  const global = useContext(GlobalContext);
  const currentComponent = global.getSelectComponent();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = global.subscribe("settingPosition", () => {
      forceUpdate((prev) => prev + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
    global.runListeners("canvasSelectElement");
    // 已订阅的组件 更新操作
    global.runListeners(component.key + "");
  };

  const handleMenu = (index, status) => {
    menuList = menuList.map((item) => {
      item.status = false;
      return item;
    });
    menuList[index].status = !status;
    forceUpdate((prev) => prev + 1);
  };

  return (
    <div className="element-setting-style-wrapper">
      <div className="style-top-container">
        <div className="top">
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
          {/* 透明度 */}
          <Opacity
            update={update}
            style={currentComponent.style}
            global={global}
          />
        </div>

        {menuList.map((menu, index) => (
          <Fragment key={menu.name}>
            <div
              className="style-list flex-space-between"
              onClick={() => handleMenu(index, menu.status)}
            >
              <h4 className="left">{menu.name}</h4>
              <div className={`right ${menu.status ? "action" : ""}`}></div>
            </div>
            {/* 尺寸与位置 */}
            {menu.status && index === 0 && (
              <Position
                update={update}
                style={currentComponent.style}
                global={global}
                canvasInfo={global.getCanvasInfo()}
              />
            )}
            {/* 功能设置 */}
            {menu.status && index === 1 && (
              <Setting
                update={update}
                style={currentComponent.style}
                global={global}
              />
            )}
            {/* 边框 */}
            {menu.status && index === 2 && (
              <Border
                update={update}
                style={currentComponent.style}
                global={global}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Style;
