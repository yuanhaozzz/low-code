import React, { useEffect, useContext, useRef } from "react";

import "./style.scss";
import { GlobalContext } from "src/global/globalCommon";

import Grid from "./components/Grid";
import RenderComponent from "src/pages/H5/components/Canvas/components/RenderComponent/index";
import CanvasSelectElement from "./components/CanvasSelectElement/index";

function Canvas() {
  const global = useContext(GlobalContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const el = canvasRef.current;
    const { offsetLeft, offsetTop } = el;
    const { width, height } = window.getComputedStyle(el);
    global.setCanvasInfo({
      left: offsetLeft,
      top: offsetTop,
      width: parseInt(width),
      height: parseInt(height),
    });
    console.log(global.getCanvasInfo(), "global");
  }, []);
  return (
    <div className="h5-canvas-wrapper flex-center">
      <div className="h5-canvas-container">
        {/* 顶部 */}
        <div className="h5-canvas-header flex-center">h5模板</div>
        <div className="h5-canvas-draw" ref={canvasRef}>
          {/* 网格 */}
          <Grid />
          {/* 选中元素框 */}
          <CanvasSelectElement />
          {/* 组件 */}
          <RenderComponent />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
