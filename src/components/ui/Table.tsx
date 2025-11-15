/**
 * TABLE COMPONENT
 *
 * Reusable table for displaying data
 */

import React from 'react';
import { cn } from '../../utils/cn';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn('min-w-full divide-y divide-gray-200', className)}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children }) => {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableProps> = ({ children, className }) => {
  return (
    <tr className={cn('hover:bg-gray-50 transition-colors', className)}>
      {children}
    </tr>
  );
};

interface TableCellProps extends TableProps {
  header?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ children, header = false, className }) => {
  const Component = header ? 'th' : 'td';
  return (
    <Component
      className={cn(
        header
          ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
        className
      )}
    >
      {children}
    </Component>
  );
};
