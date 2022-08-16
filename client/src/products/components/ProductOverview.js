import React from "react";

import "./ProductOverview.css"

const ProductOverview = () => {
  return (
    <table className="overview table">
      <tbody>
        <tr>
          <td >
            <span className="size-base text-bold">
              Brand
            </span>
          </td>
          <td>
            <span className="size-base" >Acer</span>
          </td>
        </tr>

        <tr>
          <td>
            <span className="size-base text-bold">Series</span>
          </td>
          <td>
            <span className="size-base">AN515-55-53E5</span>
          </td>
        </tr>

        
      </tbody>
    </table>
  );
};

export default ProductOverview;
