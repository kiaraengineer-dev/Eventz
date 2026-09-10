import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({
  className = "",
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={`block mb-2 text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
