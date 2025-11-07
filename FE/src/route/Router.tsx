import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import AppLayout from "../layouts/AppLayout";

import ProfileSelect from "../pages/ProfileSelect";
import Portfolio from "../pages/Portfolio";
import Skills from "../pages/Skills";
import ExperienceTimeline from "../pages/ExperienceTimeline";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Contact from "../pages/Contact";
import Certifications from "../pages/Certifications";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/browse", element: <ProfileSelect /> },

  {
    element: <AppLayout />,
    children: [
      { path: "/portfolio/:profileId", element: <Portfolio /> },
      { path: "/skills", element: <Skills /> },
      { path: "/experience", element: <ExperienceTimeline /> },
      { path: "/certs", element: <Certifications /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:slug", element: <ProjectDetail /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
