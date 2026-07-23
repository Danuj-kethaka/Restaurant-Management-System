import { useState } from "react";
import { useUserStore } from "../store/Auth/User.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, signOutUser } = useUserStore();
  const navigate = useNavigate();

 const handleSignOut = () => {
  const { logout } = useUserStore.getState(); // Get the latest logout

  logout();                    // Clear store + localStorage
  toast.success("Logged out successfully");
  navigate("/login");
};

  return (
    <div className="flex flex-row min-h-screen">

      {/* SIDEBAR */}
      <aside
        className={`bg-zinc-950 border-r border-white/10 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >

        {/* HEADER BACKGROUND AREA */}
        <div className="relative overflow-hidden">

          <style>
            {`
              .profile-container {
                width: 100px;
                height: 100px;
                background-size: cover;
                background-position: top;
                border-radius: 50%;
                overflow: hidden;  
                border: 2px solid #f59e0b;
              }
            `}
          </style>

          <div
            aria-hidden="true"
            className="inset-y-0 absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden"
          >
            <div className="absolute inset-0 flex">
              <div className="h-full w-1/2 bg-zinc-900"></div>
              <div className="h-full w-1/2 bg-black"></div>
            </div>

            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width="1750"
                height="220"
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#111827" />
                <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#0a0a0a" />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#18181b" />
                <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#27272a" />
              </svg>
            </div>
          </div>

          {/* HEADER */}
          <header className="relative pb-4">

            <div className="max-w-7xl">

              <button
                className="mt-2 right-3 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 text-white transition-transform duration-300 ${
                    sidebarOpen ? "" : "rotate-180"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </button>

              {sidebarOpen && (
                <>
                  <div className="profile-container mx-auto mt-2 mb-3 flex items-center justify-center bg-zinc-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16 text-amber-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>

                  <h1 className="text-xl font-bold tracking-tight text-white text-center truncate">
                    {currentUser.name}
                  </h1>
                </>
              )}
            </div>
          </header>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-0 py-4 space-y-2">

          {/* ACCOUNT */}
          <Link
            to="/useraccount"
            className="bg-zinc-900 border-l-4 border-amber-500 text-amber-400 hover:bg-zinc-800 group px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-amber-400 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            {sidebarOpen && <span className="ml-3 truncate">Account</span>}
          </Link>

          {/* ORDERS */}
          <Link
            to="myorders"
            className="bg-zinc-900 border-l-4 border-transparent text-gray-300 hover:bg-zinc-800 hover:text-amber-400 group px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-gray-400 group-hover:text-amber-400 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6.75a4.5 4.5 0 0 0-9 0M3 9.75h18l-1.5 10.5a2.25 2.25 0 0 1-2.25 1.75h-10.5a2.25 2.25 0 0 1-2.25-1.75L3 9.75z"
              />
            </svg>

            {sidebarOpen && <span className="ml-3 truncate">Orders</span>}
          </Link>

          {/* RESERVATIONS */}
          <Link
            to="myreservation"
            className="bg-zinc-900 border-l-4 border-transparent text-gray-300 hover:bg-zinc-800 hover:text-amber-400 group px-3 py-2 flex items-center text-sm font-medium"
          >
            <svg
              className="text-gray-400 group-hover:text-amber-400 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 6.75h15a2.25 2.25 0 0 1 2.25 2.25v11.25A2.25 2.25 0 0 1 19.5 22.5h-15a2.25 2.25 0 0 1-2.25-2.25V9a2.25 2.25 0 0 1 2.25-2.25Z"
              />
            </svg>

            {sidebarOpen && <span className="ml-3 truncate">Reservations</span>}
          </Link>

        </nav>

        {/* SIGN OUT */}
        <div className="px-0 py-4 mt-auto">

          <a
            onClick={handleSignOut}
            className="bg-zinc-900 border-l-4 border-red-500 text-red-400 hover:bg-zinc-800 hover:text-red-300 group px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
          >
            <svg
              className="text-red-400 group-hover:text-red-300 flex-shrink-0 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>

            {sidebarOpen && <span className="ml-3 truncate">Sign Out</span>}
          </a>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

    </div>
  );
};

export default UserSideBar;