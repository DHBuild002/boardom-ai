
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101010]';

  const variantStyles = {
    primary: 'bg-[#10219F] text-[#F7F7FF] hover:bg-[#000000] focus:ring-[#10219F] disabled:bg-[#BDD5EA] disabled:cursor-not-allowed',
    secondary: 'bg-[#FE5F55] text-[#F7F7FF] hover:bg-[#10219F] focus:ring-[#FE5F55]',
    ghost: 'bg-transparent text-[#000000] hover:bg-[#BDD5EA] hover:text-[#000000] focus:ring-[#10219F]'
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
