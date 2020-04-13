import {
  GET_RECOVERED_STATS,
  GET_RECOVERED_HISTORICAL_STATS,
  SELECT_COUNTRY,
  CHANGE_ON_RECOVERED_CLICK_FLAG
} from "../actions/types";
import { formatHistoricalData } from "./statsAction";

import axios from "axios";

export const getAllRecoveredStats = () => dispatch => {
  const url = "http://localhost:8080/allRecoveredStats";
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_RECOVERED_STATS,
        payload: {
          allRecoveredStats: res.data,
          total: res.data
            .map(stat => stat.latestTotalCases)
            .reduce((sum, cur) => sum + cur, 0),
          countries: [...new Set(res.data.map(row => row.country))]
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const getAllRecoveredHistoricalStats = () => dispatch => {
  const url = "http://localhost:8080/allRecoveredHistoricalStats";
  axios
    .get(url)
    .then(res => {
      const formattedData = formatHistoricalData(res.data);
      dispatch({
        type: GET_RECOVERED_HISTORICAL_STATS,
        payload: formattedData
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const selectCountry = country => dispatch => {
  dispatch({
    type: SELECT_COUNTRY,
    payload: country
  });
};

export const handleRecoveredOnClick = () => {
  return {
    type: CHANGE_ON_RECOVERED_CLICK_FLAG
  };
};
