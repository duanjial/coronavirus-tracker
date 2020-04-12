import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStats } from "../actions/statsAction";
import { getAllRecoveredStats } from "../actions/recoveredStatsAction";
import { getAllDeathsStats } from "../actions/deathsStatsAction";

export class Card extends Component {
  componentDidMount() {
    this.props.getAllStats();
    this.props.getAllRecoveredStats();
    this.props.getAllDeathsStats();
  }

  render() {
    return (
      <div className="card-container row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Globe</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total cases</h6>
              <p>{this.props.totalCasesReported}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Globe</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total recovered</h6>
              <p>{this.props.totalRecoveredCasesReported}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Globe</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total death</h6>
              <p>{this.props.totalDeathsCasesReported}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allStats: state.stats.allStats,
  totalCasesReported: state.stats.totalCasesReported,
  allRecoveredStats: state.recoveredStats.allRecoveredStats,
  totalRecoveredCasesReported: state.recoveredStats.totalRecoveredCasesReported,
  allDeathsStats: state.deathsStats.allDeathsStats,
  totalDeathsCasesReported: state.deathsStats.totalDeathsCasesReported,
});
export default connect(mapStateToProps, {
  getAllStats,
  getAllRecoveredStats,
  getAllDeathsStats,
})(Card);
