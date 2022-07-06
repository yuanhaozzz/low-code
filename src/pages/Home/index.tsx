import React, { Component, useState } from "react";
import { RouteComponentProps } from 'react-router-dom';

import "./style.scss";

interface IProps{
  history: RouteComponentProps["history"];
  location: RouteComponentProps['location'];
  match: RouteComponentProps['match'];
}

const Home: React.FC<IProps> = (props) =>{
  const { history } = props;
  const jumpToPage = (page) => {
    history.push(page);
  };

  return (
    <div className="home-wrapper">
      
      <div className="home-entry">
        <h2>请选择模板</h2>
        <div className="flex-space-between">
          <h1 onClick={() => jumpToPage("h5")}>h5</h1>
          <h1 onClick={() => jumpToPage("interact")}>交互</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
