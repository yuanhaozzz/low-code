import React, { useEffect, useState } from "react";

import "./style.scss";

import { fontSizeList } from "src/constants/style";

interface IProps {
  update: (key: string, value: string) => void;
  style
}

function FontSize(props: IProps) {
  const { update, style } = props;
  const fontSize = style.fontSize

  const change = (e) => {
    const value = e.target.value;
    update('fontSize', value + 'px');
  };

  const increase = () => {
    update('fontSize', parseInt(fontSize) + 2  + 'px');
  };

  const reduce = () => {
    const size = parseInt(fontSize)
    if (size <=12) {
      return
    }
    update('fontSize', parseInt(fontSize) - 2  + 'px');
  };

  return (
    <div className="style-font-size flex-space-between">
      <h3>字号</h3>
      <div className="font-size-right flex-start">
        <div className="right">
          {/* 输入框 */}
          <input
            value={parseInt(style.fontSize)}
            name="fontsize"
            onChange={change}
            autoComplete="off"
          />
          <span className="right-input-background">px</span>
        </div>
        {/* 大小按钮 */}
        <div
          className="right-increase icon-font-size-increase"
          onClick={() => increase()}
        ></div>
        <div
          className="right-reduce icon-font-size-reduce"
          onClick={() => reduce()}
        ></div>
      </div>
    </div>
  );
}

export default FontSize;
