import React, { Fragment, useState } from "react";

import Padding from "./components/Padding/index";
import BorderRadius from "./components/BorderRadius/index";
import ZIndex from "./components/ZIndex/index";

import "./style.scss";
interface Props {
  update: (style) => void;
  style;
  global?;
}
const Setting = (props: Props) => {
  const { update, style, global } = props;
  // const fontSize = style.fontSize;
  return (
    <Fragment>
      <ZIndex update={update} style={style} global={global} />
      <Padding update={update} style={style} global={global} />
      <BorderRadius update={update} style={style} global={global} />
    </Fragment>
  );
};

export default Setting;
