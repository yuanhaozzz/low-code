import { lazy } from "react";

const routes = [
  {
    name: "首页",
    path: "/",
    exact: true,
    component: lazy(() => import("src/pages/Home/index.tsx")),
  },
  {
    name: "H5",
    path: "/h5",
    exact: true,
    component: lazy(() => import("src/pages/H5/index.tsx")),
  },
  {
    name: "交互",
    path: "/interact",
    exact: true,
    component: lazy(() => import("src/pages/Interact/index")),
  },
];

export default routes;
