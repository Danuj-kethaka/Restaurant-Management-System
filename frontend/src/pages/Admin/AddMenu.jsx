import { useState, useEffect } from "react";
import { useUserStore } from "../../store/Auth/User.js"; 
import { useMenuStore } from "../../store/Menu/Menu.js";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus } from "lucide-react";

const AddMenu = () => {
    const { accessToken } = useUserStore();
    const { menus, addMenu, updateMenu, deleteMenu, getMenus } = useMenuStore();

    const [formData, setFormData] = useState({
        name: "", description: "", price: "", category: "", image: null
    });

    const [editingId, setEditingId] = useState(null); // null = add mode
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        getMenus();
    }, [getMenus]);

    const resetForm = () => {
        setFormData({ name: "", description: "", price: "", category: "", image: null });
        setPreview(null);
        setEditingId(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = editingId 
            ? await updateMenu(editingId, formData, accessToken)
            : await addMenu(formData, accessToken);

        if (result.success) {
            toast.success(result.message);
            resetForm();
            getMenus(); // Refresh list
        } else {
            toast.error(result.message);
        }
    };

    const handleEdit = (menu) => {
        setEditingId(menu._id);
        setFormData({
            name: menu.name,
            description: menu.description,
            price: menu.price,
            category: menu.category,
            image: null
        });
        setPreview(menu.image);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        
        const result = await deleteMenu(id, accessToken);
        if (result.success) {
            toast.success(result.message);
            getMenus();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {editingId ? "Edit Menu Item" : "Add New Menu Item"}
                </h1>
                <p className="text-gray-500 mb-8">
                    {editingId ? "Update the details below" : "Fill in the details to add a new food item"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields (same as before) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (LKR)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Food Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleChange} className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-5 file:py-3 file:text-white" />
                        </div>
                    </div>

                    {preview && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Image Preview</label>
                            <img src={preview} alt="Preview" className="w-52 h-52 object-cover rounded-xl border" />
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-xl">
                            {editingId ? "Update Menu Item" : "Add Menu Item"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-xl">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Menu List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">All Menu Items</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus.map((item) => (
                        <div key={item._id} className="border border-gray-200 rounded-xl overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                                <p className="text-green-600 font-bold mt-2">Rs. {item.price}</p>

                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleEdit(item)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddMenu;