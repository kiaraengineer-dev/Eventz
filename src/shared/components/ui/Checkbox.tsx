import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({
  label,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input type="checkbox" className="w-4 h-4 accent-blue-600" {...props} />

      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
