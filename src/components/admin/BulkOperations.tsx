import React from 'react';

type BulkAction = 'delete' | 'markInStock' | 'markOutOfStock' | 'feature';

interface BulkOperationsProps {
  selectedProducts: string[];
  onBulkAction: (action: BulkAction) => void;
}

export function BulkOperations({ selectedProducts, onBulkAction }: BulkOperationsProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="flex gap-2 items-center p-4 bg-[#141414] border border-[#1A1A1A] rounded-lg">
      <span className="text-sm text-[#C8C0B0]">
        {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
      </span>
      
      <div className="h-4 w-px bg-[#242424] mx-2" />
      
      <button 
        onClick={() => onBulkAction('delete')}
        className="text-xs bg-red-950/40 text-red-400 hover:bg-red-900/50 hover:text-red-300 px-4 py-2 rounded transition-colors"
      >
        Delete Selected
      </button>
      
      <button 
        onClick={() => onBulkAction('markInStock')}
        className="text-xs bg-green-950/40 text-green-400 hover:bg-green-900/50 hover:text-green-300 px-4 py-2 rounded transition-colors"
      >
        Mark In Stock
      </button>
      
      <button 
        onClick={() => onBulkAction('markOutOfStock')}
        className="text-xs bg-yellow-950/40 text-yellow-400 hover:bg-yellow-900/50 hover:text-yellow-300 px-4 py-2 rounded transition-colors"
      >
        Mark Out of Stock
      </button>
      
      <button 
        onClick={() => onBulkAction('feature')}
        className="text-xs bg-blue-950/40 text-blue-400 hover:bg-blue-900/50 hover:text-blue-300 px-4 py-2 rounded transition-colors"
      >
        Feature Selected
      </button>
    </div>
  );
}
