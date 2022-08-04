import React from "react";

import "./style.scss";
interface Props {
  update: (style) => void;
  style;
  global?;
}
const ZIndex = (props: Props) => {
  const { update, style } = props;
  const zIndex = style.zIndex;

  const change = (e) => {
    const { value } = e.target;
    handleValue(value);
  };

  const blur = (e) => {
    const { value } = e.target;
    handleValue(value);
  };

  const handleValue = (value) => {
    if (value <= 2) {
      value = 2;
    }
    update({
      zIndex: value,
    });
  };

  return (
    <div className="z-index-wrapper flex-space-between">
      <h4>层级</h4>
      <input type="number" value={zIndex} onChange={change} onBlur={blur} />
    </div>
  );
};

export default ZIndex;
