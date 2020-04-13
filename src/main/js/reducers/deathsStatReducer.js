import {
  GET_DEATHS_STATS,
  GET_DEATHS_HISTORICAL_STATS,
  SELECT_COUNTRY,
  CHANGE_ON_DEATHS_CLICK_FLAG,
  SHOW_GLOBE
} from "../actions/types";

import { sumByDate } from "./statReducer";

const initialState = {
  globalDeathsStats: [],
  allDeathsStats: [],
  totalDeathsCasesReported: 0,
  deathsHistoricalStats: [],
  totalDeathsCasesByCountry: 0,
  deathsCasesByCountryStats: [],
  showDeathsDetails: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEATHS_STATS:
      return {
        ...state,
        globalDeathsStats: action.payload.allDeathsStats,
        allDeathsStats: action.payload.allDeathsStats,
        totalDeathsCasesReported: action.payload.total
      };
    case GET_DEATHS_HISTORICAL_STATS:
      return {
        ...state,
        deathsHistoricalStats: action.payload
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        showDeathsDetails: false,
        allDeathsStats: state.globalDeathsStats.filter(
          stat => stat.country == action.payload
        ),
        deathsCasesByCountryStats: sumByDate(
          state.deathsHistoricalStats
            .filter(stat => stat.country == action.payload)
            .map(stat =>
              stat.hisData.map(data => ({
                date: data.date,
                number: data.number
              }))
            )
        ),
        totalDeathsCasesByCountry: state.allDeathsStats
          .filter(stat => stat.country == action.payload)
          .map(data => data.latestTotalCases)
          .reduce((sum, cur) => sum + cur, 0)
      };
    case SHOW_GLOBE:
      return {
        ...state,
        allDeathsStats: state.globalDeathsStats,
        showDeathsDetails: false
      };
    case CHANGE_ON_DEATHS_CLICK_FLAG:
      return {
        ...state,
        showDeathsDetails: !state.showDeathsDetails
      };
    default:
      return state;
  }
}
