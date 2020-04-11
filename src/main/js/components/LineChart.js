import React, { Component } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { connect } from "react-redux";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { getAllHistoricalStats } from "../actions/statsAction";

export class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowAllProvince: false, toggleCheck: false };
    this.handleClick = this.toggleShowALlProvince.bind(this);
  }

  toggleShowALlProvince() {
    this.setState({
      isShowAllProvince: !this.state.isShowAllProvince,
      toggleCheck: !this.state.toggleCheck,
    });
  }

  componentDidMount() {
    this.props.getAllHistoricalStats();
  }

  componentDidUpdate(prevProps) {
    if (this.props.country != prevProps.country) {
      this.setState({ isShowAllProvince: false, toggleCheck: false });
    }
  }

  render() {
    const { isShowAllProvince } = this.state;

    const showAllProvince =
      isShowAllProvince &&
      this.props.historicalStatsByCountry.length > 1 &&
      this.props.historicalStatsByCountry.map((stat) => (
        <div className="province-container">
          <h4 className="province-header">{stat.state}</h4>
          <div className="chart">
            <LineChart
              width={800}
              height={300}
              data={stat.hisData}
              margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
            >
              <Line type="monotone" dataKey="number" stroke="#8884d8" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>
      ));

    return (
      this.props.isCountrySelected && (
        <div className="line-chart">
          <div className="chart-header row">
            <h3 className="col-md-8">
              Historical data graph for: {this.props.country}{" "}
            </h3>
            <div className="col-md-4">
              <ToggleSwitch
                onClick={this.handleClick}
                checked={this.state.toggleCheck}
              />
            </div>
          </div>
          <div className="chart">
            <LineChart
              width={800}
              height={300}
              data={this.props.historicalStatsSumByCountry}
              margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
            >
              <Line
                type="monotone"
                dataKey="number"
                stroke="#8884d8"
                dot={false}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
          {showAllProvince}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  country: state.stats.country,
  isCountrySelected: state.stats.isCountrySelected,
  historicalStatsByCountry: state.stats.historicalStatsByCountry,
  historicalStatsSumByCountry: state.stats.historicalStatsSumByCountry,
});

export default connect(mapStateToProps, { getAllHistoricalStats })(Chart);
