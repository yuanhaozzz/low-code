import React, { useState, useContext, useEffect } from "react";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

import Sidebar from "./components/Sidebar";
import PageManager from "./components/Manager";
import PageSetting from "./components/Setting";

const tabList = [
  { name: "页面设置", id: 1 },
  { name: "页面管理", id: 2 },
];
function PageConfig() {
  const [tabIndex, setTabIndex] = useState(1);
  const [, forceUpdate] = useState(0);

  const global = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = global.subscribe("pageConfig", () => {
      forceUpdate((prev) => prev + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const switchTab = (index) => {
    setTabIndex(index);
  };

  const renderTab = () => {
    return (
      <ul className="tab-list flex-start">
        {tabList.map((item, index) => (
          <li
            key={item.id}
            className={`flex-center ${tabIndex === index && "action"}`}
            onClick={() => switchTab(index)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="page-config-wrapper">
      {/* 侧边栏 */}
      <Sidebar global={global} />
      <div className="page-setting-container">
        {/* tab */}
        {renderTab()}
        <div className="page-content">
          {/* 页面设置 */}
          {tabIndex === 0 && <PageSetting />}
          {/* 页面管理 */}
          {tabIndex === 1 && <PageManager global={global} />}
        </div>
      </div>
    </div>
  );
}

export default PageConfig;
