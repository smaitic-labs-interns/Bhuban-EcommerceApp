import React from "react";
import { ProfileWrapper } from "./styles/profileStyles";
import LeftWrapper from "./Components/LeftWrapper";
import RightWrapper from "./Components/RightWrapper";
import { useSelector } from "react-redux";

export default function Profile() {
  const login = useSelector((state) => state.login);

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
