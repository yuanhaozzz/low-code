import React, { useState } from "react";

import "./style.scss";
import { pageSettingList } from "../../constants";
import { jsonPage } from "src/constants/json";
import { Modal, Button } from "antd";

import Tips from "src/components/Tips";

interface Props {
  global;
}

let pageIndex = 0;
function PageManager(props: Props) {
  const { global } = props;

  const [, update] = useState(0);
  const [open, setOpen] = useState(false);

  const forceUpdate = () => {
    update((prev) => prev + 1);
  };

  const addPage = () => {
    const page = { ...jsonPage };
    page.page = global.pages.length + 1;
    global.addPage({ ...page });
    forceUpdate();
    // global.runListeners("rootUpdate");
  };

  const switchPage = (index) => {
    global.switchPage(index);
    forceUpdate();
  };

  const handleSetting = (item, index) => {
    switch (item.type) {
      case 1: {
        console.log(1);
        break;
      }
      default: {
        pageIndex = index;
        setOpen(true);
      }
    }
  };

  const handleOk = () => {
    global.deletePage(pageIndex);
    forceUpdate();
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const renderDelete = () => {
    return (
      <Modal
        title=""
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="1" onClick={handleCancel}>
            稍后决定
          </Button>,
          <Button key="2" type="primary" danger onClick={handleOk}>
            坚持删除
          </Button>,
        ]}
      >
        <p>123</p>
      </Modal>
    );
  };

  const renderPageList = () => {
    return (
      <ul className="page-manager-list">
        {global.pages.map((item, index) => (
          <li
            className={`flex-center item-page ${
              index === global.currentPageIndex && "action"
            }`}
            key={item.page}
            onClick={() => switchPage(index)}
          >
            {/* 页码 */}
            <div className={`item-index item-index-${item.page} flex-center`}>
              {index + 1}
            </div>
            {/* 页面 */}
            <div className="item-page-container">
              {/* 复制本页按钮 */}
              <div className="item-copy flex-center">
                <i className="fa-solid fa-add" />
              </div>
            </div>
            {/* 功能 */}
            <ul className="item-right-setting">
              {pageSettingList.map((item, index) => (
                <li
                  key={item.type}
                  className="show-tips flex-center"
                  onClick={() => handleSetting(item, index)}
                >
                  {/* 图标 */}
                  <i className={`fa-regular ${item.icon}`}></i>
                  {/* tips */}
                  {item.name && <Tips title={item.name} direction="left" />}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  const renderButton = () => {
    return (
      <button className="page-manager-add" onClick={() => addPage()}>
        + 新页面
      </button>
    );
  };

  return (
    <div className="page-manager-wrapper">
      {/* 页面列表 */}
      {renderPageList()}
      {/* 新增页面 */}
      {renderButton()}
      {/* 删除二次确认 */}
      {renderDelete()}
    </div>
  );
}

export default PageManager;
