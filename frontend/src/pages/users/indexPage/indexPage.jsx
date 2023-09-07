import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NodeBox from "../../../components/node/node";
import style from "./indexPage.module.css";
import AppHeader from "../../../components/header/app-header";
import { FetchDevicesById } from "../../../services/API/node.api";
import svg from "../../../assets/svg/svg";

const DEVICE_URL = `/devices`;

const IndexPage = () => {
  const history = useHistory();
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await FetchDevicesById(setDevices, DEVICE_URL);
        setIsLoading(false); // Data fetching is complete, set isLoading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Data fetching is complete, even if it failed
      }
    }
    fetchData();
  }, []);

  const handleNodeClick = (userId, type, nodeId) => {
    history.push(`/${type}/${nodeId}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AppHeader nameHeader="ComputerEng PROJECT" />
      <div className="container">
        <div className="col">
          <div className="row">
            {devices.map(
              (station) =>
                // Check if station.type is "station" before rendering the NodeBox component
                station.type === "station" && (
                  <div
                    className="node col-md-3 d-flex"
                    key={station.d_id}
                  >
                    <NodeBox
                      name={station.d_name.toUpperCase()}
                      src={
                        station.type === "station"
                          ? svg.station.default
                          : svg.station.default
                      }
                      status={station.status.toString()}
                      handleNodeClick={() =>
                        handleNodeClick(
                          station.userId,
                          "station",
                          station.d_id
                        )
                      }
                    />
                  </div>
                )
            )}
          </div>
          <div className="row">
            {devices.map(
              (node) =>
                node.type === "node" && (
                  <div
                    className="node col-md-3 d-flex"
                    key={node.d_id}
                  >
                    <NodeBox
                      name={node.d_name.toUpperCase()}
                      src={
                        node.type === "node"
                          ? svg.node.default
                          : svg.station.default
                      }
                      status={node.status.toString()}
                      handleNodeClick={() =>
                        handleNodeClick(
                          node.userId,
                          node.type === "station" ? "station" : "senser",
                          node.d_id
                        )
                      }
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
