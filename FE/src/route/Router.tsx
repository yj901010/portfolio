import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProfileSelect from "../pages/ProfileSelect";
import Portfolio from "../pages/Portfolio.tsx";
import Skills from "../pages/Skills";
import ExperiencePlay from "../pages/ExperiencePlay";
import ExperienceMore from "../pages/ExperienceMore";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/browse", element: <ProfileSelect /> },
  { path: "/portfolio/:profileId", element: <Portfolio /> },
  { path: "/skills", element: <Skills /> },
  { path: "/experience", element: <ExperiencePlay /> },
  { path: "/experience/all", element: <ExperienceMore /> },

  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
