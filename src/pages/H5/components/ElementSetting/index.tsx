import React, {
  useState,
  useContext,
  memo,
  useEffect,
  Fragment,
  useRef,
} from "react";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

import Style from "./components/Style/index";

const tab = ["样式", "动画", "触发"];

let isMove = false;
let downMoveX = 0;
function ElementSetting() {
  const [tabIndex, setTabIndex] = useState(0);

  const [, update] = useState(0);

  const setRef = useRef(null);

  const global = useContext(GlobalContext);

  const selectComponent = global.getSelectComponent();

  useEffect(() => {
    const unsubscribe = global.subscribe("setUpdate", () => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = global.subscribe("mousemove", (e) => {
      move(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = global.subscribe("mouseup", () => {
      mouseUp();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const forceUpdate = () => {
    update((prev) => prev + 1);
  };

  const switchTab = (i) => {
    setTabIndex(i);
  };

  const move = (e) => {
    if (isMove) {
      const { clientX } = e;
      const windowWidth = window.innerWidth;
      const moveRightX = windowWidth - clientX;
      setRef.current.style.right = moveRightX - downMoveX + "px";
    }
  };

  const mouseDown = (e) => {
    const { clientX } = e;
    const windowWidth = window.innerWidth;
    const rightWidth = windowWidth - clientX;
    const right = parseInt(window.getComputedStyle(setRef.current).right);
    downMoveX = rightWidth - right;
    isMove = true;
  };

  const mouseUp = () => {
    downMoveX = 0;
    isMove = false;
  };

  const close = () => {
    global.clearSelectComponent();
    forceUpdate();
  };

  const renderTop = () => {
    return (
      <div
        className="element-setting-top flex-space-between"
        onMouseDown={mouseDown}
      >
        <h1 className="">组件设置</h1>
        <i className="icon-close" onClick={() => close()} />
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

  if (!selectComponent || !selectComponent.type) {
    return <Fragment></Fragment>;
  }

  return (
    <section className="element-setting-wrapper" ref={setRef}>
      {selectComponent.type === "1" && (
        <Fragment>
          {/* 导航标题 */}
          {renderTop()}
          {/* 样式 动画 触发 选项 */}
          {renderTab()}
          {tabIndex === 0 && <Style />}
        </Fragment>
      )}
    </section>
  );
}

export default memo(ElementSetting);
