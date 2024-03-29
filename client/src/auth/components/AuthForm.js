import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MATCH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { authActions } from "../../shared/store/auth-slice";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../shared/images/google.svg";
import "./AuthForm.css";
import { login } from "../../shared/store/auth-actions";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const confPasswordInput = useRef();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
          confPassword: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: true,
          },
          confPassword: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        dispatch(
          login({
            token: responseData.token,
            email: responseData.email,
            name: responseData.name,
            image: responseData.image,
          })
        );
        console.log(responseData);
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        if (formState.inputs.image.value) {
          formData.append("dest", "users");
          formData.append("image", formState.inputs.image.value);
        }
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );
        dispatch(
          login({
            token: responseData.token,
            email: responseData.email,
            name: responseData.name,
            image: responseData.image,
          })
        );
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isLoginMode) {
      return;
    }
    const { confPassword, password } = formState.inputs;

    if (password.value === confPassword.value && !confPassword.isValid) {
      confPasswordInput.current.checkInput();
    } else if (password.value !== confPassword.value && confPassword.isValid) {
      confPasswordInput.current.checkInput();
    }
  }, [formState.inputs.password.value]);

  async function GoogleLoginSuccessHandler(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/login/google",
        "POST",
        JSON.stringify({
          accessToken,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      dispatch(
        login({
          token: responseData.token,
          email: responseData.email,
          name: responseData.name,
          image: responseData.image,
        })
      );
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
    // dispatch(signinGoogle(accessToken, navigate));
  }
  const googleLoginHandler = useGoogleLogin({
    onSuccess: GoogleLoginSuccessHandler,
  });

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="authentication animate slide-up">
        {isLoginMode && (
          <header className="authentication__header">
            Sign <span>in</span>
          </header>
        )}
        {!isLoginMode && (
          <header className="authentication__header">
            Sign <span>up</span>
          </header>
        )}
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label={
                <span>
                  Your Name <span style={{ color: "orange" }}>*</span>
                </span>
              }
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label={
              <span>
                E-Mail <span style={{ color: "orange" }}>*</span>
              </span>
            }
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label={
              <span>
                Password <span style={{ color: "orange" }}>*</span>
              </span>
            }
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              ref={confPasswordInput}
              element="input"
              id="confPassword"
              type="password"
              label={
                <span>
                  Re-enter password <span style={{ color: "orange" }}>*</span>
                </span>
              }
              validators={[VALIDATOR_MATCH(formState.inputs.password.value)]}
              errorText="Passwords must match."
              onInput={inputHandler}
            />
          )}

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
          <div className="or-wrapper">
            <hr className="line" />
            <div>or</div>
            <hr className="line" />
          </div>

          <Button className="google-btn" onClick={googleLoginHandler}>
            <img src={google} alt="" />
            <span>Continue with Google</span>
          </Button>

          {isLoginMode ? (
            <p className="auth-switcher-text">
              Dont have an account?{" "}
              <span onClick={switchModeHandler}>Sign up</span>
            </p>
          ) : (
            <p className="auth-switcher-text">
              Already have an account?{" "}
              <span onClick={switchModeHandler}>Login</span>
            </p>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default AuthForm;
