import { useState } from "react";
import Intro from "./components/Intro";
import ProfileSelect from "./pages/ProfileSelect";

export default function App() {
  const [stage, setStage] = useState<"intro" | "select">("intro");
  return stage === "intro"
  ? <Intro text="PORTFOLIO" onFinish={() => setStage("select")} />
  : <ProfileSelect />;
}
