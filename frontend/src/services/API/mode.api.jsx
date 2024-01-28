import API from "../../services/API/axios";

export async function SetModeNewStation(SET, URL, ID) {
  const setModenewStation = async () => {
    console.log("setModenewStation");
    console.log(ID);
    try {
      const res = await API.post(`${URL}/${ID}`);
      console.log(`${URL}/${ID}`);
      console.log(res.data);
      // SET(res.data.mode[0]);
    } catch (error) {
      console.error("Failed to fetch sensor:", error);
    }
  };
  await setModenewStation();
}


export function FetchMode (SET,URL,ID) {
  const fetchMode = async () => {
      console.log(URL);
  try {
    const res = await API.get(`${URL}/${ID}`);
    console.log(`${URL}/${ID}`);
    console.log(res.data);
    SET(res.data.mode[0]);
  } catch (error) {
    console.error("Failed to fetch senser:", error);
  }
};
fetchMode()
}

export function SetMode (SET,URL,ID,newLevel,currentLevel) {
  const setMode = async () => {
      console.log(URL);
      console.log(SET,URL,ID);
  try {
    const res = await API.put(`${URL}/${ID}`);
    console.log(`${URL}/${ID}`);
    console.log(res.data);
    SET(res.data.mode[0]);
  } catch (error) {
    console.error("Failed to fetch senser:", error);
  }
};
setMode()
}