import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import "./style.scss";
import { selectList, colorBlock } from "./constants";

import { SketchPicker } from "react-color";

interface Props {
  update: (style) => void;
  style;
  global?;
}

const Border = (props: Props) => {
  const { update, style } = props;
  const borderStyle = selectList.find(
    (item) => item.value === style.borderStyle
  );
  const borderColor = style.borderColor;
  const borderWidth = parseInt(style.borderWidth);
  const [borderSelect, setBorderSelect] = useState(false);
  const [showBorderStyleList, setBorderStyle] = useState(false);
  const [colorSelect, setColorSelect] = useState(false);

  const switchBorderStyle = (item) => {
    update({
      borderStyle: item.value,
    });
    setBorderStyle(false);
  };

  const selectBorderColor = (color) => {
    update({
      borderColor: color,
    });
  };

  const rangeChange = (e) => {
    const { value } = e.target;
    update({
      borderWidth: value + "px",
    });
  };

  const blur = (e) => {
    const { value } = e.target;
    update({
      borderWidth: value + "px",
    });
  };

  const renderBorderStyle = () => {
    return (
      <div className="style-border-line flex-space-between">
        <div className="left">边框样式</div>
        <div className="right right-style">
          {/* 下拉值 */}
          <div
            className="right-select"
            onClick={() => setBorderStyle(!showBorderStyleList)}
          >
            {borderStyle.name}
          </div>
          {/* 箭头 */}
          <div
            className={`right-arrow ${
              showBorderStyleList ? "right-arrow-action" : ""
            }`}
            onClick={() => setBorderStyle(!showBorderStyleList)}
          ></div>
          {/* 下拉 */}
          {showBorderStyleList && (
            <ul className="right-select-list">
              {selectList.map((item) => (
                <li
                  key={item.value}
                  className={`${
                    item.value === borderStyle.value ? "action" : ""
                  }`}
                  onClick={() => switchBorderStyle(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  const renderBorderColor = () => {
    return (
      <div className="style-border-line flex-space-between">
        <div className="left">边框颜色</div>
        <div className="right flex-start right-color">
          {/* 颜色块 */}
          <div
            className="color-block"
            style={{ backgroundColor: borderColor }}
            onClick={() => setColorSelect(!colorSelect)}
          ></div>
          {/* 颜色小块 */}
          <ul className="color-small-block flex-start">
            {colorBlock.map((color) => (
              <li
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => selectBorderColor(color)}
              ></li>
            ))}
          </ul>
          {colorSelect &&
            createPortal(
              <div className="style-border-color-select">
                <SketchPicker
                  color={borderColor}
                  onChangeComplete={(color) =>
                    update({ borderColor: color.hex })
                  }
                />
              </div>,
              document.querySelector(".element-setting-wrapper")
            )}
        </div>
      </div>
    );
  };

  const renderBorderWidth = () => {
    return (
      <div className="style-border-line flex-space-between">
        <div className="left">边框尺寸</div>
        <div className="right flex-start right-width">
          <input
            type="range"
            max="20"
            step={1}
            min="0"
            className="range"
            onChange={rangeChange}
            value={borderWidth || 0}
          />
          <input
            type="number"
            max="20"
            step={1}
            min="0"
            className="number"
            value={borderWidth || 0}
            onBlur={blur}
            onChange={rangeChange}
          />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="style-border">
        {/* 边框样式 */}
        {renderBorderStyle()}
        {/* 边框颜色 */}
        {renderBorderColor()}
        {/* 边框尺寸 */}
        {renderBorderWidth()}
      </div>
    </Fragment>
  );
};

export default Border;
