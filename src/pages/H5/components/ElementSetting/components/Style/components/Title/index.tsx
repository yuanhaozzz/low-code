import React from "react";

import "./style.scss";

// import { fontSizeList } from "src/constants/style";

interface IProps {
  update: (style) => void;
  style;
}

const titleList = [
  {
    title: "标题1",
    size: 32,
    weight: "bold",
  },
  {
    title: "标题2",
    size: 22,
    weight: "normal",
  },
  {
    title: "标题3",
    size: 18,
    weight: "normal",
  },
  {
    title: "正文",
    size: 14,
    weight: "normal",
  },
];

function Title(props: IProps) {
  const { update } = props;

  const click = (item) => {
    const { size, weight } = item;
    update({ fontSize: size + "px", fontWeight: weight });
  };

  return (
    <ul className="style-font-title flex-start">
      {titleList.map((item) => (
        <li key={item.size} onClick={() => click(item)}>
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default Title;
