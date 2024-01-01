import { authActions } from "./auth-slice";

let logoutTimer;

export const login = (data) => async (dispatch) => {
  const { token, email, name, image, expirationDate } = data;
  let tokenExpirationDate =
    expirationDate ??
    new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();

  dispatch(
    authActions.login({
      token: token,
      email: email,
      name: name,
      image: image,
      expirationDate: tokenExpirationDate,
    })
  );

  //save user data on local storage and set timeout to logout the user
  clearTimeout(logoutTimer);
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      email,
      name,
      image,
      expirationDate: tokenExpirationDate,
    })
  );
  const remainingTime =
    new Date(tokenExpirationDate).getTime() - new Date().getTime();
  logoutTimer = setTimeout(() => {
    dispatch(logout());
  }, remainingTime);
};

export const getUserAndLogin = () => (dispatch) => {
  try {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      dispatch(
        authActions.login({
          token: storedData.token,
          email: storedData.email,
          name: storedData.name,
          image: storedData.image,
          expirationDate: storedData.tokenExpirationDate,
        })
      );
    }
  } catch (err) {
    // Handle parsing errors or other potential issues
    console.error("Error while retrieving and saving authentication:", err);
  }
};

export const logout = () => (dispatch) => {
  dispatch(authActions.logout());
  localStorage.removeItem("userData");
};
