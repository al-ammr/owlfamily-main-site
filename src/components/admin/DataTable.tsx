"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  searchKey,
  onRowClick 
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof T, direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchKey) return true;
    const value = item[searchKey];
    if (typeof value === 'string') {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="w-full flex flex-col">
      {searchKey && (
        <div className="relative mb-6 w-full max-w-sm">
          <input
            type="text"
            placeholder={`Search by ${String(searchKey)}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 bg-[#141414] border border-[#333] rounded-[6px] pl-10 pr-4 text-[#F5F0E8] font-mono text-xs outline-none focus:border-[#B45309] transition-colors"
          />
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-[8px] border border-[#1E1E1E] bg-[#141414]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1E1E1E] bg-[#0D0D0D]">
              {columns.map((col) => (
                <th 
                  key={String(col.key)} 
                  className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] cursor-pointer hover:text-[#F5F0E8] transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {sortConfig?.key === col.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr 
                  key={item.id || index} 
                  className={`border-b border-[#1E1E1E] last:border-0 hover:bg-[#1A1A1A] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4 font-serif text-[15px] text-[#F5F0E8]">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center font-mono text-[11px] text-[#9CA3AF] uppercase tracking-widest">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
