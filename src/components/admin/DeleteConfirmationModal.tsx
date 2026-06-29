import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
  isBulk?: boolean;
}

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  productName,
  isBulk = false 
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#0D0D0D] border border-[#242424] rounded-xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold mb-3 font-[var(--font-display)] tracking-wider text-[#F5F0E8]">Confirm Deletion</h3>
        <p className="text-[#C8C0B0] text-sm mb-8 leading-relaxed">
          {isBulk 
            ? 'Are you sure you want to delete all selected products? This action cannot be undone and will permanently remove them from the store.'
            : `Are you sure you want to delete "${productName}"? This action cannot be undone and will permanently remove it from the store.`
          }
        </p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm rounded-md hover:bg-[#1A1A1A] text-[#E8E0D0] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-5 py-2.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
