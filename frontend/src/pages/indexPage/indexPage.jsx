import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NodeBox from "../../components/node/node";
import "./indexPage.css";
import AppHeader from "../../components/header/app-header";
import { FetchNodes, FetchStations } from "../../services/API/node.api";
import svg from "../../assets/svg/svg"; // Import SVG icons properly based on your file structure

const NODES_URL = `/nodes`;
const STATION_URL = `/station`;

const IndexPage = () => {
  const history = useHistory();
  const [nodes, setNodes] = useState([]);
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await FetchNodes(setNodes,NODES_URL);
        await FetchStations(setStations,STATION_URL);
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
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <>
      <AppHeader nameHeader="ComputerEng PROJECT" />
      <div className="container mt-4">
        <div className="col">
          <div className="row">
            {stations.map((station) => (
              <div
                className="node col-md-3 d-flex justify-content-center"
                key={station.station_id}
              >
                <NodeBox
                  name={station.s_name.toUpperCase()}
                  src={
                    station.type === "station"
                      ? svg.station.default
                      : svg.node.default
                  }
                  status={station.status.toString()}
                  handleNodeClick={() =>
                    handleNodeClick(
                      station.userId,
                      station.type === "station" ? "station" : "senser",
                      station.station_id
                    )
                  }
                />
              </div>
            ))}
          </div>

          <div className="row">
            {nodes.map((node) => (
              <div
                className="node col-md-3 d-flex justify-content-center"
                key={node.node_id}
              >
                <NodeBox
                  name={node.n_name.toUpperCase()}
                  src={
                    node.type === "station"
                      ? svg.station.default
                      : svg.node.default
                  }
                  status={node.status.toString()}
                  handleNodeClick={() =>
                    handleNodeClick(
                      node.userId,
                      node.type === "station" ? "station" : "senser",
                      node.node_id
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
