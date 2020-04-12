import { combineReducers } from "redux";
import statReducer from "./statReducer";
import recoveredStatReducer from "./recoveredStatReducer";
import deathsStatReducer from "./deathsStatReducer";

export default combineReducers({
  stats: statReducer,
  recoveredStats: recoveredStatReducer,
  deathsStats: deathsStatReducer,
});
