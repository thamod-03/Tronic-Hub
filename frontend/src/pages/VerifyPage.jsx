import { useParams } from "react-router";
import useApp from "../hooks/useApp";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const VerifyPage = () => {
  const { token } = useParams();
  const { navigate } = useApp();
  const { verify } = useAuth();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const success = await verify(token);
        if (success) {
          setStatus("✅ Your account has been verified! Redirecting...");
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 10000);
        } else {
          setStatus("❌ Verification failed.");
        }
      } catch (error) {
        setStatus("❌ Verification failed.");
      }
    };
    verifyUser();
  }, [token]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold text-center">{status}</h2>
        {status.includes("Redirecting") && (
          <p className="text-center text-gray-500">
            You will be redirected in 10 seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
