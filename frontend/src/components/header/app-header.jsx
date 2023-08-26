import React, { useState } from "react";
import "./header.css";
import UsersPage from "../../pages/UsersPage/users";

const AppHeader = (props) => {
  return (
    <header className="header-container">
      <div className="header">
        <div className="logo-name">
          <a href="/">{props.nameHeader}</a>
          <a href="/users"> +++ </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
