import {
  GET_DEATHS_STATS,
  GET_DEATHS_HISTORICAL_STATS,
} from "../actions/types";
import axios from "axios";

export const getAllDeathsStats = () => (dispatch) => {
  const url = "http://localhost:8080/allDeathsStats";
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_DEATHS_STATS,
        payload: {
          allDeathsStats: res.data,
          total: res.data
            .map((stat) => stat.latestTotalCases)
            .reduce((sum, cur) => sum + cur, 0),
          countries: [...new Set(res.data.map((row) => row.country))],
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllDeathsHistoricalStats = () => (dispatch) => {
  const url = "http://localhost:8080/allDeathsHistoricalStats";
  axios
    .get(url)
    .then((res) => {
      const formattedData = formatHistoricalData(res.data);
      dispatch({
        type: GET_DEATHS_HISTORICAL_STATS,
        payload: formattedData,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

/* Function to format data */
export const formatHistoricalData = (historicalData) => {
  return historicalData.map((data) => ({
    state: data.state,
    country: data.country,
    hisData: data.dateHeaders.map((header, i) => ({
      date: header,
      number: data.historicalData[i],
    })),
  }));
};
