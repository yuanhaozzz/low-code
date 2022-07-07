import React, { useState } from "react";

import { SketchPicker } from "react-color";

import "./style.scss";

interface Props {
  update: (key: string, value: string) => void;
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
    <div className="line style-color flex-space-between">
      {colorSelect && (
        <div className="style-color-select">
          <SketchPicker
            color={color}
            onChangeComplete={(color) => update("color", color.hex)}
          />
        </div>
      )}

      <h3 className="left">文本颜色</h3>
      <div
        className="right icon-color-select"
        onClick={() => displayColorSelect(!colorSelect)}
      >
        <div className="right-color" style={{ backgroundColor: color }}></div>
      </div>
    </div>
  );
};

export default Color;
