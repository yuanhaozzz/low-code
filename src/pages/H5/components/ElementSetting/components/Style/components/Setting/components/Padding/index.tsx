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
const Padding = (props: Props) => {
  const { update, style } = props;

  const [lock, setLock] = useState(false);
  // const [, forceUpdate] = useState(0)
  const padding = style.padding.split(" ");
  let paddingList = [
    {
      text: "左",
      name: "left",
      value: 0,
    },
    {
      text: "右",
      name: "right",
      value: 0,
    },
    {
      text: "上",
      name: "top",
      value: 0,
    },
    {
      text: "下",
      name: "bottom",
      value: 0,
    },
  ];

  if (padding.length === 1) {
    paddingList = paddingList.map((item: any, index) => {
      item.value = parseInt(padding[0]);
      return item;
    });
  } else {
    paddingList[0].value = parseInt(padding[3]);
    paddingList[2].value = parseInt(padding[0]);
    paddingList[1].value = parseInt(padding[1]);
    paddingList[3].value = parseInt(padding[2]);
  }

  const change = (e, index) => {
    const { value } = e.target;
    // let padding = value
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
      paddingList[index].value = value;
      const padding = `${paddingList[2].value + "px"} ${
        paddingList[1].value + "px"
      } ${paddingList[3].value + "px"} ${paddingList[0].value + "px"}`;
      update({
        padding,
      });
    } else {
      update({
        padding: value + "px",
      });
    }
  };

  return (
    <Fragment>
      <div className="padding-wrapper">
        {/* 标题和锁 */}
        <div className="padding-content-title flex-space-between">
          <h3 className="left">内边距</h3>
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
          {paddingList.map((item, index) => (
            <li key={item.name} className="flex-start">
              <span>{item.text}</span>
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

export default Padding;
