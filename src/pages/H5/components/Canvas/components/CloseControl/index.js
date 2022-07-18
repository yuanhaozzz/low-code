import React, { useEffect, Fragment, useContext } from "react";

import { GlobalContext } from "src/global/globalCommon";

function CloseControl() {
  const global = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = global.subscribe("mousedown", (e) => {
      console.log(e);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <Fragment></Fragment>;
}

export default CloseControl;
