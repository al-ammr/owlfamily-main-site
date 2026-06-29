"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/sign-in') return null;

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/sign-in");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <header className="h-16 bg-[#141414] border-b border-[#1E1E1E] flex items-center justify-between px-8 ml-[240px] sticky top-0 z-40">
      <div className="font-mono text-[11px] text-[#9CA3AF] tracking-widest uppercase">
        {/* Simple breadcrumb or dynamic title could go here */}
        Dashboard
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

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-mono text-[11px] uppercase tracking-widest hidden md:block">
            Sign Out
          </span>
        </button>
      </div>
    </header>
  );
}
