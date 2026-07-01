import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useUserStore } from "../../store/Auth/User.js"; 
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const { signInUser } = useUserStore();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signInUser(loginData);

   if (result.success) {
    toast.success("Login Successful");

    if (result.user.role === "admin") {
        navigate("/admindashboard");
    } else {
        navigate("/");
    }
    } else {
    toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-[url('/images/b10.png')] bg-cover bg-center opacity-20"></div>

      <div className="relative bg-zinc-900/90 backdrop-blur-lg w-full max-w-md rounded-3xl p-10 border border-zinc-800 shadow-2xl">

        <Link
          to="/"
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-red-500 transition group"
        >
          <X size={22} className="text-zinc-300 group-hover:text-white" />
        </Link>

        <div className="text-center mb-8">
          <img src="/images/tree.png" alt="Trees Food" className="w-24 mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-amber-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white focus:border-amber-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 transition py-4 rounded-xl text-black font-bold"
          >
            LOGIN
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-zinc-400">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-amber-400 hover:text-amber-300 font-semibold"
          >
            Register Here
          </Link>

        </div>

      </div>

    </div>
  );
}