import type { InputHTMLAttributes, ElementType } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ElementType;
  error?: string;
}

export default function Input({
  label,
  icon: Icon,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`flex items-center border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 ${className}`}
      >
        {Icon && <Icon className="w-5 h-5 text-gray-400 mr-2" />}

        <input className="w-full outline-none bg-transparent" {...props} />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
