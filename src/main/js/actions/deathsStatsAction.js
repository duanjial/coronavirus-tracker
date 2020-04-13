import {
  GET_DEATHS_STATS,
  GET_DEATHS_HISTORICAL_STATS,
  SELECT_COUNTRY,
  CHANGE_ON_DEATHS_CLICK_FLAG
} from "../actions/types";
import axios from "axios";
import { formatHistoricalData } from "./statsAction";

export const getAllDeathsStats = () => dispatch => {
  const url = "http://localhost:8080/allDeathsStats";
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_DEATHS_STATS,
        payload: {
          allDeathsStats: res.data,
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

export const getAllDeathsHistoricalStats = () => dispatch => {
  const url = "http://localhost:8080/allDeathsHistoricalStats";
  axios
    .get(url)
    .then(res => {
      const formattedData = formatHistoricalData(res.data);
      dispatch({
        type: GET_DEATHS_HISTORICAL_STATS,
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

export const handleDeathsOnClick = () => {
  return {
    type: CHANGE_ON_DEATHS_CLICK_FLAG
  };
};
