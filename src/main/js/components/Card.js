import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStats, handleTotalOnClick } from "../actions/statsAction";
import {
  getAllRecoveredStats,
  getAllRecoveredHistoricalStats,
  handleRecoveredOnClick
} from "../actions/recoveredStatsAction";
import {
  getAllDeathsStats,
  getAllDeathsHistoricalStats,
  handleDeathsOnClick
} from "../actions/deathsStatsAction";

export class Card extends Component {
  componentDidMount() {
    this.props.getAllStats();
    this.props.getAllRecoveredStats();
    this.props.getAllRecoveredHistoricalStats();
    this.props.getAllDeathsStats();
    this.props.getAllDeathsHistoricalStats();
  }

  handleTotalOnClick() {
    this.props.handleTotalOnClick();
    if (this.props.showDeathsDetails) {
      this.props.handleDeathsOnClick();
    }
    if (this.props.showRecoveredDetails) {
      this.props.handleRecoveredOnClick();
    }
  }

  handleRecoveredOnClick() {
    this.props.handleRecoveredOnClick();
    if (this.props.showTotalDetails) {
      this.props.handleTotalOnClick();
    }
    if (this.props.showDeathsDetails) {
      this.props.handleDeathsOnClick();
    }
  }

  handleDeathsOnClick() {
    this.props.handleDeathsOnClick();
    if (this.props.showTotalDetails) {
      this.props.handleTotalOnClick();
    }
    if (this.props.showRecoveredDetails) {
      this.props.handleRecoveredOnClick();
    }
  }

  render() {
    const totalCasesByCountry = this.props.allStats
      .map(stat => stat.latestTotalCases)
      .reduce((sum, cur) => sum + cur, 0);
    const totalCases = this.props.isCountrySelected
      ? totalCasesByCountry
      : this.props.totalCasesReported;
    const totalRecovered = this.props.isCountrySelected
      ? this.props.totalRecoveredCasesByCountry
      : this.props.totalRecoveredCasesReported;
    const totalDeaths = this.props.isCountrySelected
      ? this.props.totalDeathsCasesByCountry
      : this.props.totalDeathsCasesReported;

    const title = this.props.isCountrySelected ? this.props.country : "Globe";
    return (
      <div className="card-container row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total cases</h6>
              <p>{totalCases}</p>
              <a
                href="#"
                className="stretched-link"
                onClick={this.handleTotalOnClick.bind(this)}
              ></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total recovered</h6>
              <p>{totalRecovered}</p>
              <a
                href="#"
                className="stretched-link"
                onClick={this.handleRecoveredOnClick.bind(this)}
              ></a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total death</h6>
              <p>{totalDeaths}</p>
              <a
                href="#"
                className="stretched-link"
                onClick={this.handleDeathsOnClick.bind(this)}
              ></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allStats: state.stats.allStats,
  country: state.stats.country,
  isCountrySelected: state.stats.isCountrySelected,
  totalCasesReported: state.stats.totalCasesReported,
  allRecoveredStats: state.recoveredStats.allRecoveredStats,
  totalRecoveredCasesReported: state.recoveredStats.totalRecoveredCasesReported,
  totalRecoveredCasesByCountry:
    state.recoveredStats.totalRecoveredCasesByCountry,
  allDeathsStats: state.deathsStats.allDeathsStats,
  totalDeathsCasesReported: state.deathsStats.totalDeathsCasesReported,
  totalDeathsCasesByCountry: state.deathsStats.totalDeathsCasesByCountry,
  showTotalDetails: state.stats.showTotalDetails,
  showRecoveredDetails: state.recoveredStats.showRecoveredDetails,
  showDeathsDetails: state.deathsStats.showDeathsDetails
});

export default connect(
  mapStateToProps,
  {
    getAllStats,
    getAllRecoveredStats,
    getAllRecoveredHistoricalStats,
    getAllDeathsStats,
    getAllDeathsHistoricalStats,
    handleTotalOnClick,
    handleDeathsOnClick,
    handleRecoveredOnClick
  }
)(Card);
