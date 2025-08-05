import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'primary-button';
      case 'secondary':
        return 'bg-accent text-primary hover:bg-blue-200 focus-ring';
      case 'ghost':
        return 'bg-transparent text-black hover:bg-accent hover:opacity-20 focus-ring';
      default:
        return 'primary-button';
    }
  };

  return (
    <button className={`${getVariantClasses()} ${className}`} {...props}>
      {children}
    </button>
  );
};