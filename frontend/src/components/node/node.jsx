import React from "react";
import PropTypes from "prop-types";
import style from "./node.module.css";

const Node = (props) => {
  const { name, status, src, handleNodeClick } = props;
  const statusClass = status === "1" ? "online" : "offline";

  return (
    <div className={style.nodecontainer} onClick={handleNodeClick}>
      <div className={style.node}>
        <div className={style.nodeimgcontainer}>
          <img className={style.nodeimg} src={src} alt="Node Icon" />
        </div>
        <div className={style.nodedetails}>
          <div className={style.details}>
            <span>{name}</span>
            <div className={`${style.statusnode} ${statusClass}`}>
              <span>{status === "1" ? "Online" : "Offline"}</span>
            </div>
          </div>
          <div className={style.owner}>{/* Add owner content here */}</div>
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
