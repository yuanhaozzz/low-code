import React, { useState } from "react";

import "./style.scss";
import { colorBlock } from "./constants";

import { SketchPicker } from "react-color";

const Background = () => {
  //   const { update, style } = props;
  const color = "#000";

  const [colorSelect, setColorSelect] = useState(false);

  const displayColorSelect = (status: boolean) => {
    setColorSelect(status);
  };

  const selectBorderColor = (color) => {
    // update({
    //   borderColor: color,
    // });
  };

  const renderColor = () => {
    return (
      <div className="color-wrapper">
        {/* 颜色选择和输入 */}
        <div className="color-first flex-space-between">
          {/* 颜色选择 */}
          <div
            className="color-first-select"
            onClick={() => displayColorSelect(!colorSelect)}
          ></div>
          {/* 输入框 */}
          <input type="text" placeholder="可输入颜色或渐变" />
          {colorSelect && (
            <div className="colo-first-select">
              <SketchPicker
                color={color}
                // onChangeComplete={(color) => update({ color: color.hex })}
                onChangeComplete={(color) => console.log(color.hex)}
              />
            </div>
          )}
        </div>
        {/* 颜色小块 */}
        <div className="color-second">
          <ul className="color-second-block flex-start">
            {colorBlock.map((color) => (
              <li
                key={color.id}
                style={color.style}
                onClick={() => selectBorderColor(color.value)}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="page-setting-background">
      <h5 className="title">背景颜色</h5>
      {renderColor()}
    </section>
  );
};

export default Background;
