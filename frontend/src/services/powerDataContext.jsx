import api from "../services/api";
import { createContext, useEffect, useState } from "react";
const PowerDataContext = createContext();

const PowerDataProvider = ({ children }) => {
  const [powerData, setPowerData] = useState([]);
  useEffect(() => {
    const fetchPowerData = async () => {
      try {
        const res = await api.get("/powerdata/");
        setPowerData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchPowerData();
  }, []);

  return (
    <PowerDataContext.Provider value={{ powerData }}>
      {children}
    </PowerDataContext.Provider>
  );
};

export { PowerDataContext, PowerDataProvider };
