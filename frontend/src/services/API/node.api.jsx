
import API from "../../services/API/axios";

export function FetchNodes(SET,URL,ID) {
    const fetchNodes = async () => {
        try {
          const res = await API.get(URL);
          console.log(res.data.nodes);
          SET(res.data.nodes);
        } catch (error) {
          console.error("Failed to fetch nodes:", error);
        }
      };
      fetchNodes()
}

export function FetchStations(SET,URL,ID) {
    const fetchStations = async () => {
        try {
          const res = await API.get(URL);
          SET(res.data.stations);
        } catch (error) {
          console.error("Failed to fetch stations:", error);
        }
      }; 
      fetchStations()  
}

export function FetchSensers (SET,URL,ID) {
    const fetchSensers = async () => {
    try {
      const res = await API.get(`${URL}/${ID}`);
      console.log(res.data);
      SET(res.data.senser || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchSensers()
}
export function FetchChart (SET,URL,ID) {
    const fetchChart = async () => {
        console.log(URL);
    try {
      const res = await API.get(`${URL}/${ID}`);
      console.log(`${URL}/${ID}`);
      console.log(res.data);
      SET(res.data.chart || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchChart()
}