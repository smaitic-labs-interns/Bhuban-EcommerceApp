import React, { useState, useEffect } from "react";
import { ProfileWrapper, ProfilRightWrapper } from "./styles/profileStyles";
import LeftWrapper from "./Components/LeftWrapper";
import RightWrapper from "./Components/RightWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function index() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigateTologin = () => {
    // navigate("/login");
  };

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    console.log(login);
    if (login.isLogined === false) {
      navigateTologin();
    }
  }, [login]);
  const { firstName, middleName, LastName } = login;
  return (
    <>
      <ProfileWrapper>
        <LeftWrapper name={`${firstName} ${middleName} ${LastName}`} />
        <RightWrapper userDetails={login} />
      </ProfileWrapper>
    </>
  );
}
