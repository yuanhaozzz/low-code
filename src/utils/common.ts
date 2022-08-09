/**
 * @description 获取URL参数
 */
export const queryUrlSearch = () => {
  const search = window.location.search;
  if (search.length <= 1) {
    return {};
  }
  return JSON.parse(
    '{"'.concat(
      decodeURIComponent(search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"'),
      '"}'
    )
  );
};

/**
 * @description 格式化事件
 * @param {*} date  时间戳 或 年月日时分秒字符串
 * @param {*} format 格式 yyyy-MM-dd hh:mm:ss
 * @returns
 */
export const format = (date, format) => {
  // 时间戳
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

/**
 * @description 删除为空字段
 * @param {*} data  数据
 */
export const deleteFieldIsUndefined = (data = {}) => {
  for (const key in data) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      delete data[key];
    }
  }
  return data;
};

export const deepCopy = (data, hash = new WeakMap()) => {
  if (!data) {
    return undefined;
  }
  if (typeof data !== "object" || data === null) {
    throw new TypeError("传入参数不是对象");
  }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if (hash.has(data)) {
    return hash.get(data);
  }
  const newData = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 将这个待拷贝对象的引用存于hash中
      hash.set(data, data);
      // 普通对象则递归赋值
      newData[value] = deepCopy(currentDataValue, hash);
    }
  });
  return newData;
};

export const findElementProperty = (element, property) => {
  let currentElement = element;
  while (currentElement !== null) {
    if (currentElement[property]) {
      return currentElement[property];
    }
    currentElement = currentElement.parentNode;
    if (currentElement.id === "root") {
      break;
    }
  }
};

export const findElementId = (element, value) => {
  let currentElement = element;
  while (currentElement !== null) {
    if (currentElement.id === value) {
      return true;
    }
    currentElement = currentElement.parentNode;
    if (currentElement.id === "root") {
      break;
    }
  }
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * @description 存在参考线
 * @param type  类型 0 left 1 right 2 top 3 bottom 4 center
 */
const hasReferenceLineElement = (type) => {
  const el = document.querySelector(`.reference-line-${type}`);
  return el;
};

/**
 * @description 画参考线
 * @param type  类型 0 left 1 right 2 top 3 bottom 4 center
 * @param num   数值
 * @param componentStyle 当前组件样式
 */
export const createReferenceLineElement = (
  type: number,
  num,
  componentStyle
) => {
  const line = hasReferenceLineElement(type);
  // 删除参考线
  if (num === undefined && line) {
    line.remove();
    return;
  }
  if (num === undefined) {
    return;
  }
  // 是否存在参考线
  if (line) {
    return;
  }
  // 创建参考线
  const { left, top, width, height } = componentStyle;
  const style = {
    width: "1px",
    height: "1px",
    left: "0px",
    top: "0px",
  };
  // 水平配置
  const horizontalHeight = "2000px";
  const horizontalTop =
    top + parseInt(height) / 2 - parseInt(horizontalHeight) / 2;
  // 垂直配置
  const verticalHeight = "2000px";
  const verticalLeft =
    left + parseInt(width) / 2 - parseInt(verticalHeight) / 2;
  switch (type) {
    case 0: {
      style.height = horizontalHeight;
      style.top = `${horizontalTop}px`;
      style.left = num + "px";
      break;
    }
    case 1: {
      style.height = horizontalHeight;
      style.top = `${horizontalTop}px`;
      style.left = num + "px";
      break;
    }
    case 2: {
      style.width = verticalHeight;
      style.top = `${num}px`;
      style.left = `${verticalLeft}px`;
      break;
    }
    case 3: {
      style.width = verticalHeight;
      style.top = `${num}px`;
      style.left = `${verticalLeft}px`;
      break;
    }
    case 4: {
      style.width = verticalHeight;
      style.top = `${num}px`;
      style.left = `${verticalLeft}px`;
      break;
    }
    case 5: {
      style.height = horizontalHeight;
      style.top = `${horizontalTop}px`;
      style.left = num + "px";
      break;
    }
  }

  const el = document.createElement("div");
  el.className = `reference-line reference-line-${type}`;
  el.dataset.num = num;

  el.style.width = style.width;
  el.style.height = style.height;
  el.style.left = style.left;
  el.style.top = style.top;
  // 插入画布
  document.querySelector(".canvas-content-wrapper").appendChild(el);
};

export const removeReferenceLineElement = () => {
  const list = document.querySelectorAll(".reference-line");
  list.forEach((el) => el.remove());
};
