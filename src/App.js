import React, { useState, useEffect } from "react";
import Chart from "./components/Chart";
import TimeframeSelector from "./components/TimeframeSelector";
import "./styles/App.css";

const App = () => {
  const [timeframe, setTimeframe] = useState("daily");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const filterData = () => {
    const now = new Date();
    let filteredData = [];

    if (data.length > 0) {
      if (timeframe === "daily") {
        filteredData = data;
      } else if (timeframe === "weekly") {
        filteredData = data.filter((point) => {
          const pointDate = new Date(point.timestamp);
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return pointDate >= oneWeekAgo;
        });
      } else if (timeframe === "monthly") {
        filteredData = data.filter((point) => {
          const pointDate = new Date(point.timestamp);
          const oneMonthAgo = new Date(
            now.getTime() - 30 * 24 * 60 * 60 * 1000
          );
          return pointDate >= oneMonthAgo;
        });
      }
    }

    return filteredData;
  };

  return (
    <div className="app">
      <TimeframeSelector onSelect={setTimeframe} />
      <Chart data={filterData()} />
    </div>
  );
};

export default App;
