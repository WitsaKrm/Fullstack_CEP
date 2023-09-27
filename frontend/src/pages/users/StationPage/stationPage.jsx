import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppHeader from "../../../components/header/app-header";
import style from "./stationPage.module.css";
import Box from "../../../components/box/box";
import { useParams, useLocation } from "react-router-dom";
import WaterLevel from "../../../components/waterlevel/waterlevel";
import LevelSlide from "../../../components/waterlevel/levelslide";
import Maps from "../../../components/maps/map";
import { FetchMode, SetModeNewStation } from "../../../services/API/mode.api";
import endpoint from "../../../services/API/axios";

const MODE_URL = "/mode";

const StationPage = () => {
  const { nodeId } = useParams();
  const history = useHistory();
  const [modeData, setModeData] = useState([]);
  const [isAutoVisible, setIsAutoVisible] = useState(false);
  const [isManualVisible, setIsManualVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [succ, setSucc] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");

  useEffect(() => {
    async function fetchData() {
      try {
        await SetModeNewStation(setModeData, MODE_URL, `${nodeId}`);
        await FetchMode(setModeData, MODE_URL, `${nodeId}`); // Await this promise
        setIsLoading(false);
        // Update isAutoVisible and isManualVisible based on data
        // if (data.length > 0 && data[0].mode === "MANUAL") {
        //   setIsManualVisible(true);
        //   setIsAutoVisible(false);
        // } else {
        //   setIsAutoVisible(true);
        //   setIsManualVisible(false);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [nodeId]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSlide = async (dataGroup) => {
    try {
      const response = await endpoint.put(
        `${MODE_URL}/${modeData.devices_node_id}`,
        dataGroup
      );
      console.log(response);
      if (response.status === 200) {
        setSucc(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setError("Error updating Mode: " + response.statusText);
      }
    } catch (error) {
      setError("Error updating Mode: " + error.message);
    }
  };
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
  const manualContent = (modeData) => (
    <>
      <h1>MANUAL</h1>
      <div className={style.box_manual}>
        <WaterLevel data={modeData} maxWaterHeight={300}></WaterLevel>
        <LevelSlide data={modeData} handleSlide={handleSlide}></LevelSlide>
      </div>
    </>
  );

  const handleAutoClick = () => {
    setIsAutoVisible(true);
    setIsManualVisible(false);
  };
  const handleManualClick = () => {
    setIsAutoVisible(false);
    setIsManualVisible(true);
  };
  console.log(modeData);
return (
    <>
      <AppHeader nameHeader="STATION" />
      <Maps
        lat={lat}
        lon={lon}
        title={`STATION ${nodeId}`}
        detail={`ตำแหน่งที่ตั้ง ละติจูดที่${lat}, ลองติจูดที่ ${lon}`}
      ></Maps>
      <div className="container">
        <div className={style.btt}>
          <button
            className={`${style.btn} btn btn-dark`}
            onClick={handleAutoClick}
            disabled={modeData.mode === 'MANUAL'}
          >
            auto
          </button>
          <button
            className={`${style.btn} btn btn-warning`}
            onClick={handleManualClick}
            disabled={modeData.mode === 'AUTO'}
          >
            manual
          </button>
        </div>
        <div className="control">
          {isManualVisible&& (
            <div className={style.manual}>{manualContent(modeData)}</div>
          )}
          {isAutoVisible && (
            <div className={style.auto}>{autoContent()}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default StationPage;


