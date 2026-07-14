const AdminDashboard = () => {
    return (
        <div className="space-y-8 mt-15">


            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <h2 className="text-4xl font-bold mt-3 text-gray-800">0</h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-500 text-sm">Menu Items</p>
                    <h2 className="text-4xl font-bold mt-3 text-gray-800">0</h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-500 text-sm">Customers</p>
                    <h2 className="text-4xl font-bold mt-3 text-gray-800">0</h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-500 text-sm">Revenue</p>
                    <h2 className="text-4xl font-bold mt-3 text-gray-800">
                        LKR 0.00
                    </h2>
                </div>

            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Orders */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Recent Orders
                        </h2>

                        <button className="text-green-600 font-medium hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl h-72 flex items-center justify-center">

                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-500">
                                No Orders Yet
                            </h3>

                            <p className="text-gray-400 mt-2">
                                Recent orders will appear here.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Quick Actions
                    </h2>

                    <div className="space-y-4">

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition">
                            Add Menu Item
                        </button>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
                            Manage Orders
                        </button>

                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition">
                            Manage Users
                        </button>

                    </div>

                </div>

            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Popular Menu
                    </h2>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl h-56 flex items-center justify-center">

                        <p className="text-gray-400">
                            Popular menu items will appear here.
                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Sales Overview
                    </h2>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl h-56 flex items-center justify-center">

                        <p className="text-gray-400">
                            Sales chart will appear here.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;