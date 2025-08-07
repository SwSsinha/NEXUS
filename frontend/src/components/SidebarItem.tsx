import { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    isActive: boolean;
    onClick: () => void;
}

export function SidebarItem({ text, icon, isActive, onClick }: SidebarItemProps) {
    const activeClasses = "bg-purple-100 text-purple-600 font-semibold";
    const inactiveClasses = "text-gray-700 hover:bg-gray-200";

    return (
        <div
            className={`flex items-center py-3 cursor-pointer rounded-lg px-4 transition-all duration-150 ${
                isActive ? activeClasses : inactiveClasses
            }`}
            onClick={onClick}
        >
            <div className={`pr-3 ${isActive ? "text-purple-600" : "text-gray-500"}`}>
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    );
}
