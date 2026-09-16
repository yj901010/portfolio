import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Intro from "./components/Intro";
export default function App() {
  const navigate = useNavigate();
  const finish = useCallback(
    () => navigate("/browse", { replace: true }),
    [navigate],
  );
  return <Intro text="MYFLIX" onFinish={finish} />;
}
