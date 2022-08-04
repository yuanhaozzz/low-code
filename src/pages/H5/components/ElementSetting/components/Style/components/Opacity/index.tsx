import React, { useState, useEffect } from "react";

import "./style.scss";

interface Props {
  update: (style) => void;
  style;
  global?;
}
let number = 0;
let moveX = 0;
let isMove = false;
const Opacity = (props: Props) => {
  const { update, style, global } = props;
  // const fontSize = style.fontSize;
  const [, forceUpdate] = useState(0);
  number = style.opacity || 0;
  useEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      mouseDown(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = global.subscribe("mousemove", (e) => {
      mouseMove(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = global.subscribe("mouseup", () => {
      mouseUp();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toFixed = (str, num = 4) => {
    return str.slice(0, num);
  };

  const mouseDown = (e) => {
    const { clientX, target } = e;
    console.log();
    if (target.dataset.settingOpacity === "settingOpacity") {
      moveX = clientX;
      isMove = true;
    }
  };

  const mouseMove = (e) => {
    if (!isMove) {
      return;
    }
    const { clientX } = e;
    // console.log(clientX, "clientX");
    // console.log(moveX, "moveX");
    if (clientX >= moveX) {
      if (number <= 0) {
        number = 0;
        update({ opacity: 0 });
        return;
      }
      number = (number * 100 - 0.01 * 100) / 100;
      console.log(number);
    }

    if (moveX >= clientX) {
      if (number >= 1) {
        number = 1;
        update({ opacity: 1 });
        return;
      }
      number = (number * 100 + 0.01 * 100) / 100;
      console.log("左");
    }
    update({ opacity: toFixed(number + "") });
    moveX = clientX;
  };

  const mouseUp = () => {
    isMove = false;
    console.log(isMove);
  };

  const mouseOver = (e) => {
    // isMove = false;
  };

  const mouseOut = (e) => {
    isMove = false;
  };

  const change = (e) => {
    const { value } = e.target;
    update({ opacity: (100 - value) / 100 });
    forceUpdate((prev) => prev + 1);
  };

  const blur = (e) => {
    let { value } = e.target;
    if (value >= 100) {
      value = 100;
    }
    if (value <= 0) {
      value = 0;
    }
    number = value;
    update({ opacity: (100 - value) / 100 });
    forceUpdate((prev) => prev + 1);
  };

  return (
    <div className="style-opacity flex-space-between">
      <h3>透明度</h3>
      <div className="style-opacity-right flex-space-between">
        {/* 输入框 */}
        <input
          type="number"
          onBlur={blur}
          value={toFixed(100 - number * 100 + "", 3) * 1}
          onChange={change}
          data-setting-opacity="settingOpacity"
        />
        <span>%</span>
      </div>
    </div>
  );
};

export default Opacity;
