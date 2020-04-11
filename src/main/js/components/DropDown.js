import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCountry } from "../actions/statsAction";

export class DropDown extends Component {
  render() {
    const countries = this.props.countries.map(country => (
      <button
        className="dropdown-item"
        type="button"
        onClick={this.props.selectCountry.bind(this, country)}
      >
        {country}
      </button>
    ));

    return (
      <div className="dropdown">
        <button
          className="btn btn-info dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select Country
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {countries}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.stats.countries
});

export default connect(
  mapStateToProps,
  { selectCountry }
)(DropDown);
