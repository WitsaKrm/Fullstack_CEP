import { useEffect } from "react";
import endpoint from "../../services/API/axios";

const APIdataSensers = (setSensers, SS_URL, nodeId) => {
  useEffect(() => {
    const fetchSensers = async () => {
      try {
        const res = await endpoint.get(SS_URL+"/"+nodeId);
        setSensers(res.data.sensers);
      } catch (error) {
        console.error("Failed to fetch sensers:", error);
      }
    };
    fetchSensers();
  }, [setSensers, SS_URL, nodeId]);
};

export default APIdataSensers;