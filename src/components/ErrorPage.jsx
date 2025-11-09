import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screentext-center px-4 my-20">
      <h3 className="text-4xl font-bold mb-3">404 Not Found</h3>
      <p className="text-gray-500 mb-6 text-lg">Are you lost? Babygirl</p>
      <button
        onClick={() => navigate('/')}
        className="w-1/5 min-w-[150px] bg-amber-700 hover:bg-amber-800 text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
      >
        Home
      </button>
    </div>
  );
};

export default ErrorPage;
