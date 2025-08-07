interface InputProps { 
    placeholder: string; 
    reference?: any;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, reference, value, onChange }: InputProps) {
    return (
        <input 
            ref={reference} 
            placeholder={placeholder} 
            type={"text"} 
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-600 transition-colors" 
            value={value}
            onChange={onChange}
        />
    );
}
