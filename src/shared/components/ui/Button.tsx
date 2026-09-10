import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "search"; 
  children: React.ReactNode;
  icon?: React.ElementType;
}

export default function Button({
  variant = "primary",
  children,
  icon: Icon,
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles =
    "flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

  const variants = {
    primary: "bg-[#3b82f6] text-white hover:bg-blue-600 shadow-md px-5 py-2",

    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2",

   search:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} strokeWidth={2} />}
      {children}
    </button>
  );
}
