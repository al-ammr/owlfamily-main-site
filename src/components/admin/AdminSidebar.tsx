'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  ClipboardList, 
  PenTool, 
  Image as ImageIcon, 
  Users, 
  Star,
  Settings,
  LogOut,
  X
} from "lucide-react"
import { useAdminNavStore } from "@/store/adminNavStore"

const navItems = [
  { name: "Dashboard", href: "/admin", exact: true, icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", exact: false, icon: ClipboardList },
  { name: "Products", href: "/admin/products", exact: false, icon: Package },
  { name: "Customers", href: "/admin/customers", exact: false, icon: Users },
  { name: "Categories", href: "/admin/categories", exact: false, icon: FolderOpen },
  { name: "Blog Posts", href: "/admin/blogs", exact: false, icon: PenTool },
  { name: "Media Library", href: "/admin/media", exact: false, icon: ImageIcon },
  { name: "Reviews", href: "/admin/reviews", exact: false, icon: Star },
  { name: "Settings", href: "/admin/settings", exact: false, icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { mobileMenuOpen, setMobileMenuOpen } = useAdminNavStore()

  if (pathname === '/admin/sign-in') return null

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 shrink-0">
          <Link 
            href="/admin" 
            className="text-xl font-bold text-white tracking-wider hover:text-[#d29a5a] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            OWL FAMILY<span className="text-[#d29a5a]">.</span>
          </Link>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-[#d29a5a] text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-800 shrink-0">
          <Link 
            href="/admin/sign-out"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  )
}
