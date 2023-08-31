import React from "react";
import PropTypes from "prop-types";
import "./node.css";

const Node = (props) => {
  const { name, status, src, handleNodeClick } = props;
  const statusClass = status === "1" ? "online" : "offline";

  return (
    <div className="node-container" onClick={handleNodeClick}>
      <div className="node">
        <div className="node-img-container">
          <img className="node-img" src={src} alt="Node Icon" />
        </div>
        <div className="node-details">
          <div className="details">
            <span>{name}</span>
            <div className={`status-node ${statusClass}`}>
              <span>{status === "1" ? "Online" : "Offline"}</span>
            </div>
          </div>
          <div className="owner">{/* Add owner content here */}</div>
        </div>
      </div>
    </div>
  );
};

Node.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};

export default Node;
