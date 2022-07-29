import {
  GlobalDataType,
  Listeners,
  Component,
  CanvasOffset,
  MouseMove,
  ModifyGlobal,
} from "src/constants/type";
import { deepCopy } from "src/utils/common";

class global {
  globalData: GlobalDataType;
  listeners: Listeners;
  selectComponent: Component;
  canvasInfo: CanvasOffset;
  doubleClickEl: HTMLDivElement[];
  // mouseMove: MouseMove;
  constructor() {
    this.globalData = {
      componentList: [],
    };
    // 收集订阅
    this.listeners = {};
    // 选中的组件
    this.selectComponent = null;
    // 画布offset
    this.canvasInfo = {
      offsetLeft: 0,
      offsetTop: 0,
      width: 0,
      height: 0,
    };
    // 双击输入历史元素
    this.doubleClickEl = [];
  }

  // 添加订阅
  subscribe(key: string, callback: (e) => (e) => void) {
    console.log(key, this.listeners[key]);
    if (this.listeners[key]) {
      this.listeners[key].push(callback);
    } else {
      this.listeners[key] = [callback];
    }
    return () => {
      delete this.listeners[key];
    };
  }

  //发布订阅
  runListeners = (key: string, params) => {
    const value = this.listeners[key];
    if (value && Array.isArray(value)) {
      this.listeners[key].forEach((fn) => fn(params));
    }
  };

  getComponentList() {
    return this.globalData.componentList;
  }

  add(component: Component) {
    // 生成唯一key
    component.key = Math.random();
    this.globalData.componentList.push(deepCopy(component));
    this.setSelectComponent(component.key);
  }

  delete(key: number) {
    const { componentList } = this.globalData;
    const componentIndex = this.findIndex(key);
    if (componentIndex >= 0) {
      componentList.splice(componentIndex, 1);
    }
  }

  clear() {
    this.globalData.componentList = [];
  }

  modify(component: Component) {
    this.selectComponent = component;
    const { key } = component;
    const { componentList } = this.globalData;
    const componentIndex = this.findIndex(key);
    if (componentIndex >= 0) {
      componentList[componentIndex] = component;
    }
  }

  modifyStyle(style) {
    this.selectComponent.style = { ...this.selectComponent.style, ...style };
  }

  find(key: number) {
    const { componentList } = this.globalData;
    // 查找
    const component = componentList.find((component) => component.key === key);
    return component;
  }

  findIndex(key: number) {
    const { componentList } = this.globalData;
    // 下标
    const index = componentList.findIndex((component) => component.key === key);
    return index;
  }

  setSelectComponent(key: number) {
    this.selectComponent = this.find(key);
  }

  getSelectComponent() {
    return deepCopy(this.selectComponent);
  }

  clearSelectComponent() {
    this.selectComponent = null;
  }

  modifySelectComponent(property: ModifyGlobal) {
    this.selectComponent = { ...this.selectComponent, ...property };
    this.modify(this.selectComponent);
  }

  getCanvasInfo() {
    return this.canvasInfo;
  }

  setCanvasInfo(info) {
    this.canvasInfo = { ...this.canvasInfo, ...info };
  }

  addDoubleClickEl(el: HTMLDivElement) {
    this.doubleClickEl.push(el);
  }

  clearDoubleClickEL() {
    this.doubleClickEl.forEach((el) => el.removeAttribute("contenteditable"));
    this.doubleClickEl = [];
  }

  /**
   * @description 在选中组件中查找样式
   * @param {string} key 样式key
   */
  findCurrentElementStyle(key) {
    console.log(this.selectComponent);
    const { style } = this.selectComponent;
    return style[key];
  }
}

export default global;
