import {
  GlobalDataType,
  Listeners,
  Component,
  MouseMove,
  ModifyGlobal
} from "src/constants/type";
import {deepCopy} from 'src/utils/common'

class global {
  globalData: GlobalDataType;
  listeners: Listeners;
  selectComponent: Component;
  // mouseMove: MouseMove;
  constructor() {
    this.globalData = {
      componentList: [],
    };
    // 收集订阅
    this.listeners = {};
    // 选中的组件
     this.selectComponent = null;
    // // 鼠标移动
    // this.mouseMove = {
    //   clientX: 0,
    //   clientY: 0,
    // };
  }

  // 添加订阅
  subscribe(key: string, callback: (e) => (e)=> void) {
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

  add(component: Component) {
    // 生成唯一key
    component.key = Math.random();
    this.globalData.componentList.push(component);
    this.setSelectComponent(component.key)
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
    return deepCopy(this.selectComponent || {});
  }

  clearSelectComponent() {
    this.selectComponent = null
  }

  modifySelectComponent(property: ModifyGlobal) {
    this.selectComponent = {...this.selectComponent, ...property}
    this.modify(this.selectComponent)
  }
}

export default global;
