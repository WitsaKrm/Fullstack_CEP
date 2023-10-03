import React, { useState } from "react";
import style from "./header.module.css";
import UsersPage from "../UsersTable/users";

const AppHeader = (props) => {
  return (
    <header className={style.headercontainer}>
      <div className={style.header}>
        <div className="logo-name">
          <a href="/">{props.nameHeader}</a>
          <a href="/users"> +++ </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
