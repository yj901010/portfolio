import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProfileSelect from "../pages/ProfileSelect";
import Portfolio from "../pages/Portfolio.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/browse", element: <ProfileSelect /> },
  { path: "/portfolio/:profileId", element: <Portfolio /> },

  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
