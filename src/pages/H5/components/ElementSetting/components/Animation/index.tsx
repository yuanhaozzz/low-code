import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import SelectAnimationList from "./components/SelectAnimationList";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";
import { playAnimation } from "src/utils/function";

function Animation() {
  const animationListRef = useRef(null);
  const global = useContext(GlobalContext);
  const component = global.getSelectComponent();
  const { animation } = component;

  const [, forceUpdate] = useState(0);

  const addAnimation = () => {
    animationListRef.current.show();
  };

  const onChange = (e, index) => {
    const { checked, name, value } = e.target;
    // 单独处理循环播放
    if (name === "checkbox") {
      component.animation[index].count = checked ? "infinite" : 1;
    }
    component.animation[index][name] = value;
    global.modifySelectComponent(component);
    forceUpdate((prev) => prev + 1);
  };

  const deleteAnimation = (index) => {
    global.deleteAnimation(index);
    forceUpdate((prev) => prev + 1);
  };

  const play = (item) => {
    const { element } = global.getSelectComponent();
    playAnimation(item, element);
  };

  const selectAnimation = (item, index) => {
    animationListRef.current.setAnimation(item.id, index);
  };

  const previewAnimation = () => {
    global.runListeners(`previewAnimation${component.key}`);
  };

  const renderButton = () => {
    return (
      <div className="animation-button flex-space-around">
        <button className="add" onClick={() => addAnimation()}>
          添加动画
        </button>
        <button className="look" onClick={() => previewAnimation()}>
          预览动画
        </button>
      </div>
    );
  };

  const renderAnimationSetting = () => {
    return (
      <ul className="animation-list">
        {animation.map((item, index) => (
          <li key={index}>
            {/* 导航栏 */}
            <div className="item-nav flex-space-between">
              <div className="item-nav-left flex-start">
                <h3>动画1</h3>
                <button
                  className="flex-start"
                  onClick={() => selectAnimation(item, index)}
                >
                  {item.title}
                </button>
              </div>
              <div className="item-nav-right flex-end">
                {/* 播放 */}
                <div className="right-play" onClick={() => play(item)}></div>
                {/* 删除 */}
                <div
                  className="right-delete"
                  onClick={() => deleteAnimation(index)}
                ></div>
                {/* 箭头 */}
                <div className="right-arrow"></div>
              </div>
            </div>
            {/* 动画配置 */}
            <div className="item-setting flex-space-around">
              {/* 时间 */}
              <div className="item-setting-container flex-start">
                <h5 className="left">时间</h5>
                <div className="right">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    name="duration"
                    onChange={(e) => onChange(e, index)}
                    value={item.duration}
                  />
                  s
                </div>
              </div>
              {/* 延时 */}
              <div className="item-setting-container flex-start">
                <h5 className="left">延时</h5>
                <div className="right">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    name="delay"
                    onChange={(e) => onChange(e, index)}
                    value={item.delay}
                  />
                  s
                </div>
              </div>
              {/* 次数 */}
              <div className="item-setting-container flex-start">
                <h5 className="left">次数</h5>
                <div className="right">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    name="count"
                    onChange={(e) => onChange(e, index)}
                    value={item.count || 1}
                    readOnly={item.count === "infinite"}
                  />
                  c
                </div>
              </div>
              {/* 循环播放 */}
              <div className="item-setting-play flex-start">
                <input
                  type="checkbox"
                  id={`checkbox${index}`}
                  name="checkbox"
                  onChange={(e) => onChange(e, index)}
                  value={item.count}
                />
                <label htmlFor={`checkbox${index}`}>循环播放</label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="element-setting-animation-wrapper">
      {/* 按钮 */}
      {renderButton()}
      {/* 动画设置 */}
      {renderAnimationSetting()}
      {/* 动画选择列表 */}
      <SelectAnimationList
        ref={animationListRef}
        global={global}
        forceUpdate={forceUpdate}
      />
    </div>
  );
}

export default Animation;
