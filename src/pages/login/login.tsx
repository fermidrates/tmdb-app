import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export type Error = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameLengthValid, setIsUsernameLengthValid] =
    useState<boolean>(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Error>({
    username: "",
    password: "",
  });

  const checkFormField = () => {
    const MINIMUM_USERNAME_LENGTH: number = 4;
    const MINIMUM_PASSWORD_LENGTH: number = 6;
    username.length >= MINIMUM_USERNAME_LENGTH
      ? setIsUsernameLengthValid(true)
      : setIsUsernameLengthValid(false);
    password.length >= MINIMUM_PASSWORD_LENGTH
      ? setIsPasswordLengthValid(true)
      : setIsPasswordLengthValid(false);
  };

  const checkLoginAttempt = (event: any) => {
    event.preventDefault();
    setErrors({ username: "", password: "" });

    if (
      isUsernameLengthValid &&
      isPasswordLengthValid &&
      username === password
    ) {
      navigate("home");
    } else if (
      isUsernameLengthValid &&
      isPasswordLengthValid &&
      username !== password
    ) {
      setErrors({
        ...errors,
        password: "Wrong username / password combination",
      });
    }
    if (!username) {
      setErrors({ ...errors, username: "Please fill your username" });
    } else if (!isUsernameLengthValid) {
      setErrors({
        ...errors,
        username: "Username must be 4 characters or more",
      });
      setUsername("");
    }

    if (!password) {
      setErrors({ ...errors, password: "Please fill your password" });
    } else if (!isPasswordLengthValid) {
      setErrors({
        ...errors,
        password: "Password must be 6 characters or more",
      });
      setPassword("");
    }
  };

  return (
    <div className="form-container">
      <form id="login-form" onSubmit={(event) => checkLoginAttempt(event)}>
        <div className="form-names">Username</div>
        <input
          type="text"
          placeholder="Your username here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          {errors.username ? (
            <p className="error-msg">{errors.username}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="form-names">Password</div>
        <input
          type="password"
          placeholder="Your password here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {errors.password ? (
            <p className="error-msg">{errors.password}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="button-placement">
          <input
            className="button"
            type="submit"
            value="Login"
            onClick={() => checkFormField()}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
