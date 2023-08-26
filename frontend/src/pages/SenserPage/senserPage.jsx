import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SenSersBox from "../../components/sensers/sensers";
import "./senserPage.css";
import AppHeader from "../../components/header/app-header";
import svg from "../../assets/svg/svg";
import Chart from "../../components/chart/chart";

import endpoint from "../../services/API/axios";
const SS_URL = "/senser";
const CHART_SS_URL = "/chart_ss"

const SensersPage = () => {
  const { nodeId } = useParams();
  const [senser, setSenser] = useState([]);
  const [chartSenser, setChartSenser] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [selectedSensor, setSelectedSensor] = useState(null); // Track selected sensor

  useEffect(() => {
    const fetchSensers = async () => {
      try {
        const res = await endpoint.get(`${SS_URL}/${nodeId}`);
        console.log(res.data.senser);
        setSenser(res.data.senser || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch senser:", error);
        setIsLoading(false);
      }
    };
    const fetchDataSensers = async () => {
      try {
        const res = await endpoint.get(`${CHART_SS_URL}/${nodeId}`);
        console.log(`${CHART_SS_URL}/${nodeId}`);
        console.log(res.data.chart);
        setChartSenser(res.data.chart || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch senser:", error);
        setIsLoading(false);
      }
    };
    fetchSensers()
    fetchDataSensers()
  }, [nodeId]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const mockData = [
    {
      nameTH: "อุณหภูมิ",
      nameEN: "Temperature",
      svg: svg.air_temp.default,
      key: "air_temp",
      dateKey: "date",
      unit: "°C"
    },
    {
      nameTH: "ความชื้นอากาศ",
      nameEN: "Air Humidity",
      svg: svg.air_humi.default,
      key: "air_humi",
      dateKey: "date",
      unit: "%"
    },
    {
      nameTH: "ความชื้นในดิน",
      nameEN: "Soil Moisture",
      svg: svg.soil_mois.default,
      key: "soil_mois", 
      dateKey: "date",
      unit: "%"
    },
    {
      nameTH: "ค่าแสง",
      nameEN: "Light",
      svg: svg.light.default,
      key: "light",
      dateKey: "date",
      unit: "lux"
    }
  ];
  const handleSenserClick = (sensorKey) => {
    setSelectedSensor(sensorKey);
    console.log(sensorKey);
  };
  return (
<>
<AppHeader />
<div className="row">
  {mockData.map((data, index) => (
    <div className="ss col-md-3" key={index}>
      <SenSersBox
        key={index}
        nameEN={data.nameEN}
        nameTH={data.nameTH}
        src={data.svg}
        values={senser.map(sensor => sensor[data.key])}
        date={new Date(senser[0][data.dateKey]).toLocaleString()}
        unit={data.unit}
        handleSenserClick={() => handleSenserClick(data.key)}
        />
    </div>
  ))}
</div>
<div className="chart-container">
  {selectedSensor && (
    <Chart data={chartSenser} sensorKey={selectedSensor} />
  )}
</div>
</>
);
};

export default SensersPage;

