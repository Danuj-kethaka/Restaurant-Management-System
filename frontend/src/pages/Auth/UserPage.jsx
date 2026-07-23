import { useState } from "react";
import { useUserStore } from "../../store/Auth/User";
import toast from "react-hot-toast";

const Account = () => {
  const { currentUser, accessToken, setAuth, signOutUser } = useUserStore();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}/api/users/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Profile updated");
      setAuth(data.data, accessToken);
    } else {
      toast.error(data.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account permanently?")) return;

    const res = await fetch(`${API_URL}/api/users/${currentUser._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      signOutUser();
      window.location.href = "/login";
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">   {/* Same width as My Orders */}

      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center gap-6 pb-8 border-b border-white/10">
          <div className="w-24 h-24 rounded-full border-4 border-amber-500 bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14 text-amber-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white">{currentUser.name}</h2>
            <p className="text-amber-400 mt-1 text-lg">{currentUser.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="pt-8 space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-amber-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-amber-500 outline-none transition"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Account ID</label>
              <input
                disabled
                value={currentUser._id}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Joined On</label>
              <input
                disabled
                value={new Date(currentUser.createdAt).toLocaleDateString()}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-wrap gap-4">
            <button
              onClick={handleUpdate}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-10 py-3 rounded-2xl transition duration-300"
            >
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-3 rounded-2xl transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;