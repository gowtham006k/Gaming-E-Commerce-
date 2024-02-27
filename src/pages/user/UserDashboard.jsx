import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import "./user.css";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Top Section */}
                <div className="top">
                    <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* User Information */}
                        <div className="flex flex-col items-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" className="w-20 h-20 rounded-full border border-pink-300 mb-4" />
                            <div className="text-center">
                                <h1 className="text-lg font-bold mb-1">{user?.name}</h1>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                                <p className="text-sm text-gray-600">Joined: {user?.date}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Order Details</h2>
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {/* Display Orders */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                            <div key={index} className="mt-8 border border-pink-200 rounded-lg p-4 shadow-md">
                                <div className="flex justify-between mb-4">
                                    <p className="text-gray-700 font-semibold">Order ID: #{order.id}</p>
                                    <p className={`text-sm font-semibold ${order.status === 'pending' ? 'text-red-600' : 'text-green-600'}`}>{order.status}</p>
                                </div>
                                {order.cartItems.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center mb-4">
                                        <img src={item.productImageUrl} alt={item.title} className="w-20 h-20 rounded-lg object-cover border border-gray-200 mr-4" />
                                        <div>
                                            <p className="text-lg font-semibold">{item.title}</p>
                                            <p className="text-gray-600">{item.category}</p>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="ml-auto font-semibold text-gray-700">₹ {item.price}</p>
                                        <a href={item.download} target="_blank" rel="noopener noreferrer" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Download</a>
                                    </div>
                                ))}
                                <p className="text-gray-600 font-semibold">Total Amount: ₹ {order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
