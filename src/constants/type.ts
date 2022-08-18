import React from "react";

export interface Animation {
  [propName: string]: any;
}
export interface Event {
  [propName: string]: any;
}

export interface Component {
  key: number;
  element: any | undefined;
  isMoving: boolean;
  text: string;
  alternateLeft: number;
  alternateTop: number;
  type: string;
  style: any;
  event: Event;
  animation: Animation[];
}

export interface CanvasOffset {
  offsetLeft: number;
  offsetTop: number;
  width: number;
  height: number;
}

export interface GlobalDataType {
  componentList: Component[];
}

export interface Listeners {
  [index: number]: () => void;
}

export interface MouseMove {
  clientX: number;
  clientY: number;
}

export interface GlobalDeclear {
  globalData: GlobalDataType;
  listeners: any;
  add: (component: Component) => void;
  subscribe: (key: string, callback: (e) => void) => () => void;
  runListeners: (key: string) => void;
  delete: (key: number) => void;
  clear: () => void;
  modify: (component: Component) => void;
  find: (key: number) => Component;
  findIndex: (key: number) => void;
  setSelectComponent: (key: number) => void;
  getSelectComponent: () => Component;
  setMouseMove: (clientMove: MouseMove) => void;
  getMouseMove: () => MouseMove;
  modifySelectComponent: (property) => void;
  clearSelectComponent: () => void;
  setCanvasInfo: (offset) => void;
  getCanvasInfo: () => CanvasOffset;
  getComponentList: () => Component[];
  addDoubleClickEl: (el: HTMLDivElement) => void;
  clearDoubleClickEL: () => void;
  modifyStyle: () => void;
  findCurrentElementStyle: () => string;
  addAnimation: (animation: Animation) => void;
  deleteAnimation: (index: number) => void;
  modifyAnimation: (index: number, newAnimation) => void;
  findAnimation: (id: number) => Animation;
  modifyProperty: (key, newProperty) => void;
  testModifySelectComponent: (element) => void;
}
