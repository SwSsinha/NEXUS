import { useState, useEffect, useRef } from "react";
import { Logo } from "../icons/Logo";
import { PlusIcon } from "../icons/PlusIcon";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface SidebarProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

export function Sidebar({ activeFilter, setActiveFilter }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const filters = ["all", "youtube", "twitter"];

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close sidebar when mouse leaves
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile/Tablet Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
                <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                onMouseLeave={handleMouseLeave}
                className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Logo at the top of the sidebar */}
                <div className="flex items-center space-x-2 pb-6 border-b border-gray-200 mb-6">
                    <Logo className="h-8 w-8 text-indigo-600" />
                    <h2 className="text-xl font-bold text-gray-800">NEXUS</h2>
                </div>
                
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {filters.map((filter) => (
                            <li key={filter}>
                                <button
                                    onClick={() => {
                                        setActiveFilter(filter);
                                        // Close sidebar on mobile after selection
                                        if (window.innerWidth < 1024) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={`w-full text-left rounded-lg p-3 transition-colors duration-200 flex items-center space-x-3
                                        ${activeFilter === filter
                                            ? "bg-indigo-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    <span className="capitalize">{filter}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Close button for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </>
    );
}
