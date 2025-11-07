import React from "react";
import { useNavigate } from "react-router-dom";
import Intro from "./components/Intro";

export default function App() {
  const navigate = useNavigate();

  return (
    <Intro
      text="PORTFOLIO"
      onFinish={() => navigate("/browse", { replace: true })}
    />
  );
}
