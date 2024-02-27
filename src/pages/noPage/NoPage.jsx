import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <h1 className="text-5xl font-bold mb-8">404 - Page Not Found</h1>
            <p className="text-lg text-center mb-8">Oops! The page you are looking for does not exist or may have been moved.</p>
            <Link to="/" className="bg-white text-gray-800 py-3 px-6 rounded-full font-semibold shadow-md transition duration-300 hover:bg-gray-200 hover:text-gray-700">Go to Home Page</Link>
        </div>
    );
}

export default NoPage;
