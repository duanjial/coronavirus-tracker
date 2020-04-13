import {
  GET_STATS,
  SELECT_COUNTRY,
  SHOW_GLOBE,
  GET_HISTORICAL_STATS,
  GET_PROVINCE_CHART,
  CHANGE_ON_TOTAL_CLICK_FLAG
} from "../actions/types";

const initialState = {
  globeStats: [],
  allStats: [],
  totalCasesReported: 0,
  countries: [],
  lastUpdatedDate: "",
  isCountrySelected: false,
  country: "",
  historicalStats: [],
  historicalStatsByCountry: [],
  historicalStatsSumByCountry: [],
  showTotalDetails: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        globeStats: action.payload.allStats,
        allStats: action.payload.allStats,
        totalCasesReported: action.payload.total,
        countries: action.payload.countries,
        lastUpdatedDate: action.payload.allStats[0].lastUpdatedDate
      };
    case SELECT_COUNTRY:
      return {
        ...state,
        isCountrySelected: true,
        country: action.payload,
        showTotalDetails: false,
        allStats: state.globeStats.filter(
          stat => stat.country == action.payload
        ),
        historicalStatsByCountry: state.historicalStats.filter(
          stat => stat.country == action.payload
        ),
        historicalStatsSumByCountry: sumByDate(
          state.historicalStats
            .filter(stat => stat.country == action.payload)
            .map(stat =>
              stat.hisData.map(data => ({
                date: data.date,
                number: data.number
              }))
            )
        )
      };
    case GET_PROVINCE_CHART:
      return {
        ...state,
        historicalStatsByCountry: state.historicalStatsByCountry.filter(
          stat => stat.state == action.payload
        )
      };
    case SHOW_GLOBE:
      return {
        ...state,
        allStats: state.globeStats,
        isCountrySelected: false,
        country: "",
        showTotalDetails: false
      };
    case GET_HISTORICAL_STATS:
      return {
        ...state,
        historicalStats: action.payload
      };
    case CHANGE_ON_TOTAL_CLICK_FLAG:
      return {
        ...state,
        showTotalDetails: !state.showTotalDetails
      };
    default:
      return state;
  }
}

export const sumByDate = data => {
  var numberOfDate = data[0].length;
  var numberOfProvinces = data.length;
  var result = new Array();
  var sum = 0;
  for (var i = 0; i < numberOfDate; i++) {
    for (var j = 0; j < numberOfProvinces; j++) {
      sum += data[j][i].number;
    }
    result.push({ date: data[0][i].date, number: sum });
    sum = 0;
  }
  return result;
};
