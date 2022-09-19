import React from "react";

import "./style.scss";
import { sidebarList } from "../../constants";

import Tips from "src/components/Tips";

interface Props {
  global;
}
function Sidebar(props: Props) {
  const { global } = props;

  const handle = (type) => {
    switch (type) {
      // 撤销
      case 1: {
        revoke();
        break;
      }
      // 恢复
      case 2: {
        recover();
        break;
      }
      default: {
        console.log("default");
      }
    }
  };

  const revoke = () => {
    global.deleteHistoryOperation();
  };

  const recover = () => {
    global.deleteRecordHistoryOperation();
  };

  return (
    <ul className="page-sidebar-wrapper">
      {sidebarList.map((item) => (
        <li
          className="flex-center show-tips"
          key={item.type}
          onClick={() => handle(item.type)}
        >
          {/* 图标 */}
          <i className={`fa-solid ${item.icon}`}></i>
          {/* 百分比 */}
          {item.text && <span className="num">{item.text}</span>}
          {/* tips */}
          {item.name && <Tips title={item.name} direction="left" />}
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
