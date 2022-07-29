import React from "react";

import "./style.scss";

// import { fontSizeList } from "src/constants/style";

interface IProps {
  update: (style) => void;
  style;
}

function FontSize(props: IProps) {
  const { update, style } = props;
  const fontSize = style.fontSize;

  const change = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      update({ fontSize: value + "px" });
    }
  };

  const blur = (e) => {
    const value = e.target.value;
    if (value <= 12) {
      update({ fontSize: 12 + "px" });
    }
  };

  const increase = () => {
    update({ fontSize: parseInt(fontSize) + 2 + "px" });
  };

  const reduce = () => {
    const size = parseInt(fontSize);
    if (size <= 12) {
      return;
    }
    update({ fontSize: parseInt(fontSize) - 2 + "px" });
  };

  return (
    <section className="line style-font-size flex-space-between">
      <h3>字号</h3>
      <div className="font-size-right flex-start">
        <div className="right">
          {/* 输入框 */}
          <input
            value={parseInt(style.fontSize) || 0}
            name="fontsize"
            onChange={change}
            onBlur={blur}
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
    </section>
  );
}

export default FontSize;
