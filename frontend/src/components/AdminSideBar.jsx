// AdminAccount.jsx
import { useState } from "react";
import { PawPrint, Calendar, UserCog, HeartHandshake } from "lucide-react";
import { MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";
import { ShoppingCart, Package, BarChart3 } from "lucide-react";
import { LayoutDashboard, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {ShoppingBag,CalendarDays,MessageSquareMore,BookOpen} from "lucide-react";
import { useUserStore } from "../store/Auth/User.js";

const AdminSideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(false);
  const { currentUser, signOutUser } = useUserStore();
  const navigate = useNavigate();
 const handleSignOut = () => {
  const { logout } = useUserStore.getState(); // Get the latest logout

  logout();                    // Clear store + localStorage
  toast.success("Logged out successfully");
  navigate("/login");
};

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard",path:"/admindashboard", active: true },
    { icon: ShoppingBag, label: "Orders",path:"adminorders" },
    { icon: CalendarDays, label: "Reservations",path:"adminReservation" },
    { icon: BookOpen, label: "Menu", path: "addmenu" },
    { icon: Users, label: "Users",path:"" },
    { icon: MessageSquareMore, label: "Feedback",path:"" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Logout", danger: true },
  ];

  const isDesktop = window.innerWidth >= 1024;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*------SIDEBAR---------*/}
      <aside
        onMouseEnter={() => setDesktopExpanded(true)}
        onMouseLeave={() => setDesktopExpanded(false)}
        className={`
          fixed inset-y-0 left-0 z-40
          bg-gray-900 text-gray-100
          transition-all duration-300 ease-in-out
          flex flex-col
          shadow-xl
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${desktopExpanded ? "w-64" : "w-16 lg:w-16"}
        `}
      >
        {/* Brand / Logo area */}
        <div
          className={`
            h-16 flex items-center border-b border-gray-800
            ${desktopExpanded ? "justify-start px-5 gap-3" : "justify-center"}
          `}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl flex-shrink-0">
            🍃
          </div>
          <span
            className={`
              text-xl font-semibold tracking-tight whitespace-nowrap
              ${desktopExpanded ? "opacity-100" : "opacity-0 w-0"}
            `}
          >
            Trees Food
          </span>
        </div>

        {/* User panel (only shown when expanded) */}
        {desktopExpanded && (
          <div className="px-5 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-medium flex-shrink-0">
                🧑‍💻
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{currentUser?.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    if (item.label === "Logout") {
                      handleSignOut();
                    }else if(item.path){
                      navigate(item.path);
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors
                    ${desktopExpanded ? "justify-start" : "justify-center"}
                    ${
                      item.active
                        ? "bg-blue-600 text-white"
                        : item.danger
                        ? "text-red-400 hover:bg-red-900/40"
                        : "text-gray-300 hover:bg-gray-800"
                    }
                  `}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span
                    className={`
                      whitespace-nowrap overflow-hidden transition-all
                      ${
                        desktopExpanded
                          ? "opacity-100 max-w-[140px]"
                          : "opacity-0 max-w-0"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/*-----MAIN AREA------*/}
      <div
        className={`
          flex-1 transition-all duration-300
          ${desktopExpanded ? "lg:ml-64" : "lg:ml-16"}
        `}
      >
        {/* Top bar */}
         <header className="bg-white shadow-sm h-16 flex items-center px-4 lg:px-6 fixed top-0 right-0 left-0 lg:left-16 z-30">
            <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 mr-3"
            >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

            <div className="ml-auto flex items-center gap-4">
            Welcome {currentUser?.name}
            </div>
        </header>

       <main className="pt-16 p-5 lg:p-8 w-full overflow-x-hidden">
            <div className="max-w-full">
                <Outlet />
            </div>
       </main>

      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminSideBar;