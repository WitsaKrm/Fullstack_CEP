import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/header/app-header";

import endpoint from "../../services/API/axios";
const NODES_URL = "/nodes";


const StationPage = () => {

  return (
<>
<AppHeader nameHeader="STATION" />
</>
);
};

export default StationPage;

