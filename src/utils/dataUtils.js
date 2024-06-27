// utils/dataUtils.js
import dayjs from "dayjs";

export const aggregateData = (data, timeframe) => {
  const aggregatedData = [];

  if (timeframe === "daily") {
    return data; // No aggregation needed
  }

  const groupBy = timeframe === "weekly" ? "week" : "month";

  const groupedData = data.reduce((acc, point) => {
    const key = dayjs(point.timestamp).startOf(groupBy).format();
    if (!acc[key]) {
      acc[key] = { timestamp: key, value: 0, count: 0 };
    }
    acc[key].value += point.value;
    acc[key].count += 1;
    return acc;
  }, {});

  for (const key in groupedData) {
    const point = groupedData[key];
    aggregatedData.push({
      timestamp: point.timestamp,
      value: point.value / point.count, // Average value
    });
  }

  return aggregatedData;
};
