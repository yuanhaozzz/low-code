import React, { Component, useEffect, useState, useContext } from "react";
import { GlobalContext } from "src/global/globalCommon";

function Text(props) {
  const global = useContext(GlobalContext);
  const { componentKey } = props;

  console.log(componentKey);

  const data = global.find(componentKey);

  const { style, key } = data;

  const [, update] = useState(0);

  useEffect(() => {
    const unsubscribe = global.subscribe(data.key, () => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const forceUpdate = () => {
    update((prev) => prev + 1);
  };

  return (
    <div className="common-text-wrapper" style={style} data-key={key}>
      我是text
    </div>
  );
}
Text.type = "1";
export default Text;
