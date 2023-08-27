import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SenSersBox from "../../components/sensers/sensers";
import "./senserPage.css";
import svg from "../../assets/svg/svg";
import AppHeader from "../../components/header/app-header";
import { FetchSensers, FetchChart,FetchOneChart } from "../../services/API/node.api";
import Chart from "../../components/chart/chart";

const SS_URL = "/senser";
const CHART_SS_URL = "/chart_ss";

const SensersPage = () => {
  const { nodeId } = useParams();
  const [sensers, setSensers] = useState([]);
  const [chartSensers, setChartSensers] = useState([]);
  const [oneChart, setOneChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        await FetchSensers(setSensers, SS_URL, `${nodeId}`);
        await FetchChart(setChartSensers, CHART_SS_URL, `${nodeId}`);
        // await FetchOneChart(setOneChart, CHART_SS_URL,"air_temp",`${nodeId}`);
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
    FetchOneChart(setOneChart, CHART_SS_URL,`${sensorKey}`,`${nodeId}`);
    setSelectedSensor(sensorKey);
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
    <div className="container">
      <div className="row">
        {mockData.map((data, index) => (
          <div className="col-lg-3 col-md-3 col-sm-6" key={index}>
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
        {selectedSensor ? (
          <Chart data={oneChart} senserKey={selectedSensor} />
        ) : (
          <Chart data={chartSensers} senserKey={selectedSensor} />
        )}
      </div>
    </div>
  </>
);
};

export default SensersPage;
