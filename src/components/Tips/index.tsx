import React, { Component } from "react";

import "./style.scss";
interface Props {
  title: string;
  direction?: string;
}

const Tips = (props: Props) => {
  const { title, direction } = props;
  return (
    <div
      className={`common-tips ${
        direction ? "common-tips-" + direction : "common-tips-top"
      }`}
    >
      {/* 背景颜色 */}
      <div className="common-tips-background">{title}</div>
      <b className={`tips-bottom-arrow`}></b>
    </div>
  );
};

export default Tips;
