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
  if(typeof data !== 'object' || data === null){
        throw new TypeError('传入参数不是对象')
    }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if(hash.has(data)) {
        return hash.get(data)
    }
  const newData = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach(value => {
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
         hash.set(data,data)
         // 普通对象则递归赋值
         newData[value] = deepCopy(currentDataValue, hash);
      } 
   }); 
  return newData;
}