import React, { Component, Fragment } from "react";

import RouterConfig from "@/router/config";
import NotFount from "@/pages/NotFount";

import Loading from "@/components/Loading";

import "@/assets/css/base.scss";

class RouteGuard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pathname = window.location.pathname 
    const router = RouterConfig.find((item) => ('/lowcode' + item.path) === pathname);
    document.title = router?.name || "not fount";
    return router ? (
      <Fragment>
        {/* loading */}
        <Loading />
        {/* 渲染组件 */}
        <router.component {...this.props} />
      </Fragment>
    ) : (
      <NotFount />
    );
  }
}

export default RouteGuard;
