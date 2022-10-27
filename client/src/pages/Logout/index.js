import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function index() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    dispatch(user_logout());
    navigateToLogin();
  }, [login.isLogined]);
  return <div>Logout Page</div>;
}
