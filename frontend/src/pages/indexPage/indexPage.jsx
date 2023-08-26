import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import NodeBox from "../../components/node/node";
import "./indexPage.css";
import AppHeader from "../../components/header/app-header";
import endpoint from "../../services/API/axios";
// Import SVG icons properly based on your file structure
import svg from "../../assets/svg/svg";

const NODES_URL = `/nodes`;

const IndexPage = () => {
  const history = useHistory();
  const [nodes, setNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await endpoint.get(NODES_URL);
        console.log("API Response:", res.data); // Check the response data
        setNodes(res.data.nodes);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch nodes:", error);
        setIsLoading(false);
      }
    };
    
    fetchNodes();
  }, []); // Empty dependency array to run the effect only once

  const handleNodeClick = (userId, type, nodeId) => {
    history.push(`/${type}/${nodeId}`);
  };

  // Render loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <AppHeader nameHeader="ComputerEng PROJECT" />
      <div className="container mt-4">
        <div className="row">
          {nodes.map((node) => (
            <div className="node col-md-3 d-flex justify-content-center" key={node.id}>
              <NodeBox
                name={node.n_name.toUpperCase() + " " + node.unit.toString()}
                // Make sure you have the correct import for SVG icons
                src={node.node_type === "station" ? svg.station.default : svg.node.default}
                status={node.status.toString()}
                handleNodeClick={() => handleNodeClick(node.userId, node.node_type === "station" ? "station" : "senser", node.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
