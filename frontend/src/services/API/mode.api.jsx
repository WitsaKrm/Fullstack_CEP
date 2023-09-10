import API from "../../services/API/axios";

export function FetchMode (SET,URL,data,ID) {
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