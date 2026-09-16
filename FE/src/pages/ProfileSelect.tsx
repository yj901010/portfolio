import { Link, useNavigate } from "react-router-dom";
import { profiles } from "../assets/profiles";

export default function ProfileSelect() {
  const navigate = useNavigate();
  return (
    <div className="nf-profile-screen">
      <Link to="/" className="nf-wordmark nf-profile-logo">
        MYFLIX
      </Link>
      <h1>누가 보고 있나요?</h1>
      <div className="nf-profile-list">
        {profiles.map((profile) => (
          <button
            className="nf-profile-choice"
            key={profile.id}
            onClick={() => {
              try {
                localStorage.setItem("profileId", profile.id);
              } catch {
                /* Selection works without browser storage. */
              }
              navigate(`/portfolio/${profile.id}`);
            }}
          >
            <img src="/info/leeyj.jpg" alt="" />
            <span>{profile.name}</span>
            <small>Backend Developer</small>
          </button>
        ))}
      </div>
      <Link className="nf-profile-direct" to="/projects">
        프로젝트 바로 보기
      </Link>
    </div>
  );
}
