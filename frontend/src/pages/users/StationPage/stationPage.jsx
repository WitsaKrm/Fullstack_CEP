import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../../components/header/app-header";
import style from "./stationPage.module.css";

import Box from "../../../components/box/box";
import { useParams, useLocation } from "react-router-dom";
import WaterLevel from "../../../components/waterlevel/waterlevel";
import LevelSlide from "../../../components/waterlevel/levelslide";
import Maps from "../../../components/maps/map";

const StationPage = () => {
  const { nodeId } = useParams();
  const history = useHistory();
  const [mode, setMode] = useState();
  const [isAutoVisible, setIsAutoVisible] = useState();
  const [isManualVisible, setIsManualVisible] = useState();

  // Use useLocation to access query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");

  const handleAutoClick = () => {
    setIsAutoVisible(true);
    setIsManualVisible(false);
  };

  const handleManualClick = () => {
    setIsAutoVisible(false);
    setIsManualVisible(true);
  };

  // Define HTML elements as constants
  const autoContent = () => (
    <>
      <h1>AUTO mode</h1>
      <Box
        detail={
          <div>
            <h3>เริ่มต้นทำงานวันที่ 7/9/2566</h3>
            <h3>ลำดับการทำงาน</h3>
            <ul>
              <li>เพิ่มระดับน้ำในนา 5 ซม. เพื่อกำจัดวัชพืชขังนาน 3 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 15 วัน</li>
              <li>
                เมื่อข้าวอยู่ในระยะแตกกอสูงสุด เพิ่มระดับน้ำในนาสูง 5 ซม.
                ขังไว้นาน 3 วัน
              </li>
              <li>รอ 7 วัน</li>
              <li>เพิ่มระดับน้ำในนาจนกระทั่งถึง 10 ซม.</li>
              <li>รอ 20 วัน ปล่อยให้น้ำแห้ง</li>
            </ul>
            <p>*</p>
          </div>
        }
      />
      <div className={style.btt}>
        <div className={`btn btn-primary ${style.btn}`}>เริ่มการทำงาน</div>
        <div className={`btn btn-danger ${style.btn}`}>ยกเลิก</div>
      </div>
    </>
  );

  const manualContent = () => (
    <>
      <h1>MANUAL</h1>
      <Box
        detail={
          <>
            <WaterLevel
              waterLevel
              maxWaterHeight={300}
              date={"9/9/2023"}
            ></WaterLevel>
            <LevelSlide
              level={0}
              // handleSlide={handleSlide}
            ></LevelSlide>
          </>
        }
      ></Box>
    </>
  );
  return (
    <>
      <AppHeader nameHeader="STATION" />
      <Maps lat={lat} lon={lon} title={`STATION ${nodeId}`} detail={""}></Maps>
      <div className="container">
        <div className={style.btt}>
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
              {isAutoVisible ? autoContent() : manualContent()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StationPage;
