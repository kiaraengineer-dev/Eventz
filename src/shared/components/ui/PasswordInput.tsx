import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "./Input";

interface PasswordInputProps {
  label: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function PasswordInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        icon={Lock}
        error={error}
        value={value}
        onChange={onChange}
        className="pr-12"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
