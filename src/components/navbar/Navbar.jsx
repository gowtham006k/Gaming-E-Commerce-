import { Link, useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa'; // Importing FontAwesome user icon
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./navbar.css"; // Import CSS file for Navbar styles

const Navbar = () => {
    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // State to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to handle hover
    const handleHover = () => {
        setIsDropdownOpen(true);
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart({cartItems.length})
                </Link>
            </li>
            {/* Signup */}
            {!user && <li>
                <Link to={'/signup'}>Signup</Link>
            </li>}

            {/* Login */}
            {!user && <li>
                <Link to={'/login'}>Login</Link>
            </li>}

            {/* User and Admin Dropdown */}
            {user && (
                <li className="relative" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                    <Link to={user.role === "admin" ? '#' : '/user-dashboard'}>
                        <FaUser /> {/* User icon */}
                    </Link>
                    {/* Dropdown menu for user and admin */}
                    <ul className={`absolute top-full left-0 bg-gray-800 text-white rounded-lg p-2 ${isDropdownOpen ? '' : 'hidden'}`}>
                        {user.role === "admin" && (
                            <li>
                                <Link to={'/admin-dashboard'}>Admin</Link>
                            </li>
                        )}
                        {user.role !== "admin" && (
                            <li>
                                <Link to={'/user-dashboard'}>User Dashboard</Link>
                            </li>
                        )}
                        <li className="cursor-pointer" onClick={logout}>Logout</li>
                    </ul>
                </li>
            )}

        </ul>
    );

    return (
        <nav className="bg-gray-600 sticky top-0 z-50">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">Game Stores</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
