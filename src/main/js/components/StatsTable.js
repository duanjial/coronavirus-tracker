import React, { Component } from "react";
import { connect } from "react-redux";

export class StatsTable extends Component {
  render() {
    const stats =
      this.props.data &&
      this.props.data.map(stat => (
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
      this.props.showDetails && (
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
      )
    );
  }
}

const mapStateToProps = state => ({
  allStats: state.stats.allStats,
  showTotalDetails: state.stats.showTotalDetails
});

export default connect(mapStateToProps)(StatsTable);
