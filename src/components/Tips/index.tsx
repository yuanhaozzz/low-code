import React, { Component } from "react";

import "./style.scss";
interface Props {
  title: string;
}

const Tips = (props: Props) => {
  const { title } = props;
  return (
    <div className="tips">
      {/* 背景颜色 */}
      {title}
      <b className="tips-bottom-arrow"></b>
    </div>
  );
};

export default Tips;
