import React, { useEffect } from "react";
import camera from "../../assets/camera.svg";
import "./logIn.css";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const Login = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogInForm = (e) => {
    dispatch(setUser({ ...user, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username && user.password) {
      dispatch(login());
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="login-container">
      <div className="heder-container">
        <h1>Join our stock community!</h1>
        <h3>
          Download free photos and videos powered by the best photographers.
        </h3>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group form-login">
            <label htmlFor="username"></label>
            <small id="username" className="form-text">
              USERNAME
            </small>
            <input
              type="text"
              className="form-control"
              name="username"
              aria-label="username"
              placeholder="Enter username here . . ."
              value={user.username}
              required
              onChange={handleLogInForm}
            />
            <label htmlFor="password"></label>
            <small id="password" className="form-text">
              PASSWORD
            </small>
            <input
              type="password"
              className="form-control"
              name="password"
              typeof="password"
              aria-label="password"
              placeholder="Enter password here . . ."
              required
              value={user.password}
              onChange={handleLogInForm}
            />
            <Button type={"submit"} black>
              LOG IN
            </Button>
          </div>
        </form>
      </div>
      <div className="login-bottom"></div>
      <img className="camera-img" src={camera} alt="cameraImg" />
    </div>
  );
};

export default Login;
