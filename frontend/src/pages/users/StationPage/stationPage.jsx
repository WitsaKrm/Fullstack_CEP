import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../../components/header/app-header";
import style from "./stationPage.module.css";

const StationPage = () => {
  const history = useHistory();
  const [isAutoVisible, setIsAutoVisible] = useState(false);
  const [isManualVisible, setIsManualVisible] = useState(false);

  const handleAutoClick = () => {
    setIsAutoVisible(true);
    setIsManualVisible(false);
  };

  const handleManualClick = () => {
    setIsAutoVisible(false);
    setIsManualVisible(true);
  };

  // Define HTML elements as constants
  const autoContent = <p>ABCD</p>;
  const manualContent = ()=>(
<>
<p key="1">1234</p>
    <h1 key="2">HOME</h1>
    <button key="3">4567</button>
    <button key="4">8910</button>
    </>
)
  return (
    <>
      <AppHeader nameHeader="STATION" />
      <div className="container">
        <div className={style.users_btt}>
          <div
            className={`${style.btn} btn btn-dark`}
            onClick={handleAutoClick}
          >
            auto
          </div>
          <div
            className={`${style.btn} btn btn-warning`}
            onClick={handleManualClick}
          >
            manual
          </div>
        </div>
        <div className="control">
          {(isManualVisible || isAutoVisible) && (
            <div className={isAutoVisible ? style.auto : style.manual}>
              {isAutoVisible ? autoContent : manualContent()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StationPage;
