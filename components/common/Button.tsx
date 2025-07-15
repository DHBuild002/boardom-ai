
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101010]';

  const variantStyles = {
    primary: 'bg-[#007ea7] text-white hover:bg-[#003459] focus:ring-[#007ea7] disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-[#00a8e8] text-white hover:bg-[#007ea7] focus:ring-[#00a8e8]',
    ghost: 'bg-transparent text-[#003459] hover:bg-gray-100 hover:text-[#00171f] focus:ring-[#007ea7]'
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
