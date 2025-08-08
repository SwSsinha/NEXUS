import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "danger";
    text: string;
    startIcon?: ReactElement; // Made optional
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const variantClasses = {
    "primary": "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
    "secondary": "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors",
    "danger": "bg-red-500 text-white hover:bg-red-600 transition-colors",
};

const defaultStyles = "px-4 py-2 rounded-lg font-semibold flex items-center justify-center shadow-sm";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading, disabled, type = "button" }: ButtonProps) {
    const isDisabled = loading || disabled;
    return (
        <button 
            onClick={onClick} 
            className={`${defaultStyles} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`} 
            disabled={isDisabled}
            type={type}
        >
            {startIcon && <div className="pr-2">{startIcon}</div>}
            {text}
        </button>
    );
}
