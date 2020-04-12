import {
  GET_RECOVERED_STATS,
  GET_RECOVERED_HISTORICAL_STATS,
} from "../actions/types";

const initialState = {
  globalRecoveredStats: [],
  allRecoveredStats: [],
  totalRecoveredCasesReported: 0,
  recoveredHistoricalStats: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECOVERED_STATS:
      return {
        ...state,
        globalRecoveredStats: action.payload.allRecoveredStats,
        allRecoveredStats: action.payload.allRecoveredStats,
        totalRecoveredCasesReported: action.payload.total,
      };
    case GET_RECOVERED_HISTORICAL_STATS:
      return {
        ...state,
        recoveredHistoricalStats: action.payload,
      };
    default:
      return state;
  }
}
