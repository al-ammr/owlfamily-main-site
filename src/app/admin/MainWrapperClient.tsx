"use client";

import { usePathname } from "next/navigation";

export function MainWrapperClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname === '/admin/sign-in';

  return (
    <main className={`flex-1 flex flex-col ${!isSignIn ? 'ml-[240px] p-8' : ''}`}>
      {children}
    </main>
  );
}
