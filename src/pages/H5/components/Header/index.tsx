import React, { useContext, memo } from "react";

import { GlobalContext } from "src/global/globalCommon";
import { jsonText } from "src/constants/json";

import "./style.scss";

function Header() {
  const global = useContext(GlobalContext);
  const addComponentJson = (json) => {
    // 添加组件后 发布订阅更新
    global.add(json);
    global.runListeners("rootUpdate");
    global.runListeners("setUpdate");
  };

  const publish = () => {
    console.log(JSON.stringify(global.globalData));
  };

  const clear = () => {
    global.clear();
    global.runListeners("rootUpdate");
  };

  const renderCenter = () => {
    return (
      <div className="header-center flex-start ">
        <div
          className={`header-center-item icon-text flex-end`}
          onClick={() => addComponentJson(jsonText)}
        >
          文本
        </div>
        <div className={`header-center-item icon-image flex-end`}>图片</div>
        <div className={`header-center-item icon-music flex-end`}>音乐</div>
        <div className={`header-center-item icon-video flex-end`}>视频</div>
        <div
          className={`header-center-item icon-clear flex-end`}
          onClick={() => clear()}
        >
          清除
        </div>
      </div>
    );
  };

  const renderRight = () => {
    return (
      <div className="header-right flex-start">
        <button className="button-hover-default">预览</button>
        <button className="button-hover-default">保存</button>
        <button className="send button-hover-send" onClick={() => publish()}>
          发布
        </button>
        <button className="quit button-hover-quit">退出</button>
      </div>
    );
  };

  return (
    <header className="h5-header-wrapper flex-space-between">
      {/* 左 */}
      <div className="header-left"></div>
      {/* 中 */}
      {renderCenter()}
      {/* 右 */}
      {renderRight()}
    </header>
  );
}

export default memo(Header);
