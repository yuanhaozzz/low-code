import React, { Fragment, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SketchPicker } from "react-color";

import "./style.scss";
import { specialStyleList } from "../../constants";

import Tips from "src/components/Tips/index";

interface IProps {
  update: (style) => void;
  style;
  global;
}
const styleList = [
  {
    name: "加粗",
    className: "icon-b",
    key: "fontWeight",
    style: ["bold", "normal"],
  },
  {
    name: "斜体",
    className: "icon-i",
    key: "fontStyle",
    style: ["italic", "normal"],
  },
  {
    name: "下划线",
    className: "icon-u",
    key: "textDecoration",
    style: ["underline"],
  },
];

function MultiStyle(props: IProps) {
  const { update, global, style } = props;
  // const [index, setIndex] = useState(1);
  const [center, selectCenter] = useState(false);
  const [backgroundColorSelect, setBackgroundColorSelect] = useState(false);
  const [showLineHeight, openLineHeight] = useState(false);
  const [showLetterSpacing, openLetterSpacing] = useState(false);
  const [, forceUpdate] = useState(0);
  const [lineHeight, setLineHeight] = useState(undefined);
  const [letterSpacing, setLetterSpacing] = useState(undefined);
  const backgroundColor = style.backgroundColor;
  useEffect(() => {
    setLineHeight(style.lineHeight);
    setLetterSpacing(parseInt(style.letterSpacing));
  }, [style]);

  useEffect(() => {
    if (lineHeight >= 0) {
      update({ lineHeight });
    }
  }, [lineHeight]);

  useEffect(() => {
    if (letterSpacing >= 0) {
      update({ letterSpacing: letterSpacing + "px" });
    }
  }, [letterSpacing]);

  const textAlignClass = {
    left: {
      select: "icon-left-select",
      unselect: "icon-left",
      isSelect: false,
    },
    center: {
      select: "icon-center-select",
      unselect: "icon-center",
      isSelect: false,
    },
    right: {
      select: "icon-right-select",
      unselect: "icon-right",
      isSelect: false,
    },
  };

  const click = (item) => {
    const { key, style } = item;
    let value = style[0];
    if (key) {
      const styleValue = global.findCurrentElementStyle(key);
      if (styleValue) {
        if (style[0] === styleValue) {
          value = style[1];
        } else {
          value = style[0];
        }
      }
      update({ [key]: value });
    }
  };

  const handleCenter = () => {
    display(0);
  };

  const display = (index) => {
    const target = [
      {
        value: center,
        set: selectCenter,
      },
      {
        value: backgroundColorSelect,
        set: setBackgroundColorSelect,
      },
      {
        value: showLineHeight,
        set: openLineHeight,
      },
      {
        value: showLetterSpacing,
        set: openLetterSpacing,
      },
    ];
    target.map((target, i) => {
      if (index === i) {
        target.set(!target.value);
      } else {
        target.set(false);
      }
    });
  };

  const handleBackground = () => {
    display(1);
  };

  const selectTextAlign = (value) => {
    update({ textAlign: value });
  };

  const rangeChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "lineHeight":
        setLineHeight(value);
        break;
      case "letterSpacing":
        setLetterSpacing(value);
        break;
    }
  };

  const blur = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    switch (name) {
      case "lineHeight":
        {
          if (value >= 3) {
            value = 3;
          }
          if (value <= 0) {
            value = 0;
          }
          setLineHeight(value);
        }
        break;
      case "letterSpacing": {
        {
          if (value >= 100) {
            value = 100;
          }
          if (value <= 0) {
            value = 0;
          }
          setLetterSpacing(value);
        }
        break;
      }
    }
  };

  const renderComplex = () => {
    return <Fragment>{/*  */}</Fragment>;
  };

  const renderCenter = () => {
    if (!center) {
      return <Fragment></Fragment>;
    }
    return (
      <div className="list-select flex-center">
        <div className="list-select-center flex-center">
          {Object.keys(textAlignClass).map((key) => (
            <div
              key={key}
              className="center-container flex-space-between"
              onClick={() => selectTextAlign(key)}
            >
              {textAlignClass[key].isSelect ? (
                <i className={textAlignClass[key].select} />
              ) : (
                <i className={textAlignClass[key].unselect} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBackgroundColor = () => {
    if (!backgroundColorSelect) {
      return <Fragment></Fragment>;
    }
    return (
      <Fragment>
        {createPortal(
          <div className="style-background-color-select">
            <SketchPicker
              color={backgroundColor}
              onChangeComplete={(color) =>
                update({ backgroundColor: color.hex })
              }
            />
          </div>,
          document.querySelector(".element-setting-wrapper")
        )}
      </Fragment>
    );
  };

  const renderLight = () => {
    if (!showLineHeight) {
      return <Fragment></Fragment>;
    }
    return (
      <div className="list-select flex-center">
        <div className="list-select-light flex-center">
          <h4>行间距</h4>
          <input
            type="range"
            max="3"
            step={0.1}
            min="0"
            className="range"
            onChange={rangeChange}
            value={lineHeight || 0}
            name="lineHeight"
          />
          <input
            type="number"
            max="3"
            step={0.1}
            min="0"
            className="number"
            value={lineHeight || 0}
            onBlur={blur}
            onChange={rangeChange}
            name="lineHeight"
          />
        </div>
      </div>
    );
  };

  const renderFont = () => {
    if (!showLetterSpacing) {
      return <Fragment></Fragment>;
    }
    return (
      <div className="list-select flex-center">
        <div className="list-select-light flex-center">
          <h4>字间距</h4>
          <input
            type="range"
            max="100"
            step={1}
            min="0"
            className="range"
            onChange={rangeChange}
            value={letterSpacing || 0}
            name="letterSpacing"
          />
          <input
            type="number"
            max="100"
            step={1}
            min="0"
            className="number"
            value={letterSpacing || 0}
            onBlur={blur}
            onChange={rangeChange}
            name="letterSpacing"
          />
        </div>
      </div>
    );
  };

  const textAlign = style["textAlign"];
  textAlignClass[textAlign].isSelect = true;
  const { select, unselect } = textAlignClass[textAlign];
  return (
    <section className="multi-style-list flex-start">
      {styleList.map((item, index) => (
        <div
          key={index}
          onClick={() => click(item)}
          className="flex-center item"
        >
          <Tips title={item.name} />
          {/* 图标 */}
          <i className={item.className}></i>
        </div>
      ))}
      {/* 居中icon */}
      <div onClick={() => handleCenter()} className="flex-center item">
        <Tips title="居中" />
        {/* 图标 */}
        <i className={center ? select : unselect}></i>
      </div>
      {/* 背景颜色icon */}
      <div onClick={() => handleBackground()} className="flex-center item">
        <Tips title="背景颜色" />
        {/* 图标 */}
        <i className="icon-background"></i>
        {/* 颜色展示 */}
        <div className="background-line" style={{ backgroundColor }}></div>
      </div>
      {/* 行间距icon */}
      <div onClick={() => display(2)} className="flex-center item">
        <Tips title="行间距" />
        {/* 图标 */}
        <i className="icon-light"></i>
      </div>
      {/* 字间距icon */}
      <div onClick={() => display(3)} className="flex-center item">
        <Tips title="字间距" />
        {/* 图标 */}
        <i className="icon-font"></i>
      </div>
      {/* 居中 */}
      {renderCenter()}
      {/* 背景 */}
      {renderBackgroundColor()}
      {/* 行间距 */}
      {renderLight()}
      {/* 字间距 */}
      {renderFont()}
    </section>
  );
}

export default MultiStyle;
