import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "src/global/globalCommon";

interface Props {
  componentKey: number;
}

const inputEl = null;
function Text(props: Props) {
  const global = useContext(GlobalContext);
  const { componentKey } = props;
  const data = global.find(componentKey);

  const { style, key } = data;

  const [, update] = useState(0);

  useEffect(() => {
    const unsubscribe = global.subscribe(data.key + "", () => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const forceUpdate = () => {
    update((prev) => prev + 1);
  };

  /**
   * @description 双击将div转为输入框，并默认选中所有文本节点
   * @param e
   */
  const doubleClick = (e) => {
    const el = e.target;
    el.setAttribute("contenteditable", "true");
    global.addDoubleClickEl(el);
    const range = document.createRange();
    range.selectNodeContents(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  };

  /**
   * @description 离开焦点时，更新描述对象text，删除contenteditable属性
   */
  const blur = (e) => {
    const select = global.getSelectComponent();
    const targetElement = e.target;
    select.text = targetElement.firstChild.nodeValue;
    targetElement.removeAttribute("contenteditable");
    // 更新描述对象
    global.modify(select);
  };

  return (
    <div
      className="common-component common-text-wrapper common-component-hover"
      style={style}
      data-component-key={key}
      onDoubleClick={doubleClick}
      onBlur={blur}
    >
      双击编辑文本...
    </div>
  );
}
Text.type = "1";
export default Text;
