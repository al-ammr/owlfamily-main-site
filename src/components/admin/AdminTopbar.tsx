'use client'

import { usePathname } from "next/navigation"
import { LogOut, User, Menu } from "lucide-react"
import { useAdminNavStore } from "@/store/adminNavStore"

export function AdminTopbar() {
  const pathname = usePathname()
  const toggleMobileMenu = useAdminNavStore((s) => s.toggleMobileMenu)

  if (pathname === '/admin/sign-in') return null

  // Format breadcrumb from pathname
  const pathParts = pathname.split('/').filter(p => p !== 'admin' && p !== '')
  const title = pathParts.length > 0 
    ? pathParts[pathParts.length - 1].replace(/-/g, ' ') 
    : 'Dashboard'

  return (
    <header className="h-16 bg-[#0D0D0D] border-b border-[#1E1E1E] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors p-1 -ml-1"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">
          {title}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#F5F0E8]">
            <User className="w-4 h-4" />
          </div>
          <span className="font-mono text-[11px] text-[#F5F0E8] tracking-widest hidden md:block">
            Admin User
          </span>
        </div>

        <div className="w-[1px] h-6 bg-[#1E1E1E]" />

        {/* Note: In layout, sign out should be handled via the API route, or a standard link */}
        <a 
          href="/api/admin/sign-out"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-mono text-[11px] uppercase tracking-widest hidden md:block">
            Sign Out
          </span>
        </a>
      </div>
    </header>
  )
}
