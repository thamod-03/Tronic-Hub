
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const {requestReset} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await requestReset(email);
    if (success) {
      setCooldown(120);
    } 
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={cooldown > 0}
            className={`w-full py-2 rounded text-white ${
              cooldown > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none"
            }`}
          >
            {cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage