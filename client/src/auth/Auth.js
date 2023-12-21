import React from "react";
import AuthForm from "./components/AuthForm";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";

const Auth = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn) {
    return <AuthForm />;
  }
  return <Profile />;
};

export default Auth;
