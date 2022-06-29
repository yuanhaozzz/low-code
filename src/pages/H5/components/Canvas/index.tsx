import React, { Component } from "react";

import "./style.scss";

import Grid from "../Grid/index";
import RenderComponent from "src/components/RenderComponent/index";

function Canvas() {
  return (
    <div className="h5-canvas-wrapper flex-center">
      <div className="h5-canvas-container">
        {/* 顶部 */}
        <div className="h5-canvas-header flex-center">h5模板</div>
        <div className="h5-canvas-draw">
          {/* 网格 */}
          <Grid />
          <RenderComponent />
        </div>
      </div>
    </div>
  );
}

export default Canvas;
