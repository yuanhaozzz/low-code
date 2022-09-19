import React, { useState, useContext, Fragment } from "react";

import { eventTypeList, scenesList } from "src/constants/event";
import { message } from "antd";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

let scenesListAlternate = scenesList;

const Event = () => {
  const global = useContext(GlobalContext);
  const component = global.getSelectComponent();
  const [, forceUpdate] = useState(0);
  const [eventList, setEventList] = useState([{ name: "点击", type: 1 }]);
  const [selectEventTypeList, setEventTypeList] = useState(false);

  const selectScenes = (index) => {
    const scene = scenesListAlternate[index];
    // 无反馈，与其他相斥
    if (index === 0) {
      scenesListAlternate = scenesListAlternate.map((item) => {
        item.isSelect = false;
        return item;
      });
    } else {
      scenesListAlternate[0].isSelect = false;
    }
    updateComponentEvent(scene.isSelect, scene, index);
    scenesListAlternate[index].isSelect = !scene.isSelect;

    forceUpdate((prev) => prev + 1);
  };

  const updateComponentEvent = (isSelect, scene, index) => {
    const { event } = global.getSelectComponent();
    // 无反馈 清空
    if (index === 0) {
      global.modifySelectComponent({ event: [] });
      return;
    }
    // 添加
    if (!isSelect) {
      global.modifySelectComponent({ event: [...event, scene] });
      return;
    }
    // 删除
    const findIndex = event.findIndex(
      (item) => item.scenesType === scene.scenesType
    );
    event.splice(findIndex, 1);
    global.modifySelectComponent({ event: [...event] });
  };

  const deleteScenesHandle = (scene, index) => {
    const { event } = global.getSelectComponent();
    event.splice(index, 1);
    global.modifySelectComponent({ event: [...event] });
    const findIndex = scenesListAlternate.findIndex(
      (item) => item.scenesType === scene.scenesType
    );
    scenesListAlternate[findIndex].isSelect = false;
    forceUpdate((prev) => prev + 1);
  };

  const change = (e, index) => {
    const component = global.getSelectComponent();
    const { value } = e.target;
    component.event[index].value = value;
    forceUpdate((prev) => prev + 1);
    console.log(component.event);
  };

  const swithEventType = () => {
    setEventTypeList(!selectEventTypeList);
  };

  const selectEventType = (event) => {
    const component = global.getSelectComponent();
    const hasEvent = eventList.find((item) => item.type === event.type);
    if (hasEvent) {
      message.error("请勿重复添加事件");
      return;
    }
    setEventList([...eventList, event]);
  };

  const renderTypeList = () => {
    return (
      <ul className="item-type-list">
        {eventTypeList.map((item, index) => (
          <li key={index} onClick={() => selectEventType(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  const renderEventList = (item) => {
    return (
      <div className="item-top flex-space-between">
        <h3 className="event-item-type flex-start">
          {/* 事件名称 */}
          {item.name}
          {/* 箭头 */}
          {/* <i className={`${item.showList && "action-arrow"}`}></i> */}
          {/* {renderTypeList(item.showList, listIndex)} */}
        </h3>
        {/* 删除 */}
        {/* <div className="event-item-delete"></div> */}
      </div>
    );
  };

  const renderScenes = () => {
    return (
      <ul className="item-scenes flex-start">
        {scenesListAlternate.map((item, index) => (
          <li
            key={item.icon}
            className={`flex-center ${
              item.isSelect && "action"
            } item-scenes-li`}
            onClick={() => selectScenes(index)}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderScenesHandle = () => {
    return (
      <ul className="item-scenes-handle">
        {component.event.map((item, index) => (
          <li key={index}>
            <div className="scenes-handle-top flex-space-between">
              {/* 名称 */}
              <span className="top-title flex-start">{item.name}</span>
              {/* 关闭按钮 */}
              <div
                className="top-close flex-center"
                onClick={() => deleteScenesHandle(item, index)}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            {/* 输入框 */}
            <input
              placeholder={item.placeholder}
              onChange={(e) => change(e, index)}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="element-setting-event-wrapper">
      <div className="scroll">
        <div className="event-container">
          {eventList.map((item) => (
            <div className="event-item" key={item.name}>
              {/* 事件类型选择 */}
              {renderEventList(item)}
              {/* 场景选择 */}
              {renderScenes()}
              {/* 场景操作 */}
              {renderScenesHandle()}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="event-add" onClick={() => swithEventType()}>
        <i className="fa-solid fa-plus"></i>
        添加触发
        {selectEventTypeList && renderTypeList()}
      </div> */}
    </div>
  );
};

export default Event;
