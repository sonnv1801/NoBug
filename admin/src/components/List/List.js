import React from "react";
import { Link } from "react-router-dom";

import "./List.css";

export const List = (props) => {
  return (
    <tr>
      <th>
        <img src={props.image} alt={props.title} className="list-img" />
      </th>
      <td className="list-category">{props.category}</td>
      <td>{props.title}</td>
      <td>{props.price}đ</td>
      <td>{props.type}</td>
      <td>
        <div className="row">
          <div className="col-xl-4">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={props.button}
            >
              Delete
            </button>
          </div>
          <div className="col-xl-6">
            <Link
              to={`/pet/${props.petEdit}`}
              type="submit"
              className="btn btn-danger"
            >
              Edit
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};
