import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import defaultUserImage from "../../shared/images/default-user.jpg";
import "./Profile.css";
import Button from "../../shared/components/FormElements/Button";
import { displayDate } from "../../shared/util/functions";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { logout } from "../../shared/store/auth-actions";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/bookings`, "GET", null, {
      Authorization: `Bearer ${auth.token}`,
    }).then((res) => {
      setOrders(res.data.data);
    });
  }, [auth.token, sendRequest]);

  const getUserImage = () => {
    if (auth.image) {
      if (auth.image.startsWith("http")) {
        return auth.image;
      }
      return process.env.REACT_APP_ASSET_URL + "/" + auth.image;
    }
    return defaultUserImage;
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className="profile animate slide-up">
      <ErrorModal error={error} onClear={clearError} />
      <header>Profile</header>
      <div className="profile-container">
        <div className="account-details">
          <h1 className="account-header">Account Settings</h1>
          <img src={getUserImage()} alt="" />
          <div className="input-wrapper">
            <label htmlFor="account-name">Name</label>
            <input id="account-name" type="text" disabled value={auth.name} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="account-email">Email</label>
            <input
              id="account-email"
              type="email"
              disabled
              value={auth.email}
            />
          </div>

          <Button
            className="logout-btn"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>

        {orders.length > 0 && (
          <div className="orders">
            {orders.map((order, pos) => {
              return (
                <div key={order._id} className="order">
                  <h1>Order #{pos}</h1>
                  <p className="date">{displayDate(order.createdAt)}</p>
                  {order.products.map((prod, pos) => {
                    return (
                      <div key={prod._id} className="order-details">
                        <img
                          src={
                            process.env.REACT_APP_ASSET_URL +
                            "/" +
                            prod.product.images[0]
                          }
                          alt=""
                        />
                        <p className="order-title">{prod.product.title}</p>
                        <p className="order-price">
                          Price: {prod.product.price} X {prod.amount} ={" "}
                          {prod.product.price * prod.amount}$
                        </p>
                      </div>
                    );
                  })}
                  <h2>Total Order: {order.totalAmount}$</h2>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
