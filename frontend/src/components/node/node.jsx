import React from "react";
import PropTypes from "prop-types";
import "./node.css";

const Node = (props) => {
  const { name, status, src, handleNodeClick } = props;
  const statusClass = status === "1" ? "online" : "offline";
  return (
    <button className="node-container" onClick={handleNodeClick}>
      <div className="node">
        <div>
          <img className="node-img" src={src} alt="Node Icon" />
        </div>
        <div className="status-node">
          <span>{name}</span>
          <br />
          <div className={statusClass}>
            <p>{status === "1" ? "Online" : "Offline"}</p>
          </div>
        </div>
        <div className="owner">{/* Add owner content here */}</div>
      </div>
    </button>
  );
};

Node.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};

export default Node;
