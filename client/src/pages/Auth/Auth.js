import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ authenticate }) {
  const navigate = useNavigate();
  const onClick = () => {
    authenticate();
    navigate("/profile");
  };
  return <div></div>;
}
