import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white';

  const variantStyles = {
    primary: 'bg-[#BDD5EA] text-[#10219F] hover:bg-blue-300 focus:ring-[#BDD5EA] disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-[#BDD5EA] text-[#10219F] hover:bg-blue-200 focus:ring-[#BDD5EA]',
    ghost: 'bg-transparent text-[#000000] hover:bg-[#BDD5EA] hover:bg-opacity-20 focus:ring-[#BDD5EA]'
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};