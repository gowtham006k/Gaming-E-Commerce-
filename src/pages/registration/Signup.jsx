/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import "./signup.css";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const [passwordStrength, setPasswordStrength] = useState({
        validLength: false,
        containsNumber: false,
        containsUpperCase: false,
        containsLowerCase: false,
        containsSpecialChar: false
    });

    const checkPasswordStrength = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const isValidLength = password.length >= 8;
        const containsNumber = /\d/.test(password);
        const containsUpperCase = /[A-Z]/.test(password);
        const containsLowerCase = /[a-z]/.test(password);
        const containsSpecialChar = /[@$!%*?&]/.test(password);

        setPasswordStrength({
            validLength: isValidLength,
            containsNumber: containsNumber,
            containsUpperCase: containsUpperCase,
            containsLowerCase: containsLowerCase,
            containsSpecialChar: containsSpecialChar
        });
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        if (!isEmailValid(userSignup.email)) {
            toast.error("Invalid Email Address");
            return;
        }

        if (!passwordStrength.validLength || !passwordStrength.containsNumber || !passwordStrength.containsUpperCase || !passwordStrength.containsLowerCase || !passwordStrength.containsSpecialChar) {
            toast.error("Password is not strong enough");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            }

            const userReference = collection(fireDB, "user");

            await addDoc(userReference, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setTimeout(() => {
                setLoading(false);
                navigate('/login');
            }, 1500);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="login_Form bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-96 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create your Game Store Account</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({ ...userSignup, password: e.target.value });
                            checkPasswordStrength(e.target.value);
                        }}
                        className="input-field"
                    />
                </div>
                
                <div>
                    <button
                        type="button"
                        onClick={userSignupFunction}
                        className="btn-primary w-full py-3 font-bold rounded-md"
                    >
                        Next
                    </button>
                </div>
                <div className="text-sm text-center text-gray-600">
                    <p>Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
