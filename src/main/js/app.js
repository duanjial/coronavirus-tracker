import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import StatsTable from "./components/StatsTable";
import OptionBar from "./components/OptionBar";
import DetailBoard from "./components/DetailBoard";
import { Provider } from "react-redux";
import store from "./store";

import Chart from "./components/LineChart";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Dashboard />
          <OptionBar />
          <DetailBoard />
          <Chart />
        </div>
      </Provider>
    );
  }
}
