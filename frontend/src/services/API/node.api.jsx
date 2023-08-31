
import API from "../../services/API/axios";

export function FetchDevices(SET,URL,ID) {
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
export function FetchDevicesById(SET,URL,ID) {
    const fetchNodes = async () => {
        try {
          const res = await API.get(URL);
          console.log(res.data);
          console.log(res.data.devices);
          SET(res.data.devices);
        } catch (error) {
          console.error("Failed to fetch nodes:", error);
        }
      };
      fetchNodes()
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
export function FetchOneChart (SET,URL,data,ID) {
    const fetchOneChart = async () => {
        console.log(URL);
    try {
      const res = await API.get(`${URL}/${ID}/${data}`);
      console.log(`${URL}/${ID}`);
      console.log(res.data);
      SET(res.data.oneChart || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchOneChart()
}