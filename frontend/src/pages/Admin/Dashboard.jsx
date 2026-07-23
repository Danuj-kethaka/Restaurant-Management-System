import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import { useMenuStore } from "../../store/Menu/Menu.js";
import { useReservationStore } from "../../store/Reservation/Reservation.js";
import { Link } from "react-router-dom";
import { 
  Users, UtensilsCrossed, ShoppingCart, TrendingUp, Calendar 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";

const AdminDashboard = () => {
  const { currentUser, accessToken } = useUserStore();
  const { menus, getMenus } = useMenuStore();
  const { reservations, getAllReservations } = useReservationStore();

  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalReservations: 0,
  });
  const [loading, setLoading] = useState(true);

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

        getMenus();
        getAllReservations(accessToken);

        const res = await fetch(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json();
        if (data.success) {
          const orderList = data.data || [];
          setOrders(orderList.slice(0, 6));

          const totalRev = orderList.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

          setStats({
            totalOrders: orderList.length,
            totalRevenue: totalRev,
            totalReservations: reservations.length,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchData();
  }, [accessToken, getMenus, getAllReservations, reservations.length]);

  // Sample data for charts
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 62000 },
    { month: "Mar", revenue: 38000 },
    { month: "Apr", revenue: 71000 },
    { month: "May", revenue: 89000 },
    { month: "Jun", revenue: 67000 },
  ];

  const statusData = [
    { name: "Pending", value: 12, color: "#eab308" },
    { name: "Confirmed", value: 28, color: "#22c55e" },
    { name: "Cancelled", value: 5, color: "#ef4444" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-gray-600 mt-1">Overview of your restaurant</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-4xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-2xl">
              <UtensilsCrossed className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500">Menu Items</p>
              <p className="text-4xl font-bold text-gray-900">{menus.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-4 rounded-2xl">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500">Reservations</p>
              <p className="text-4xl font-bold text-gray-900">{reservations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-4xl font-bold text-emerald-600">
                LKR {stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white rounded-3xl p-8 shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Revenue Trend (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reservation Status */}
        <div className="bg-white rounded-3xl p-8 shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Reservation Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-6">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-8 shadow border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/admindashboard/adminorders" className="text-green-600 hover:underline">
              View All
            </Link>
          </div>
          {/* Add your recent orders list here */}
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/admindashboard/addmenu" className="block">
              <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-medium transition">
                + Add New Menu Item
              </button>
            </Link>

            <Link to="/admindashboard/adminorders" className="block">
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition">
                Manage Orders
              </button>
            </Link>

            <Link to="/admindashboard/adminReservation" className="block">
              <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-medium transition">
                Manage Reservations
              </button>
            </Link>

            {isAdmin && (
              <Link to="/admindashboard/adminUsers" className="block">
                <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-medium transition">
                  Manage Users
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;