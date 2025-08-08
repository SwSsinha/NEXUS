import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Button } from './Button'; 
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

/**
 * Header component for the content dashboard.
 *
 * @param onAddContentClick - Function to call when the "Add Content" button is clicked.
 */
export function Header({ onAddContentClick }: { 
    onAddContentClick: () => void, 
}) {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    const getInitials = () => {
        if (!user) return '';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    if (!user) {
        return null; // Don't render header if no user
    }

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
                
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                                {getInitials()}
                            </span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 ml-2 text-gray-500 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{user.username}</p>
                            </div>
                            
                            {/* Menu Items */}
                            <div className="py-1">
                                <button 
                                    onClick={() => { 
                                        navigate('/profile'); 
                                        setIsDropdownOpen(false); 
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                                >
                                    <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Profile</span>
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                                >
                                    <ArrowRightStartOnRectangleIcon className="w-4 h-4 mr-3 text-gray-500" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
