import { Logo } from "../icons/Logo";
import { PlusIcon } from "../icons/PlusIcon";

interface SidebarProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

export function Sidebar({ activeFilter, setActiveFilter }: SidebarProps) {
    const filters = ["all", "youtube", "twitter"];

    return (
        <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-6 flex flex-col z-50">
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
                                onClick={() => setActiveFilter(filter)}
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
        </div>
    );
}
