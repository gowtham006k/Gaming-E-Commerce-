import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="py-8 bg-gray-900">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-semibold text-white-900">All Products</h1>
                </div>

                {/* Main */}
                <section className="container mx-auto px-4 lg:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading && <Loader />}
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="group relative overflow-hidden bg-white rounded-lg shadow-md transition duration-300 transform hover:scale-105 cursor-pointer">
                                    <img
                                        onClick={() => navigate(`/productinfo/${id}`)}
                                        className="w-full h-56 object-cover"
                                        src={productImageUrl}
                                        alt={title}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-gray-700 font-bold text-sm uppercase mb-2">{title.substring(0, 25)}</h2>
                                        <p className="text-gray-500 text-sm mb-2">₹{price}</p>
                                        <div className="flex justify-center">
                                            {cartItems.some((p) => p.id === item.id) ? (
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                                >
                                                    Remove from Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
