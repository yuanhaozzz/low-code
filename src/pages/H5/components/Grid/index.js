import React, { useEffect, useRef } from "react";

import "./style.scss";

function Grid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    // canvas.height = "100%";
    // canvas.width = "100%";
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    for (let i = 0; i < width; i += 63) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fafafa";
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 63) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fafafa";
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
  };

  return (
    <canvas
      width="375px"
      height="667px"
      ref={canvasRef}
      className="grid-wrapper"
    ></canvas>
  );
}

export default Grid;
