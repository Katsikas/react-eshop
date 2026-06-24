import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="content">
        <h2>Page Not Found</h2>
        <p>There is nothing here mate!</p>
        <button className="action-btn" onClick={() => navigate("/")}>
          Go to Store
        </button>
      </div>
    </div>
  );
}
