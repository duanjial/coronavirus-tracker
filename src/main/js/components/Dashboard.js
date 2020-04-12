import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Card from "./Card";

export class Dashboard extends Component {
  render() {
    const totalReportedCases = this.props.totalCasesReported;
    return (
      <div>
        <Header />
        <div className="jumbotron row">
          <div className="col-md-8">
            <h1 className="display-4">{totalReportedCases}</h1>
            <p className="lead">
              Total cases reported as of {this.props.lastUpdatedDate}
            </p>
          </div>
          {this.props.isCountrySelected && (
            <div className="col-md-4">
              <h2>{this.props.country}</h2>
              <p>
                Total cases reported:{" "}
                {this.props.allStats
                  .map(stat => stat.latestTotalCases)
                  .reduce((sum, cur) => sum + cur, 0)}
              </p>
              <p>
                Total cases changed since last day:{" "}
                {this.props.allStats
                  .map(stat => stat.diffFromPrevDay)
                  .reduce((sum, cur) => sum + cur, 0)}
              </p>
            </div>
          )}
        </div>
        <Card />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalCasesReported: state.stats.totalCasesReported,
  lastUpdatedDate: state.stats.lastUpdatedDate,
  isCountrySelected: state.stats.isCountrySelected,
  country: state.stats.country,
  allStats: state.stats.allStats
});
export default connect(mapStateToProps)(Dashboard);
