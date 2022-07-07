import React, { useEffect, useContext, useRef } from "react";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

import Grid from "./components/Grid";
import RenderComponent from "src/pages/H5/components/Canvas/components/RenderComponent/index";

function Canvas() {
  const global = useContext(GlobalContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const { offsetLeft, offsetTop } = canvasRef.current;
    global.setCanvasOffset({
      left: offsetLeft,
      top: offsetTop,
    });
  }, []);
  return (
    <div className="h5-canvas-wrapper flex-center">
      <div className="h5-canvas-container">
        {/* 顶部 */}
        <div className="h5-canvas-header flex-center">h5模板</div>
        <div className="h5-canvas-draw" ref={canvasRef}>
          {/* 网格 */}
          <Grid />
          <RenderComponent />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
