import {
  GET_RECOVERED_STATS,
  GET_RECOVERED_HISTORICAL_STATS,
} from "../actions/types";
import axios from "axios";

export const getAllRecoveredStats = () => (dispatch) => {
  const url = "http://localhost:8080/allRecoveredStats";
  axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GET_RECOVERED_STATS,
        payload: {
          allRecoveredStats: res.data,
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

export const getAllRecoveredHistoricalStats = () => (dispatch) => {
  const url = "http://localhost:8080/allRecoveredHistoricalStats";
  axios
    .get(url)
    .then((res) => {
      const formattedData = formatHistoricalData(res.data);
      dispatch({
        type: GET_RECOVERED_HISTORICAL_STATS,
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
