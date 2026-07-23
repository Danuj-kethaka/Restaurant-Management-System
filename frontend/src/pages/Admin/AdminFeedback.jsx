import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import toast from "react-hot-toast";
import { 
  Eye, Star, RefreshCw, ChevronLeft, ChevronRight, User 
} from "lucide-react";

const AdminFeedback = () => {
  const { accessToken } = useUserStore();
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;
      
      const res = await fetch(`${API_URL}/api/feedback`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch feedback");
      }
    } catch (error) {
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const filteredFeedback = feedbacks.filter(fb => {
    const searchLower = searchTerm.toLowerCase();
    return (
      fb.user?.name?.toLowerCase().includes(searchLower) ||
      fb.user?.email?.toLowerCase().includes(searchLower) ||
      fb.comment?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Customer Feedback</h1>
          <p className="text-gray-500 mt-1">Total: {filteredFeedback.length} reviews</p>
        </div>
        <button
          onClick={fetchFeedback}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-5 py-3 rounded-xl transition"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 mb-8">
        <input
          type="text"
          placeholder="Search by Customer Name, Email or Comment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:border-amber-500 outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading feedback...</div>
      ) : filteredFeedback.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-20 text-center">
          <Star size={80} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700">No Feedback Yet</h3>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-200">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Rating</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Comment</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedFeedback.map((fb) => (
                <tr key={fb._id} className="hover:bg-gray-50 transition">
                  <td className="py-5 px-6">
                    <div>
                      <p className="font-semibold text-gray-800">{fb.user?.name}</p>
                      <p className="text-sm text-gray-500">{fb.user?.email}</p>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    {renderStars(fb.rating)}
                  </td>
                  <td className="py-5 px-6 max-w-md">
                    <p className="text-gray-700 line-clamp-2">
                      {fb.comment || <span className="text-gray-400 italic">No comment provided</span>}
                    </p>
                  </td>
                  <td className="py-5 px-6 text-sm text-gray-500">
                    {new Date(fb.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <button
                      onClick={() => setSelectedFeedback(fb)}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                    >
                      <Eye size={18} /> View
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Feedback Details</h2>
                  <p className="text-gray-500 mt-1">From {selectedFeedback.user?.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedFeedback(null)}
                  className="text-4xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex gap-1">
                  {renderStars(selectedFeedback.rating)}
                </div>
                <span className="text-2xl font-semibold text-amber-500">
                  {selectedFeedback.rating}/5
                </span>
              </div>

              {selectedFeedback.comment && (
                <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 text-lg leading-relaxed">
                  "{selectedFeedback.comment}"
                </div>
              )}

              <div className="mt-8 pt-6 border-t text-sm text-gray-500">
                Submitted on: {new Date(selectedFeedback.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;