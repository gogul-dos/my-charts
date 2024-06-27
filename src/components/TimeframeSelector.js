import React from "react";

const TimeframeSelector = ({ onSelect }) => {
  return (
    <div className="timeframe-selector">
      <button onClick={() => onSelect("daily")}>Daily</button>
      <button onClick={() => onSelect("weekly")}>Weekly</button>
      <button onClick={() => onSelect("monthly")}>Monthly</button>
    </div>
  );
};

export default TimeframeSelector;
