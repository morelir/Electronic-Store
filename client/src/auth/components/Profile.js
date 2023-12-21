import React, { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import defaultProfileImage from "../../shared/images/profile_image.jpg";
import "./Profile.css";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { authActions } from "../../shared/store/auth-slice";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/bookings`, "GET", null, {
      Authorization: `Bearer ${auth.token}`,
    }).then((res) => {
      console.log(res.data.data);
      setOrders(res.data.data);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className="profile">
      <header>Profile</header>
      <div className="profile-container">
        <div className="account-details">
          <div className="account-img">
            <img
              src={
                auth.image
                  ? `${process.env.REACT_APP_ASSET_URL}/${auth.image}`
                  : defaultProfileImage
              }
              alt=""
            />
          </div>
          {/* <Input
            element="input"
            id="email"
            type="email"
            label={
              <span>
                E-Mail <span style={{ color: "orange" }}>*</span>
              </span>
            }
            // validators={[VALIDATOR_EMAIL()]}
            // errorText="Please enter a valid email address."
            // onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label={
              <span>
                E-Mail <span style={{ color: "orange" }}>*</span>
              </span>
            }
            // validators={[VALIDATOR_EMAIL()]}
            // errorText="Please enter a valid email address."
            // onInput={inputHandler}
          /> */}
          <p>Name: {auth.name}</p>
          <p>Email: {auth.email}</p>
          <Button onClick={()=>dispatch(authActions.logout())}>Logout</Button>
        </div>
        {error && <p>{error}</p>}
        <div className="orders">
          {orders.map((order, pos) => {
            return (
              <div key={order._id} className="order">
                <h1>Order #{pos}</h1>
                {order.products.map((prod) => {
                  return <div key={prod._id}>{prod.product.title}</div>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
