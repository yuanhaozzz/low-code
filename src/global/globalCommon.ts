import React, { useCallback, useState, useRef, createContext  } from "react";

import { GlobalDeclear } from 'src/constants/type'


import GlobalData from "./index";

export const useForceUpdate = () => {
  const [, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
};

export const useGlobalData = () => {
  const canvasRef = useRef(null);
  if (!canvasRef.current) {
    canvasRef.current = new GlobalData();
  }
  return canvasRef.current;
};

export const GlobalContext = createContext<GlobalDeclear | null>(null);
