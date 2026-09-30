import { createBrowserRouter, Navigate } from "react-router-dom";
import RecruiterLayout from "../layouts/RecruiterLayout";
import RecruiterHome from "../pages/RecruiterHome";
import RecruiterProjectList from "../pages/RecruiterProjectList";
import RecruiterProject, { NotFound } from "../pages/RecruiterProject";

const router = createBrowserRouter([{
  element: <RecruiterLayout />,
  children: [
    { path: "/", element: <RecruiterHome /> },
    { path: "/projects", element: <RecruiterProjectList /> },
    { path: "/search", element: <RecruiterProjectList /> },
    { path: "/projects/:slug", element: <RecruiterProject /> },
    { path: "/portfolio/:profileId", element: <Navigate to="/" replace /> },
    { path: "/browse", element: <Navigate to="/" replace /> },
    { path: "/skills", element: <Navigate to="/#skills" replace /> },
    { path: "/experience", element: <Navigate to="/#experience" replace /> },
    { path: "/certs", element: <Navigate to="/#records" replace /> },
    { path: "/contact", element: <Navigate to="/#contact" replace /> },
    { path: "*", element: <NotFound /> },
  ],
}]);
export default router;
