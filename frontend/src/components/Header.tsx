import { useState } from 'react';
// Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';
import { Button } from './Button'; 
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

/**
 * Header component for the content dashboard.
 *
 * @param onAddContentClick - Function to call when the "Add Content" button is clicked.
 * @param user - Object containing user information (e.g., { username: string }).
 */
export function Header({ onAddContentClick, user }: { 
    onAddContentClick: () => void, 
    user: { username: string } | null,
}) {
    // State to manage the visibility of the profile dropdown menu.
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Use the useNavigate hook to get the navigation function.
    const navigate = useNavigate();

    // A placeholder logout function that now uses useNavigate.
    const handleLogout = () => {
        console.log("User logged out!");
        // We now navigate to the sign-in page directly from here.
        navigate('/signin');
    };

    return (
        <header className="fixed top-0 left-72 right-0 bg-white shadow-sm h-16 flex items-center justify-between px-8 z-40">
            <h1 className="text-xl font-bold text-gray-800">Your Content Dashboard</h1>
            
            <div className="flex items-center space-x-4">
                <Button
                    variant="primary"
                    text="Add Content"
                    startIcon={<PlusIcon />}
                    onClick={onAddContentClick}
                />
                
                <div className="relative">
                    <button
                        className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <UserCircleIcon className="w-8 h-8 text-gray-500" />
                        <ChevronDownIcon className={`w-4 h-4 ml-1 text-gray-500 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                            {/* The "Profile" and "Logout" buttons are now the only items in the dropdown */}
                            <button 
                                // Direct navigation using the navigate function from the hook
                                onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <UserCircleIcon className="w-5 h-5 mr-2 text-gray-500" />
                                <span>Profile</span>
                            </button>
                            <button 
                                // Direct navigation to the sign-in page on logout
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2 text-gray-500" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
