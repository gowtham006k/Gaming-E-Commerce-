import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FiUser, FiShoppingBag, FiList } from 'react-icons/fi'; // Import icons for statistics
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import myContext from '../../context/myContext';
import { useContext } from 'react';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;

    return (
        <div className="container mx-auto px-4">
            {/* Top */}
   

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Profile */}
                <div className="bg-gray-800 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-center mb-4">
                        <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Profile" className="w-20 h-20 rounded-full border-4 border-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
                        <p className="text-lg mb-2">{user?.email}</p>
                        <p className="text-lg mb-2">{user?.date}</p>
                        <p className="text-lg mb-2">{user?.role}</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Products */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center text-white">
                        <FiShoppingBag className="text-yellow-500 w-12 h-12 mx-auto mb-3" />
                        <h2 className="text-3xl font-medium mb-2">{getAllProduct.length}</h2>
                        <p className="font-bold">Total Products</p>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center text-white">
                        <FiList className="text-red-500 w-12 h-12 mx-auto mb-3" />
                        <h2 className="text-3xl font-medium mb-2">{getAllOrder.length}</h2>
                        <p className="font-bold">Total Orders</p>
                    </div>

                    {/* Total Users */}
                    <div className="bg-gray-800 p-6 rounded-lg text-center text-white">
                        <FiUser className="text-blue-500 w-12 h-12 mx-auto mb-3" />
                        <h2 className="text-3xl font-medium mb-2">{getAllUser.length}</h2>
                        <p className="font-bold">Total Users</p>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="mt-8">
                <Tabs>
                    <TabList className="flex flex-wrap -m-4 text-center justify-center">
                        <Tab className="p-4 cursor-pointer">
                            <div className="border border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-700">
                                <h2 className="text-xl font-medium mb-2 text-yellow-500">Product Details</h2>
                            </div>
                        </Tab>

                        <Tab className="p-4 cursor-pointer">
                            <div className="border border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-700">
                                <h2 className="text-xl font-medium mb-2 text-red-500">Order Details</h2>
                            </div>
                        </Tab>

                        <Tab className="p-4 cursor-pointer">
                            <div className="border border-gray-700 px-4 py-3 rounded-xl hover:bg-gray-700">
                                <h2 className="text-xl font-medium mb-2 text-blue-500">User Details</h2>
                            </div>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ProductDetail />
                    </TabPanel>

                    <TabPanel>
                        <OrderDetail />
                    </TabPanel>

                    <TabPanel>
                        <UserDetail />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                </div>
            </header>

            {/* Main content */}
            <AdminDashboard />
        </div>
    );
}

export default Dashboard;
