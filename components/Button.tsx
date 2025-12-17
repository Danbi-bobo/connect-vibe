import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  // Ethereal Light Mode: Soft, dreamy, feminine wellness
  const baseStyles = "py-3 px-8 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    // Sage green primary with soft glow
    primary: "bg-sage-300 text-cream-50 border border-sage-400 hover:bg-sage-400 hover:shadow-lg hover:shadow-sage-300/30",
    // Dusty rose secondary
    secondary: "bg-rose-100 text-charcoal-700 border border-rose-200 hover:bg-rose-200 hover:border-rose-300",
    // Lavender outline
    outline: "bg-transparent border border-lavender-300 text-charcoal-700 hover:border-lavender-400 hover:bg-lavender-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};