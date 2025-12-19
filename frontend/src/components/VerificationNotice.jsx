import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const VerificationNotice = ({ email }) => {
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");
  const { sendVerify } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setCanResend(true), 2 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleResend = async () => {
    try {
      setCanResend(false);
      const success = await sendVerify(email);
      if (success) {
        setMessage("✅ Verification email resent successfully!");
      } else {
        setMessage("❌ Failed to resend verification email.");
      }
    } catch (error) {
      setMessage("❌ Error resending verification email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Check your email</h2>
        <p className="mb-6">
          We've sent a verification link to <strong>{email}</strong>. Please
          click the link to verify your account.
        </p>

        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`w-full py-2 rounded text-white ${
            canResend
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Resend Verification Link
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default VerificationNotice;
