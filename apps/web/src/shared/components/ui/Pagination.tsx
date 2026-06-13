import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between pt-4 border-t border-white/5 select-none", className)}>
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="flex items-center gap-1 h-9 px-3 text-xs"
      >
        <ChevronLeft size={14} />
        <span>Prev</span>
      </Button>
      
      <span className="text-[11px] font-mono text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="flex items-center gap-1 h-9 px-3 text-xs"
      >
        <span>Next</span>
        <ChevronRight size={14} />
      </Button>
    </div>
  );
};
