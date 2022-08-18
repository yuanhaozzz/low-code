import React, { Fragment, useState } from "react";

import "./style.scss";

import Tips from "src/components/Tips/index";

import OpenLock from "src/assets/image/icon-open-lock.png";
import CloseLock from "src/assets/image/icon-close-lock.png";

interface Props {
  update: (style) => void;
  style;
  global?;
}
const BorderRadius = (props: Props) => {
  const { update, style } = props;

  const [lock, setLock] = useState(false);
  const borderRadius = style.borderRadius.split(" ");
  let list = [
    {
      text: "左",
      name: "left",
      value: 0,
      borderRadius: "9px 0 0 0",
    },
    {
      text: "右",
      name: "right",
      value: 0,
      borderRadius: "0 9px 0 0",
    },
    {
      text: "上",
      name: "top",
      value: 0,
      borderRadius: "0 0 0 9px",
    },
    {
      text: "下",
      name: "bottom",
      value: 0,
      borderRadius: "0 0 9px 0",
    },
  ];

  if (borderRadius.length === 1) {
    list = list.map((item: any, index) => {
      item.value = parseInt(borderRadius[0]);
      return item;
    });
  } else {
    list[0].value = parseInt(borderRadius[0]);
    list[1].value = parseInt(borderRadius[1]);
    list[2].value = parseInt(borderRadius[3]);
    list[3].value = parseInt(borderRadius[2]);
  }

  const change = (e, index) => {
    const { value } = e.target;
    // let borderRadius = value
    setInputValue(value, index);
  };

  const blur = (e, index) => {
    let { value } = e.target;
    if (value <= 0) {
      value = 0;
    }
    if (value >= 150) {
      value = 150;
    }
    setInputValue(value, index);
  };

  const setInputValue = (value, index) => {
    if (lock) {
      list[index].value = value;
      const borderRadius = `${list[0].value + "px"} ${list[1].value + "px"} ${
        list[3].value + "px"
      } ${list[2].value + "px"}`;
      update({
        borderRadius,
      });
    } else {
      update({
        borderRadius: value + "px",
      });
    }
  };

  return (
    <Fragment>
      <div className="border-radius-wrapper">
        {/* 标题和锁 */}
        <div className="padding-content-title flex-space-between">
          <h3 className="left">圆角</h3>
          <div
            className="right flex-center open-top-tips"
            onClick={() => setLock(!lock)}
          >
            <Tips title={lock ? "统一" : "单独"} />
            {/* 开关锁 */}
            {lock ? <img src={OpenLock} /> : <img src={CloseLock} />}
          </div>
        </div>
        {/* 内边距设置 */}
        <ul className="padding-content-list flex-space-between">
          {list.map((item, index) => (
            <li key={item.name} className="flex-start">
              <div className="radius flex-center">
                <span style={{ borderRadius: item.borderRadius }}></span>
              </div>
              <input
                name={item.name}
                type="number"
                value={item.value}
                onChange={(e) => change(e, index)}
                onBlur={(e) => blur(e, index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default BorderRadius;
