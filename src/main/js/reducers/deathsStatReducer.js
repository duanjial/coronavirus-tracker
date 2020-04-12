import {
  GET_DEATHS_STATS,
  GET_DEATHS_HISTORICAL_STATS,
} from "../actions/types";

const initialState = {
  globalDeathsStats: [],
  allDeathsStats: [],
  totalDeathsCasesReported: 0,
  deathsHistoricalStats: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEATHS_STATS:
      return {
        ...state,
        globalDeathsStats: action.payload.allDeathsStats,
        allDeathsStats: action.payload.allDeathsStats,
        totalDeathsCasesReported: action.payload.total,
      };
    case GET_DEATHS_HISTORICAL_STATS:
      return {
        ...state,
        deathsHistoricalStats: action.payload,
      };
    default:
      return state;
  }
}
