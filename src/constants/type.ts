import React from "react";

export interface Style {
  position?: string;
  left?: number;
  top?: number;
  [propName: string]: any;
}
export interface Animation {
  [propName: string]: any;
}
export interface Event {
  [propName: string]: any;
}

export interface ModifyGlobal {
  style?: Style;
  event?: Event;
  animation?: Animation;
}

export interface Component {
  key: number;
  isMoving: boolean;
  text: string;
  alternateLeft: number;
  alternateTop: number;
  type: string;
  style;
  event: Event;
  animation: Animation;
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
}
