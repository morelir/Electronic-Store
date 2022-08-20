import React from "react";

import "./ProductOverview.css";

const ProductOverview = (props) => {
  return (
    <table className="overview table">
      <tbody>
        {props.overview.map((item,pos) => {
          return (
            <tr key={pos}>
              <td>
                <span className="size-base text-bold">
                  {item[0]}
                </span>
              </td>
              <td>
                <span className="size-base">{item[1]}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductOverview;
