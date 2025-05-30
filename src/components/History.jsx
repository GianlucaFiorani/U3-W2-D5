import { useEffect, useState } from "react";

const History = () => {
  const [h, setH] = useState([]);
  useEffect(() => {
    setH(JSON.parse(localStorage.getItem("history")));
  }, []);
  return <CityList citys={h} historyUpdate={historyUpdate} />;
};
export default History;
