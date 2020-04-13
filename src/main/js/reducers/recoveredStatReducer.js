import {
  GET_RECOVERED_STATS,
  GET_RECOVERED_HISTORICAL_STATS,
  SELECT_COUNTRY,
  CHANGE_ON_RECOVERED_CLICK_FLAG
} from "../actions/types";

import { sumByDate } from "./statReducer";

const initialState = {
  globalRecoveredStats: [],
  allRecoveredStats: [],
  totalRecoveredCasesReported: 0,
  recoveredHistoricalStats: [],
  totalRecoveredCasesByCountry: 0,
  recoveredCasesByCountryStats: [],
  showRecoveredDetails: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECOVERED_STATS:
      return {
        ...state,
        globalRecoveredStats: action.payload.allRecoveredStats,
        allRecoveredStats: action.payload.allRecoveredStats,
        totalRecoveredCasesReported: action.payload.total
      };
    case GET_RECOVERED_HISTORICAL_STATS:
      return {
        ...state,
        recoveredHistoricalStats: action.payload
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        showRecoveredDetailes: false,
        allRecoveredStats: state.globalRecoveredStats.filter(
          stat => stat.country == action.payload
        ),
        recoveredCasesByCountryStats: sumByDate(
          state.recoveredHistoricalStats
            .filter(stat => stat.country == action.payload)
            .map(stat =>
              stat.hisData.map(data => ({
                date: data.date,
                number: data.number
              }))
            )
        ),
        totalRecoveredCasesByCountry: state.allRecoveredStats
          .filter(stat => stat.country == action.payload)
          .map(data => data.latestTotalCases)
          .reduce((sum, cur) => sum + cur, 0)
      };
    case CHANGE_ON_RECOVERED_CLICK_FLAG:
      return {
        ...state,
        showRecoveredDetails: !state.showRecoveredDetails
      };
    default:
      return state;
  }
}
