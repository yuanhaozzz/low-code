import React from "react";

import "./style.scss";
interface Props {
  update: (style) => void;
  style;
  global?;
}
const Color = (props: Props) => {
  // const { update, style } = props;
  // const fontSize = style.fontSize;
  return <div className="style-color"></div>;
};

export default Color;
