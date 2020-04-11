import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStats } from "../actions/statsAction";

export class StatsTable extends Component {
  componentDidMount() {
    this.props.getAllStats();
  }

  render() {
    const stats = this.props.allStats.map(stat => (
      <tr className="table-row">
        <td>{stat.state}</td>
        <td>{stat.country}</td>
        <td className="number">{stat.latestTotalCases}</td>
        <td className="number">
          {stat.diffFromPrevDay}
          {stat.diffFromPrevDay > 0 ? (
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          ) : (
            stat.diffFromPrevDay < 0 && (
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            )
          )}
        </td>
      </tr>
    ));

    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Province/State</th>
              <th>Country</th>
              <th>Total cases reported</th>
              <th>Changes since last day</th>
            </tr>
          </thead>
          <tbody>{stats}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allStats: state.stats.allStats
});

export default connect(
  mapStateToProps,
  { getAllStats }
)(StatsTable);
