import React, { Component } from "react";
import { connect } from "react-redux";
import { showGlobe } from "../actions/statsAction";

export class ShowGlobeButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={this.props.showGlobe}
      >
        Show Globe
      </button>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  { showGlobe }
)(ShowGlobeButton);
