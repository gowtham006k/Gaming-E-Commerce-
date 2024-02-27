import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'Action' },
    { name: 'Adventure' },
    { name: 'Strategy' },
    { name: 'Shooter' },
    { name: 'Sports' },
    { name: 'Horror' },
    { name: 'Simulation' },
    { name: 'Puzzle' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        download: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const getSingleProductFunction = async () => {
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const productData = productTemp.data();
            setProduct({
                title: productData?.title || "",
                price: productData?.price || "",
                productImageUrl: productData?.productImageUrl || "",
                category: productData?.category || "",
                download: productData?.download || "",
                description: productData?.description || "",
                time: productData?.time || Timestamp.now(),
                date: productData?.date || new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <h2 className="text-center text-2xl font-bold text-pink-500 mb-5">Update Product</h2>
                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    placeholder="Product Title"
                    className="input-field"
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="Product Price"
                    className="input-field"
                />
                <input
                    type="text"
                    name="productImageUrl"
                    value={product.productImageUrl}
                    onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                    placeholder="Product Image Url"
                    className="input-field"
                />
                <select
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="input-field"
                >
                    <option disabled>Select Product Category</option>
                    {categoryList.map((value, index) => (
                        <option key={index} value={value.name}>{value.name}</option>
                    ))}
                </select>
                <input
                    type="url"
                    name="downloadurl"
                    value={product.download}
                    placeholder="Download Url"
                    onChange={(e) => setProduct({ ...product, download: e.target.value })}
                    className="input-field"
                />
                <textarea
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    name="description"
                    placeholder="Product Description"
                    rows="5"
                    className="input-field"
                ></textarea>
                <button
                    onClick={updateProduct}
                    type="button"
                    className="btn-primary w-full py-2 font-bold rounded-md mt-4"
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default UpdateProductPage;
