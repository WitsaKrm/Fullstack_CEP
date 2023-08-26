import React from "react";
import PropTypes from "prop-types";
import "./sensers.css";

  const SenSers = (props) => {
  
    return (
      <button className="ss-container" onClick={props.handleSenserClick}>
        <div className="ss-name">
          <span>{props.nameEN}</span>
          <br />
          <span>{props.nameTH}</span>
        </div>
        <div className="ss">
          <div className="ss-img-container">
            <img className="ss-img" src={props.src} alt="Sensor Icon" />
          </div>
          <div className="data-ss">
            <div className="data">
              <h1 className="ss-value">
                {props.values} {props.unit}
              </h1>
            </div>
          </div>
        </div>
        <div className="updateTime">
          <p className="update-time-text">อัพเดตเมื่อ: {props.date} , {props.time}</p>
        </div>
      </button>
    );
  };
  
  SenSers.propTypes = {
    nameEN: PropTypes.string.isRequired,
    nameTH: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    values: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    unit: PropTypes.string.isRequired,
  };
  
  export default SenSers;