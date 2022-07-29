import React, { Fragment, useState } from "react";

import "./style.scss";
import { specialStyleList } from "../../constants";

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
  {
    name: "对齐方式",
    className: "icon-center",
  },
  {
    name: "背景颜色",
    className: "icon-background",
  },
  {
    name: "行间距",
    className: "icon-light",
  },
  {
    name: "字间距",
    className: "icon-font",
  },
];

function MultiStyle(props: IProps) {
  const { update, global } = props;
  const [index, setIndex] = useState(1);

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

  const renderComplex = () => {
    return <Fragment>{/*  */}</Fragment>;
  };

  return (
    <section className="multi-style-list flex-start">
      {styleList.map((item, index) => (
        <div
          key={index}
          onClick={() => click(item)}
          className="flex-center item"
        >
          {/* tips */}
          <div className="tips">
            {item.name}
            <b className="tips-bottom-arrow"></b>
          </div>
          {/* 图标 */}
          <i className={item.className}></i>
        </div>
      ))}
      <div className="list-select flex-center">
        {/* 居中 */}
        <div className="list-select-center">
          <i className=""></i>
        </div>
      </div>
    </section>
  );
}

export default MultiStyle;
