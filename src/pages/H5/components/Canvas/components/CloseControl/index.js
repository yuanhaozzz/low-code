import React, { useEffect, Fragment, useContext } from "react";

import { GlobalContext } from "src/global/globalCommon";

function CloseControl() {
  const global = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      mouseDown(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const mouseDown = (e) => {
    // const targetElement = e.target;
    // 点击时 如果不是输入框，则清除历史双击元素的contenteditable属性
    // closeDoubleInput(targetElement);
  };

  const closeDoubleInput = (targetElement) => {
    const select = global.getSelectComponent();
    if (select) {
      const contenteditable = targetElement.getAttribute("contenteditable");
      if (!contenteditable) {
        select.text = targetElement.firstChild.nodeValue;
        // 更新描述对象
        global.modify(select);
        // 清除输入框属性
        global.clearDoubleClickEL();
      }
    }
  };

  return <Fragment></Fragment>;
}

export default CloseControl;
