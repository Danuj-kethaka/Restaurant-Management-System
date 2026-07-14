import { useState } from "react";
import { useUserStore } from "../../store/Auth/User.js"; 
import { useMenuStore } from "../../store/Menu/Menu.js";
import toast from "react-hot-toast";

const AddMenu = () => {

    const { accessToken } = useUserStore();
    const { addMenu } = useMenuStore();

    const [menu, setMenu] = useState({
        name:"",
        description:"",
        price:"",
        category:"",
        image:null,
    });

    const handleChange = (e)=>{

    const {name,value,files}=e.target;

    if(name==="image"){

        setMenu({
            ...menu,
            image:files[0]
        });

    }else{

        setMenu({
            ...menu,
            [name]:value
        });

    }

    }

    const handleSubmit = async(e)=>{

    e.preventDefault();

    const result = await addMenu(menu,accessToken);

    if(result.success){

        toast.success(result.message);

        setMenu({
            name:"",
            description:"",
            price:"",
            category:"",
            image:null,
        });

    }else{

        toast.error(result.message);

    }

    }

    return (
    <div className="max-w-8xl mx-auto mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add New Menu Item
                </h1>
                <p className="text-gray-500 mt-2">
                    Fill in the details below to add a new food item to your restaurant menu.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Food Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Food Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Ex: Chicken Burger"
                            value={menu.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            placeholder="Ex: Burgers"
                            value={menu.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>

                </div>

                {/* Description */}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        placeholder="Enter food description..."
                        value={menu.description}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Price */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Price (LKR)
                        </label>

                        <input
                            type="number"
                            name="price"
                            placeholder="0.00"
                            value={menu.price}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>

                    {/* Image */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Food Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-600
                            file:mr-4
                            file:rounded-lg
                            file:border-0
                            file:bg-green-600
                            file:px-5
                            file:py-3
                            file:text-white
                            file:cursor-pointer
                            hover:file:bg-green-700"
                        />
                    </div>

                </div>

                {/* Preview */}

                {menu.image && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Image Preview
                        </label>

                        <img
                            src={URL.createObjectURL(menu.image)}
                            alt="Preview"
                            className="w-52 h-52 object-cover rounded-xl border shadow-md"
                        />
                    </div>
                )}

                <div className="pt-3">
                    <button
                        type="submit"
                        className="w-full lg:w-auto bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold px-10 py-3 rounded-xl shadow-lg"
                    >
                        Add Menu Item
                    </button>
                </div>

            </form>

        </div>
    </div>
);
};

export default AddMenu;