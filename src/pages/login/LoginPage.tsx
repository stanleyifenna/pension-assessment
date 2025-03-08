import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { SpinnerWhite } from "../../components/common/Spinner";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the auth context
      console.error("Login failed:", err);
    }
  };

  return (
    <div className=" grid-cols-1 h-screen md:flex grid ">
      <div className="mx-auto mb-9 md:mt-[102px] mt-10 rounded-[10px] bg-[#F6F7F9] md:pt-[64px] pt-10 px-10 md:w-[600px] w-full h-[630px]">
        <div>
          <h3 className="text_24 font-medium text-[#000000]">Welcome Back,</h3>
          <p className=" pt-4 text-[#6B6968]">Login Into Your Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-10">
            <label htmlFor="email" className="input_label">Email</label>
            <input
              className="in_put"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full mt-8">
            <label htmlFor="password" className="input_label">Password</label>
            <input
              className="in_put"
              type={show ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShow(!show)}>
              {show ? (
                <span className="absolute cursor-pointer right-[14px] top-[41px] ">
                  <Eye />
                </span>
              ) : (
                <span className="absolute cursor-pointer right-[14px] top-[41px] ">
                  <EyeOff />
                </span>
              )}
            </span>
          </div>
          <div className="input_label pt-6 md:pb-[100px] pb-8">
            <Link
              to="/password/forgot"
              className=" text-[#1F222A] text_14 hover:text-[#F99762]"
            >
              Forgot password?
            </Link>
          </div>

          {error && <div className="text-[red]">{error}</div>}

          <button type="submit" className="submit_btn " disabled={loading}>
            {loading ? <SpinnerWhite /> : "Login"}
          </button>
        </form>

        <p className="mt-5  mb-[0px] text-center text-sm ">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text_16 text-[#2a3948] hover:text-[#F99762]">
              Get Started
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
