import React, { Component } from "react";
import StatsTable from "./StatsTable";
import { connect } from "react-redux";

export class DetailBoard extends Component {
  getData() {
    var data = null;
    if (this.props.showTotalDetails) {
      data = this.props.totalAllStats;
    } else if (this.props.showRecoveredDetails) {
      data = this.props.allRecoveredStats;
    } else if (this.props.showDeathsDetails) {
      data = this.props.allDeathsStats;
    }
    return data;
  }
  render() {
    const showDetailsFlag =
      this.props.showTotalDetails ||
      this.props.showRecoveredDetails ||
      this.props.showDeathsDetails;
    return (
      <div>
        <StatsTable showDetails={showDetailsFlag} data={this.getData()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showTotalDetails: state.stats.showTotalDetails,
  totalAllStats: state.stats.allStats,
  showRecoveredDetails: state.recoveredStats.showRecoveredDetails,
  allRecoveredStats: state.recoveredStats.allRecoveredStats,
  showDeathsDetails: state.deathsStats.showDeathsDetails,
  allDeathsStats: state.deathsStats.allDeathsStats
});

export default connect(mapStateToProps)(DetailBoard);
