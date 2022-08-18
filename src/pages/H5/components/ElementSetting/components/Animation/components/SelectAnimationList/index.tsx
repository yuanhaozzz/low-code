import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";

import "./style.scss";
import { animationList } from "src/constants/animation";
import { playAnimation } from "src/utils/function";

const tab = ["进入", "强调", "退出"];

interface Props {
  global;
  forceUpdate;
}
let list = animationList;
let modifyAnimation = -1;
const SelectAnimationList = (props: Props, ref) => {
  const { global, forceUpdate: forceUpdateAnimation } = props;
  const [displayList, setDisplayList] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [, forceUpdate] = useState(0);

  useImperativeHandle(ref, () => ({
    show,
    hide,
    setAnimation,
  }));

  const show = () => {
    setDisplayList(true);
  };

  const hide = () => {
    modifyAnimation = -1;
    list = list.map((item) => {
      item.isMoveIn = false;
      return item;
    });
    setDisplayList(false);
  };

  const switchTab = (i) => {
    setTabIndex(i);
  };

  const mouseEvent = (item, id, status) => {
    const { element } = global.getSelectComponent();
    list[id - 1].isMoveIn = status;
    if (status) {
      playAnimation(item.animation, element);
    }
    forceUpdate((prev) => prev + 1);
    global.runListeners(global.getSelectComponent().key + "");
  };

  const setAnimation = (id, index) => {
    modifyAnimation = index;
    show();
    const item = list[id - 1];
    item.isMoveIn = true;
    setTabIndex(item.type - 1);
  };

  const selectAnimation = (item) => {
    const component = global.getSelectComponent();

    // 修改入口进入
    if (modifyAnimation >= 0) {
      component.animation[modifyAnimation] = { ...item.animation };
    } else {
      component.animation.push({ ...item.animation });
    }

    global.modifySelectComponent(component);
    forceUpdateAnimation((prev) => prev + 1);
    hide();
  };

  const renderTop = () => {
    return (
      <div
        className="element-setting-top flex-space-between"
        // onMouseDown={mouseDown}
      >
        <h1 className="">选择动画</h1>
        <i className="icon-close" onClick={() => hide()} />
      </div>
    );
  };

  const renderTab = () => {
    return (
      <ul className="element-setting-tab flex-start">
        {tab.map((item, index) => (
          <li
            key={index}
            className={tabIndex === index ? "action" : ""}
            onClick={() => switchTab(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const renderAnimationEntry = (type) => {
    const listAlternate = list.filter((item) => item.type === type);
    return (
      <ul className="list-container flex-start">
        {listAlternate.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => mouseEvent(item, item.id, true)}
            onMouseLeave={() => mouseEvent(item, item.id, false)}
            onClick={() => selectAnimation(item)}
          >
            {/* 图标 */}
            <div
              className="item-icon"
              style={{
                background: `url(https://img.ikstatic.cn/MTY2MDYxODk2MDY1NSMgNTAjd2VicA==.webp) ${
                  item.x
                } ${item.isMoveIn ? item.actionY : item.y}`,
              }}
            ></div>
            {/* 名称 */}
            <h4>{item.name}</h4>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={`select-animation-list ${
        displayList ? "select-animation-list-show" : ""
      }`}
    >
      {/* 导航标题 */}
      {renderTop()}
      {/* 样式 动画 触发 选项 */}
      {renderTab()}
      {tabIndex === 0 && renderAnimationEntry(1)}
      {tabIndex === 1 && renderAnimationEntry(2)}
      {tabIndex === 2 && renderAnimationEntry(3)}
    </div>
  );
};

export default forwardRef(SelectAnimationList);
