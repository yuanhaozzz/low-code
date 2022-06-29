import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component, Suspense } from "react";

import { Provider } from "react-redux";
import Store from "@/store";
import RouteGuard from "./RouteGuard";

class Entry extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Suspense fallback={<div>{/* loading */}</div>}>
            <Switch>
              <Route path="*" render={(props) => <RouteGuard {...props} />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Entry;
