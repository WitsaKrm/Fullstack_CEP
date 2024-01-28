// LineNotifyButton.jsx
import React from "react";
import style from "./node.module.css";
import { notifyRegis } from "../../services/API/linenotify";

const LineNotifyButton = (props) => {
  const handleRegisterNotify = async () => {
    console.log('click handleRegisterNotify');
      await notifyRegis();
  };

  return (
    <div className={style.lineNotifyBTN}>
      <button className={`btn btn-success`} onClick={handleRegisterNotify}>
        Register Line Notify
        <img className={style.linelogo} src={props.src} alt="LineNotify" />
      </button>
    </div>
  );
};

export default LineNotifyButton;
