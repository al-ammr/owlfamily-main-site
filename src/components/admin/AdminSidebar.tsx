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
  ChevronDown,
  ChevronsLeft
} from "lucide-react"
import { useAdminNavStore } from "@/store/adminNavStore"

const navGroups = [
  {
    title: "General",
    items: [
      { name: "Dashboard", href: "/admin", exact: true, icon: LayoutDashboard },
      { name: "Orders", href: "/admin/orders", exact: false, icon: ClipboardList, badge: 2 },
      { name: "Products", href: "/admin/products", exact: false, icon: Package },
      { name: "Customers", href: "/admin/customers", exact: false, icon: Users, badge: 4 },
    ]
  },
  {
    title: "Tools",
    items: [
      { name: "Categories", href: "/admin/categories", exact: false, icon: FolderOpen },
      { name: "Blog Posts", href: "/admin/blogs", exact: false, icon: PenTool },
      { name: "Media Library", href: "/admin/media", exact: false, icon: ImageIcon },
      { name: "Reviews", href: "/admin/reviews", exact: false, icon: Star, badge: 1 },
      { name: "Settings", href: "/admin/settings", exact: false, icon: Settings },
    ]
  }
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
          className="fixed inset-0 bg-[#000000]/40 z-[60] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[260px] bg-[#0A0F1C] md:bg-[#0D0D0D] border-r border-[#1E1E1E] flex flex-col z-[70] transition-transform duration-300 ease-in-out md:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo / Header Area */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F5F0E8] rounded-full flex items-center justify-center overflow-hidden grid grid-cols-2 grid-rows-2 gap-[2px] p-1">
               {/* Replicating the abstract logo in the reference */}
               <div className="bg-[#0A0F1C] md:bg-[#0D0D0D] w-full h-full rounded-tl-full"></div>
               <div className="bg-[#0A0F1C] md:bg-[#0D0D0D] w-full h-full rounded-tr-full"></div>
               <div className="bg-[#0A0F1C] md:bg-[#0D0D0D] w-full h-full rounded-bl-full"></div>
               <div className="bg-[#0A0F1C] md:bg-[#0D0D0D] w-full h-full rounded-br-full"></div>
            </div>
            <span className="font-sans font-bold text-[18px] tracking-wide text-[#F5F0E8]">Shopall</span>
          </div>
          <button 
            className="md:hidden text-[#9CA3AF] hover:text-[#F5F0E8] p-1.5 bg-[#141414] rounded-[6px] border border-[#1E1E1E] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ChevronsLeft size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-6 pt-2">
          {/* Store Selector Mock */}
          <div className="px-4 mb-8">
            <span className="px-2 font-sans text-[12px] text-[#6B7280] font-medium tracking-wide mb-3 block">Stores</span>
            <button className="w-full flex items-center justify-between bg-[#1F2937] md:bg-[#141414] border border-transparent hover:border-[#374151] p-2 rounded-[10px] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#3B82F6] rounded-[8px] flex items-center justify-center shadow-inner">
                  <span className="font-sans font-bold text-white text-[16px]">C</span>
                </div>
                <span className="font-sans text-[15px] text-[#F3F4F6] font-medium tracking-wide">Capstore</span>
              </div>
              <ChevronDown size={16} className="text-[#9CA3AF] mr-1" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-8">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="px-4">
                <span className="px-2 font-sans text-[12px] text-[#6B7280] font-medium tracking-wide mb-3 block">
                  {group.title}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = item.exact 
                      ? pathname === item.href 
                      : pathname.startsWith(item.href)
                    const Icon = item.icon

                    return (
                      <Link 
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[8px] font-sans text-[14.5px] font-medium transition-all duration-200 ${
                          isActive 
                            ? "bg-[#1E293B]/50 md:bg-[#1C1C1C] text-[#F3F4F6]" 
                            : "text-[#9CA3AF] hover:bg-[#1E293B]/30 md:hover:bg-[#141414] hover:text-[#F3F4F6]"
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px] opacity-80" />
                        {item.name}
                        {item.badge && (
                          <span className={`ml-auto px-2 py-0.5 rounded-[6px] text-[11px] font-bold flex items-center justify-center ${
                            isActive ? 'bg-[#3B82F6] text-white' : 'bg-[#3B82F6] text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
