import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3">
            <i className={props.icon} id="icon-card"></i>
          </div>
          <div className="col-xl-9">
            <b className="card-title">{props.title}</b>
            <i>{props.amount}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
