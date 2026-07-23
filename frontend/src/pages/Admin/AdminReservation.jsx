import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import { useReservationStore } from "../../store/Reservation/Reservation.js";
import toast from "react-hot-toast";
import { 
  Calendar, Clock, Users, Eye, RefreshCw, 
  CheckCircle, XCircle, Clock as PendingIcon, ChevronLeft, ChevronRight 
} from "lucide-react";

const AdminReservations = () => {
  const { accessToken } = useUserStore();
  const { 
    reservations, 
    loading, 
    getAllReservations, 
    updateReservationStatus 
  } = useReservationStore();

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    getAllReservations(accessToken);
  }, [accessToken, getAllReservations]);

  const handleRefresh = () => {
    setCurrentPage(1);
    getAllReservations(accessToken);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await updateReservationStatus(id, newStatus, accessToken);
    
    if (result.success) {
      toast.success(`Status updated to ${newStatus}`);
      getAllReservations(accessToken);
      if (selectedReservation?._id === id) {
        setSelectedReservation(prev => ({ ...prev, status: newStatus }));
      }
    } else {
      toast.error(result.message || "Failed to update status");
    }
  };

  // Filter
  const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === "all" || res.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = 
      res._id?.toLowerCase().includes(searchLower) ||
      (res.user?.name || res.name)?.toLowerCase().includes(searchLower) ||
      (res.user?.email || res.email)?.toLowerCase().includes(searchLower) ||
      res.phone?.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchTerm]);

  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
    confirmed: { color: "bg-green-100 text-green-700", label: "Confirmed" },
    cancelled: { color: "bg-red-100 text-red-700", label: "Cancelled" },
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">All Reservations</h1>
          <p className="text-gray-500 mt-1">Total: {filteredReservations.length} reservations</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-5 py-3 rounded-xl transition"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by ID, Name, Email or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-5 py-3 focus:border-amber-500 outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-gray-300 px-5 py-3 focus:border-amber-500 outline-none bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading reservations...</div>
      ) : filteredReservations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-20 text-center">
          <Calendar size={70} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700">No reservations found</h3>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Reservation ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Date & Time</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Guests</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedReservations.map((res) => {
                const statusInfo = statusConfig[res.status] || statusConfig.pending;
                return (
                  <tr key={res._id} className="hover:bg-gray-50 transition">
                    <td className="py-5 px-6 font-mono text-sm text-gray-500">
                      #{res._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-5 px-6">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {res.user?.name || res.name}
                        </p>
                        <p className="text-sm text-gray-500">{res.phone}</p>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {new Date(res.date).toLocaleDateString('en-US', { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm text-amber-600 flex items-center gap-1">
                            <Clock size={15} /> {res.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-gray-400" />
                        <span className="font-medium">{res.guests}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <button
                        onClick={() => setSelectedReservation(res)}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
                      >
                        <Eye size={18} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <span className="px-6 py-3 bg-white border rounded-xl font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border disabled:opacity-50 hover:bg-gray-50"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-auto shadow-2xl">
            {/* Modal content remains the same as previous version */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Reservation Details</h2>
                  <p className="text-gray-500 font-mono">#{selectedReservation._id.slice(-8).toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedReservation(null)} className="text-4xl text-gray-400 hover:text-gray-600">×</button>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                {["pending", "confirmed", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(selectedReservation._id, s)}
                    className={`px-8 py-3 rounded-2xl capitalize font-medium transition ${
                      selectedReservation.status === s ? "bg-amber-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Rest of modal content (same as before) */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div><p className="text-gray-500">Customer</p><p className="font-semibold text-lg mt-1">{selectedReservation.user?.name || selectedReservation.name}</p></div>
                  <div><p className="text-gray-500">Email</p><p className="font-medium mt-1">{selectedReservation.user?.email || selectedReservation.email}</p></div>
                  <div><p className="text-gray-500">Phone</p><p className="font-medium mt-1">{selectedReservation.phone}</p></div>
                  <div><p className="text-gray-500">Guests</p><p className="font-semibold text-lg mt-1">{selectedReservation.guests} People</p></div>
                </div>

                <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                  <p className="text-gray-500 text-sm">Date & Time</p>
                  <p className="text-2xl font-semibold mt-2">
                    {new Date(selectedReservation.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-amber-600 text-xl mt-1">{selectedReservation.time}</p>
                </div>

                {selectedReservation.specialRequest && (
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Special Request</p>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                      {selectedReservation.specialRequest}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;