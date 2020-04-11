import {
  GET_STATS,
  SELECT_COUNTRY,
  SHOW_GLOBE,
  GET_HISTORICAL_STATS
} from "../actions/types";
import axios from "axios";

export const getAllStats = () => dispatch => {
  const url = "http://localhost:8080/allStats";
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: GET_STATS,
        payload: {
          allStats: res.data,
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

export const getAllHistoricalStats = () => dispatch => {
  const url = "http://localhost:8080/allHistoricalStats";
  axios
    .get(url)
    .then(res => {
      const formattedData = formatHistoricalData(res.data);
      dispatch({
        type: GET_HISTORICAL_STATS,
        payload: formattedData
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const formatHistoricalData = historicalData => {
  return historicalData.map(data => ({
    state: data.state,
    country: data.country,
    hisData: data.dateHeaders.map((header, i) => ({
      date: header,
      number: data.historicalData[i]
    }))
  }));
};

export const selectCountry = country => dispatch => {
  dispatch({
    type: SELECT_COUNTRY,
    payload: country
  });
};

export const showGlobe = () => dispatch => {
  dispatch({
    type: SHOW_GLOBE
  });
};
