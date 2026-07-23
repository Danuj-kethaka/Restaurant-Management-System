import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import toast from "react-hot-toast";
import { Eye, Clock, CheckCircle, XCircle, Truck, Package, RefreshCw, Edit3 } from "lucide-react";

const AdminOrders = () => {
  const { accessToken } = useUserStore();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;
      
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
    confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    preparing: { color: "bg-purple-100 text-purple-700", icon: Package },
    ready: { color: "bg-orange-100 text-orange-700", icon: Truck },
    delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">All Orders</h1>
          <p className="text-gray-500 mt-2">Manage and track customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-2xl transition text-gray-700"
        >
          <RefreshCw size={20} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 mb-10 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Order ID, Customer Name or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-5 py-4 focus:border-amber-500 outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-gray-300 px-5 py-4 focus:border-amber-500 outline-none bg-white"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-20 text-center">
          <Package size={80} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700">No Orders Found</h3>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = statusInfo.icon;

            return (
              <div key={order._id} className="bg-white rounded-2xl shadow border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${statusInfo.color}`}>
                        <StatusIcon size={18} />
                        {order.status}
                      </span>
                    </div>

                    <p className="text-xl font-semibold text-gray-800 mt-3">{order.user?.name}</p>
                    <p className="text-gray-600">{order.user?.email}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">Rs. {order.totalAmount}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="flex gap-4 mt-6 overflow-x-auto">
                  {order.items?.slice(0, 5).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.menu?.image || item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-200 flex-shrink-0"
                    />
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Eye size={20} /> View Details
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, "delivered")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
                  >
                    Mark as Delivered
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
                  <p className="text-gray-500">#{selectedOrder._id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-4xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Status Buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                {["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateOrderStatus(selectedOrder._id, s)}
                    className={`px-6 py-3 rounded-2xl capitalize text-sm font-medium transition ${
                      selectedOrder.status === s 
                        ? "bg-amber-500 text-white" 
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Items with Images */}
              <div className="space-y-6">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="flex gap-6 bg-gray-50 rounded-2xl p-5">
                    <img
                      src={item.menu?.image || item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-2xl border border-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-xl text-gray-800">{item.name}</h4>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right font-bold text-green-600 text-xl">
                      Rs. {(item.price * item.quantity).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t flex justify-between text-3xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-green-600">Rs. {selectedOrder.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;