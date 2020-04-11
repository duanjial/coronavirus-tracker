import React, { Component } from "react";

export class ToggleSwitch extends Component {
  render() {
    return (
      <div>
        <label className="left-toggle-label">Hide Provinces</label>
        <label className="switch">
          <input
            type="checkbox"
            onClick={this.props.onClick}
            checked={this.props.checked}
          />
          <span className="slider round"></span>
        </label>
        <label className="right-toggle-label">Show Provinces</label>
      </div>
    );
  }
}

export default ToggleSwitch;
