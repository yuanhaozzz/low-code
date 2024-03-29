import React, { useState } from "react";
import { createPortal } from "react-dom";

import { SketchPicker } from "react-color";

import "./style.scss";

interface Props {
  update: (style) => void;
  style;
}
const Color = (props: Props) => {
  const { update, style } = props;
  const color = style.color;

  const [colorSelect, setColorSelect] = useState(false);

  const displayColorSelect = (status: boolean) => {
    setColorSelect(status);
  };

  return (
    <section className="line style-color flex-space-between">
      {colorSelect &&
        createPortal(
          <div className="style-color-select">
            <SketchPicker
              color={color}
              onChangeComplete={(color) => update({ color: color.hex })}
            />
          </div>,
          document.querySelector(".element-setting-wrapper")
        )}
      <h3 className="left">文本颜色</h3>
      <div
        className="right icon-color-select"
        onClick={() => displayColorSelect(!colorSelect)}
      >
        <div className="right-color" style={{ backgroundColor: color }}></div>
      </div>
    </section>
  );
};

export default Color;
