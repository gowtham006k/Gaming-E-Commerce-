/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const cartTotal = useSelector((state) =>
        state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const handleOpen = () => setOpen(!open);

    const makePayment = async (token) => {
        try {
            // Send payment details to your backend server to process the payment
            const response = await fetch("http://127.0.0.1:5000/payment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    product: cartTotal
                })
            });
    
            if (response.ok) {
                // Payment successful, now place the order
                const orderInfo = {
                    cartItems,
                    addressInfo,
                    email: user.email,
                    userid: user.uid,
                    status: "confirmed",
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                };
    
                // Add the order to the database
                const orderRef = collection(fireDB, 'order');
                await addDoc(orderRef, orderInfo);
    
                // Clear the addressInfo state
                setAddressInfo({
                    name: "",
                    address: "",
                    pincode: "",
                    mobileNumber: "",
                });
    
                // Show success message to the user
                toast.success("Order Placed Successfully");
            } else {
                // Payment failed, handle error
                console.error("Payment failed");
                toast.error("Payment Failed. Please try again later.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Error processing payment. Please try again later.");
        }
    };
    

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-pink-50">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    name: e.target.value
                                });
                            }}
                            placeholder='Enter your name'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: e.target.value
                                });
                            }}
                            placeholder='Enter your address'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode: e.target.value
                                });
                            }}
                            placeholder='Enter your pincode'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 text-pink-600 placeholder-pink-300'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    mobileNumber: e.target.value
                                });
                            }}
                            placeholder='Enter your mobileNumber'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                    </div>

                    <div className="">
                        <StripeCheckout
                            name="Buy"
                            amount={cartTotal * 100} // Converting price to cents
                            currency="INR"
                            token={makePayment}
                            stripeKey=""
                        >
                            <Button
                                type="button"
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
                            >
                                Buy now
                            </Button>
                        </StripeCheckout>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
