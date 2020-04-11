import React, { Component } from "react";
import DropDown from "./DropDown";
import LastUpdateDay from "./LastUpdateDate";
import ShowGlobeButton from "./ShowGlobeButton";

export class OptionBar extends Component {
  render() {
    return (
      <div className="row option-bar">
        <div className="col-md-4">
          <DropDown />
        </div>
        <div className="col-md-4">
          <ShowGlobeButton />
        </div>
        <div className="col-md-4">
          <LastUpdateDay />
        </div>
      </div>
    );
  }
}

export default OptionBar;
