import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SenSersBox from "../../../components/sensers/sensers";
import style from "./senserPage.module.css";
import svg from "../../../assets/svg/svg";
import AppHeader from "../../../components/header/app-header";
import { FetchSensers, FetchChart, FetchOneChart } from "../../../services/API/node.api";
import Chart from "../../../components/chart/chart";
import Maps from "../../../components/maps/map";

const SS_URL = "/senser";
const CHART_SS_URL = "/chart_ss";

const SensersPage = () => {
  const { nodeId } = useParams();
  const [sensers, setSensers] = useState([]);
  const [chartSensers, setChartSensers] = useState([]);
  const [oneChart, setOneChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState();
  const [showAllChart, setShowAllChart] = useState(false); // State to track "All" button click

  // Use useLocation to access query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");

  useEffect(() => {
    async function fetchData() {
      try {
        await FetchSensers(setSensers, SS_URL, `${nodeId}`);
        await FetchChart(setChartSensers, CHART_SS_URL, `${nodeId}`);
        setIsLoading(false);
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

  const handleSenserClick = (sensorKey) => {
    FetchOneChart(setOneChart, CHART_SS_URL, `${sensorKey}`, `${nodeId}`);
    setSelectedSensor(sensorKey);
    setShowAllChart(false); // Reset to show individual chart when a sensor is clicked
    console.log(sensorKey);
  };

  const mockData = [
    {
      nameTH: "อุณหภูมิ",
      nameEN: "Temperature",
      svg: svg.air_temp.default,
      key: "air_temp",
      date: "date",
      time: "time",
      unit: "°C",
    },
    {
      nameTH: "ความชื้นอากาศ",
      nameEN: "Air Humidity",
      svg: svg.air_humi.default,
      key: "air_humi",
      date: "date",
      time: "time",
      unit: "%",
    },
    {
      nameTH: "ความชื้นในดิน",
      nameEN: "Soil Moisture",
      svg: svg.soil_mois.default,
      key: "soil_mois",
      date: "date",
      time: "time",
      unit: "%",
    },
    {
      nameTH: "ค่าแสง",
      nameEN: "Light",
      svg: svg.light.default,
      key: "light",
      date: "date",
      time: "time",
      unit: "lux",
    },
  ];

  return (
    <>
      <AppHeader nameHeader={`NODE Sensers`} />
      <div className={`container-fluid ${style.sensersPageContainer}`}>
        <Maps lat={lat} lon={lon} title={`NODE ${nodeId}`} detail={sensers}></Maps>
        <div className="row">
          {mockData.map((data, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
              <SenSersBox
                nameEN={data.nameEN}
                nameTH={data.nameTH}
                src={data.svg}
                values={sensers.map((value) => value[data.key])}
                date={sensers.map((date) => date[data.date])}
                time={sensers.map((time) => time[data.time])}
                unit={data.unit}
                handleSenserClick={() => handleSenserClick(data.key)}
              />
            </div>
          ))}
        </div>
        <div className="chart-container">
          <div className="btn btn-primary" onClick={() => setShowAllChart(true)}>
            All
          </div>
          {showAllChart ? (
            <Chart data={chartSensers} senserKey={selectedSensor} />
          ) : (
            selectedSensor ? (
              <Chart data={oneChart} senserKey={selectedSensor} />
            ) : (
              <Chart data={chartSensers} senserKey={selectedSensor} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SensersPage;
