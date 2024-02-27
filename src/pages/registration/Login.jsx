import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import "./login.css"; // Import custom CSS for styling

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                userLoginFunction();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users?.user?.uid)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({
                    email: "",
                    password: ""
                });
                toast.success("Login Successfully");
                setLoading(false);
                navigate(user.role === "user" ? '/user-dashboard' : '/admin-dashboard');
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }

    return (
        <div className='  flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className="login_Form">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500'>Login</h2>
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                        className='input-field'
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        className='input-field'
                    />
                </div>
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='btn-primary'
                    >
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Don't Have an account <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Login;
