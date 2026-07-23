import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js";
import toast from "react-hot-toast";
import { 
  Eye, Trash2, RefreshCw, ChevronLeft, ChevronRight 
} from "lucide-react";

const AdminUsers = () => {
  const { accessToken, currentUser } = useUserStore(); // ← Added currentUser
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Optional: Protect this page (only admin can access)
  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      toast.error("Access denied. Admin only area.");
      // You can redirect here if you have useNavigate
      // navigate("/");
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;
      
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUsers();
    }
  }, [accessToken]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const API_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_URL;
      
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Role filtering
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  // Role badge styling
  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",
      manager: "bg-orange-100 text-orange-700",
      staff: "bg-emerald-100 text-emerald-700",
      user: "bg-blue-100 text-blue-700"
    };
    
    return styles[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">All Users</h1>
          <p className="text-gray-500 mt-1">Total: {filteredUsers.length} users</p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-5 py-3 rounded-xl transition"
        >
          <RefreshCw size={18} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-5 py-4 focus:border-amber-500 outline-none"
        />
        
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-xl border border-gray-300 px-5 py-4 focus:border-amber-500 outline-none bg-white"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-20 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">No Users Found</h3>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Joined</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="py-5 px-6">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                  </td>
                  <td className="py-5 px-6 text-gray-600">{user.email}</td>
                  <td className="py-5 px-6">
                    <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full capitalize ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition"
                        title="Delete User"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
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

      {/* User Detail Modal - Updated role badge */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-bold text-gray-800">User Details</h2>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="text-4xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="text-2xl font-semibold">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-xl">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Role</p>
                  <span className={`inline-block px-5 py-2 rounded-full text-lg capitalize ${getRoleBadge(selectedUser.role)}`}>
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Joined On</p>
                  <p>{new Date(selectedUser.createdAt).toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;