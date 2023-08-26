import React from "react";
import PropTypes from "prop-types";
import "./sensers.css";

  const SenSers = (props) => {
    const { nameEN, nameTH, src, values, date, unit,handleSenserClick } = props;
  
    return (
      <button className="ss-container" onClick={handleSenserClick}>
        <div className="ss-name">
          <span>{nameEN}</span>
          <br />
          <span>{nameTH}</span>
        </div>
        <div className="ss">
          <div className="ss-img-container">
            <img className="ss-img" src={src} alt="Sensor Icon" />
          </div>
          <div className="data-ss">
            <div className="data">
              <h1 className="ss-value">
                {values} {unit}
              </h1>
            </div>
          </div>
        </div>
        <div className="updateTime">
          <p className="update-time-text">อัพเดตเมื่อ: {date}</p>
        </div>
      </button>
    );
  };
  
  SenSers.propTypes = {
    nameEN: PropTypes.string.isRequired,
    nameTH: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    values: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  };
  
  export default SenSers;