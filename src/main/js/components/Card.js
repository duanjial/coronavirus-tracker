import React, { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div className="card-container row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total</h6>
              <p>
                This card is used to show the total number of cases reported for
                country
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total recovered</h6>
              <p>
                This card is used to show the total number of recovered cases
                reported for country
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country</h5>
              <h6 className="card-subtitle mb-2 text-muted">Total death</h6>
              <p>
                This card is used to show the total number of death cases
                reported for country
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
