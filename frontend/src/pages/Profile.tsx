import React from 'react';
// Import the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/Button";

/**
 * A placeholder component for the user profile page.
 * It now uses the useNavigate hook for navigation.
 */
export function Profile() {
    // Initialize the useNavigate hook to get the navigation function.
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
                <p className="text-gray-600 mb-6">
                    This is a placeholder for the user profile page. 
                    You can add user details, settings, and other relevant information here.
                </p>
                <Button 
                    text="Go back to Dashboard" 
                    // Call the navigate function directly with the desired path
                    onClick={() => navigate('/dashboard')}
                    variant="secondary"
                />
            </div>
        </div>
    );
}
