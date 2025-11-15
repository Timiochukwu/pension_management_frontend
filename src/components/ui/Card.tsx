/**
 * CARD COMPONENT
 *
 * Container component with shadow and rounded corners
 */

import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = true,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-card shadow-card',
        hover && 'card-hover',
        padding && 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
