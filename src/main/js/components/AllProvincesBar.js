import React, { Component } from "react";
import { connect } from "react-redux";
import { getProvinceChart, selectCountry } from "../actions/statsAction";

export class AllProvincesBar extends Component {
  onProvinceButtonClick(country) {
    this.props.getProvinceChart(country);
  }

  onAllButtonClick(country) {
    this.props.selectCountry(country);
  }

  render() {
    const allProvinces = this.props.historicalStatsByCountry.map((stat) => (
      <button
        type="button"
        className="btn btn-info"
        onClick={this.onProvinceButtonClick.bind(this, stat.state)}
      >
        {stat.state}
      </button>
    ));
    return (
      <div className="province-buttons-container">
        <button
          type="button"
          className="btn btn-info"
          onClick={this.onAllButtonClick.bind(this, this.props.country)}
        >
          All Provinces
        </button>
        {allProvinces}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  historicalStatsByCountry: state.stats.historicalStatsByCountry,
  country: state.stats.country,
});

export default connect(mapStateToProps, { getProvinceChart, selectCountry })(
  AllProvincesBar
);
