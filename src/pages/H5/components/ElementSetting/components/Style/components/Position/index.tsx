import React, { useEffect, useState } from "react";

import Tips from "src/components/Tips/index";

import "./style.scss";

const list = [
  {
    id: 1,
    name: "左对齐",
    className: "icon-position-left",
  },
  {
    id: 2,
    name: "右对齐",
    className: "icon-position-right",
  },
  {
    id: 3,
    name: "上对齐",
    className: "icon-position-top",
  },
  {
    id: 4,
    name: "下对齐",
    className: "icon-position-bottom",
  },
  {
    id: 5,
    name: "居中对齐",
    className: "icon-position-center",
  },
];

interface Props {
  update: (style) => void;
  style;
  global?;
  canvasInfo?;
}
const Position = (props: Props) => {
  const { update, style, canvasInfo, global } = props;
  // const [, forceUpdate] = useState(0);
  const left = parseInt(style.left);
  const top = parseInt(style.top);
  const width = parseInt(style.width);
  const height = parseInt(style.height);

  const handlePosition = (item) => {
    switch (item.id) {
      case 1: {
        update({
          left: 0,
        });
        break;
      }
      case 2: {
        update({
          left: canvasInfo.width - width,
        });
        break;
      }
      case 3: {
        update({
          top: 0,
        });
        break;
      }
      case 4: {
        update({
          top: canvasInfo.height - height,
        });
        break;
      }
      case 5: {
        update({
          left: canvasInfo.width / 2 - width / 2,
          top: canvasInfo.height / 2 - height / 2,
        });
        break;
      }
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "width": {
        update({
          width: value + "px",
        });
        break;
      }
      case "height": {
        update({
          height: value + "px",
        });
        break;
      }
      case "left": {
        update({
          left: value * 1,
        });
        break;
      }
      case "top": {
        update({
          top: value * 1,
        });
        break;
      }
    }
  };

  return (
    <div className="style-position">
      {/* 定位 */}
      <ul className="position-icon flex-space-between">
        {list.map((item) => (
          <li key={item.id} onClick={() => handlePosition(item)}>
            <Tips title={item.name} />
            {/* 图标 */}
            <i className={item.className}></i>
          </li>
        ))}
      </ul>
      {/* 尺寸 */}
      <div className="style-position-box flex-space-between">
        <div className="left">尺寸</div>
        <div className="right flex-space-between">
          <div className="input">
            <input type="number" value={width} name="width" onChange={change} />
            <h4>宽</h4>
          </div>
          <div className="input">
            <input
              type="number"
              value={height}
              name="height"
              onChange={change}
            />
            <h4>高</h4>
          </div>
        </div>
      </div>
      {/* 位置 */}
      <div className="style-position-box flex-space-between">
        <div className="left">尺寸</div>
        <div className="right flex-space-between">
          <div className="input">
            <input type="number" value={left} name="left" onChange={change} />
            <h4>X</h4>
          </div>
          <div className="input">
            <input type="number" value={top} name="top" onChange={change} />
            <h4>Y</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Position;
