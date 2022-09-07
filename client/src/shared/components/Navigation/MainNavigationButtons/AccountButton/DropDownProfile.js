import React from "react";
import defaultProfileImg from "../../../../images/profile image.jpg";
import "./DropDownProfile.css";

const DropDownProfile = (props) => {
  return (
    props.show && (
      <div className="dropdown">
        <div className="arrow"/>
        <ul>
          <div className="profile">
            {props.image ? (
              <img alt="Profile Picture" src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} />
            ) : (
              <img alt="Profile Picture" src={defaultProfileImg} />
            )}
            <div className="detail">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>Detail:</h3>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Name:</span>
                    </td>
                    <td>
                      <span>
                        <span style={{ color: "#8d99e2" }}>{props.name}</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>E-mail:</span>
                    </td>
                    <td>
                      <span>
                        <span style={{ color: "#8d99e2" }}>{props.email}</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <li>
            <button onClick={props.onLogout}>
              Sign <span>out</span>
            </button>
          </li>
        </ul>
      </div>
    )
  );
};

export default DropDownProfile;
