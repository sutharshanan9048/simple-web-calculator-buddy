
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ 
  children, 
  onClick, 
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-14 rounded-2xl font-medium text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm",
        "bg-gray-50 hover:bg-gray-100 text-gray-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
