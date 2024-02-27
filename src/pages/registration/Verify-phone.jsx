
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyPhoneNumber } from "../../firebase/FirebaseConfig"; // Import function to verify phone number
import toast from "react-hot-toast";

const VerifyPhoneNumber = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");

    const handleVerification = async () => {
        try {
            // Call function to verify phone number with the entered verification code
            await verifyPhoneNumber(verificationCode);
            toast.success("Phone number verified successfully");
            // Redirect to desired page after successful verification
            navigate('/dashboard'); // Example: Redirect to dashboard page
        } catch (error) {
            console.error("Error verifying phone number:", error);
            toast.error("Failed to verify phone number. Please try again.");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="verification_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500'>
                        Verify Phone Number
                    </h2>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Enter Verification Code'
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={handleVerification}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'
                    >
                        Verify
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Back to <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default VerifyPhoneNumber;
