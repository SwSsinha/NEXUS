interface InputProps { 
    placeholder: string; 
    reference?: any;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
}

export function Input({ placeholder, reference, value, onChange, type = "text", disabled = false }: InputProps) {
    return (
        <input 
            ref={reference} 
            placeholder={placeholder} 
            type={type} 
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
}
