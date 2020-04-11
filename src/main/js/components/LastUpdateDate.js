import React, { Component } from "react";
import { connect } from "react-redux";

export class LastUpdateDate extends Component {
  render() {
    const date = new Date();
    return (
      <span className="date-info">
        Last Updated: {this.props.lastUpdatedDate}
      </span>
    );
  }
}

const mapStateToProps = state => ({
  lastUpdatedDate: state.stats.lastUpdatedDate
});

export default connect(mapStateToProps)(LastUpdateDate);
