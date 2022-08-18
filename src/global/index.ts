import {
  GlobalDataType,
  Listeners,
  Component,
  CanvasOffset,
  MouseMove,
} from "src/constants/type";
import { deepCopy } from "src/utils/common";

class global {
  globalData: GlobalDataType;
  listeners: Listeners;
  selectComponent: any;
  canvasInfo: CanvasOffset;
  doubleClickEl: HTMLDivElement[];
  test;
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
    this.test = {};
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

  // 添加组件
  add(component: Component) {
    // 生成唯一key
    component.key = Math.random();
    this.globalData.componentList.push(component);
    this.setSelectComponent(component.key);
  }

  // 添加组件
  delete(key: number) {
    const { componentList } = this.globalData;
    const componentIndex = this.findIndex(key);
    if (componentIndex >= 0) {
      componentList.splice(componentIndex, 1);
    }
  }

  // 清空组件
  clear() {
    this.globalData.componentList = [];
  }

  // 修改组件
  modify(component: Component) {
    this.selectComponent = component;
    const { key } = component;
    const { componentList } = this.globalData;
    this.globalData.componentList = componentList.map((item) => {
      if (item.key === key) {
        item = { ...item, ...component };
      }
      return item;
    });
  }

  // 修改组件属性
  modifyProperty(key, newProperty) {
    this.globalData.componentList = this.globalData.componentList.map(
      (item) => {
        if (item.key === key) {
          item = { ...item, ...newProperty };
        }
        return item;
      }
    );
    console.log(this.globalData.componentList);
  }

  // 查找组件
  find(key: number) {
    const { componentList } = this.globalData;
    const component = componentList.find((component) => component.key === key);
    return component;
  }

  // 查找组件下标
  findIndex(key: number) {
    const { componentList } = this.globalData;
    const index = componentList.findIndex((component) => component.key === key);
    return index;
  }

  // 修改组件样式
  modifyStyle(style) {
    this.selectComponent.style = { ...this.selectComponent.style, ...style };
  }

  // 添加组件动画
  addAnimation(animation) {
    const { id } = animation;
    const animations = this.selectComponent.animation;
    if (animations.find((item) => item.id === id)) {
      return;
    }
    this.selectComponent.animation = [...animations, animation];
  }

  // 删除组件动画
  deleteAnimation(index) {
    this.selectComponent.animation.splice(index, 1);
  }

  // 修改组件动画
  modifyAnimation(index, newAnimation) {
    const old = this.selectComponent.animation[index];
    this.selectComponent.animation[index] = { ...old, ...newAnimation };
  }

  // 查找组件动画
  findAnimation(id) {
    return this.selectComponent.animation.find((item) => item.id === id);
  }

  // 设置当前组件
  setSelectComponent(key: number) {
    this.selectComponent = this.find(key);
  }

  // 获取当前组件
  getSelectComponent() {
    return deepCopy(this.selectComponent);
  }

  // 清除当前组件
  clearSelectComponent() {
    this.selectComponent = null;
  }

  // 修改当前组件
  modifySelectComponent(property) {
    this.selectComponent = { ...this.selectComponent, ...property };
    this.modify(this.selectComponent);
  }

  // 查找当前组件样式
  findCurrentElementStyle(key) {
    console.log(this.selectComponent);
    const { style } = this.selectComponent;
    return style[key];
  }

  // 设置画布信息
  setCanvasInfo(info) {
    this.canvasInfo = { ...this.canvasInfo, ...info };
  }

  // 获取画布信息
  getCanvasInfo() {
    return this.canvasInfo;
  }

  // 存储双击元素
  addDoubleClickEl(el: HTMLDivElement) {
    this.doubleClickEl.push(el);
  }

  // 清空双击元素
  clearDoubleClickEL() {
    this.doubleClickEl.forEach((el) => el.removeAttribute("contenteditable"));
    this.doubleClickEl = [];
  }
}

export default global;
