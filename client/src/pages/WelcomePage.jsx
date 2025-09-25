// frontend/src/pages/WelcomePage.jsx
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome 👋</h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/auth/register")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/auth/login")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
