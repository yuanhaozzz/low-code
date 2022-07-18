import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "src/global/globalCommon";

interface Props {
  componentKey: number;
}

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

  const doubleClick = (e) => {
    const el = e.target;
    el.setAttribute("contenteditable", "true");
    global.addDoubleClickEl(el);
    const range = document.createRange();
    range.selectNodeContents(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  };

  return (
    <div
      className="common-component common-text-wrapper common-component-hover"
      style={style}
      data-component-key={key}
      onDoubleClick={doubleClick}
    >
      双击编辑文本...
    </div>
  );
}
Text.type = "1";
export default Text;
