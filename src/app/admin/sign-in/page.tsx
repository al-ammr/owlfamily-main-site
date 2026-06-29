"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminSignIn() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  // Check lockout status on mount and when it changes
  useEffect(() => {
    if (lockedUntil && Date.now() < lockedUntil) {
      const timer = setTimeout(() => {
        setLockedUntil(null);
        setAttempts(0);
        setError(null);
      }, lockedUntil - Date.now());
      return () => clearTimeout(timer);
    } else if (lockedUntil && Date.now() >= lockedUntil) {
      setLockedUntil(null);
      setAttempts(0);
      setError(null);
    }
  }, [lockedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockedUntil && Date.now() < lockedUntil) {
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          const lockoutTime = Date.now() + 15 * 60 * 1000; // 15 minutes
          setLockedUntil(lockoutTime);
          setError("Too many attempts. Please wait 15 minutes.");
        } else {
          setError(data.error || "Invalid credentials. Please try again.");
        }
      } else {
        // Success
        setAttempts(0);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  return (
    <main className="relative min-h-screen w-full bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
      {/* CSS Noise texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/textures/noise.png')] bg-repeat"
        aria-hidden="true"
      />

      <div 
        className="relative z-10 w-[400px] h-[480px] bg-[#141414] p-12 rounded-[12px] flex flex-col"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
      >
        {/* 1. Logo Section */}
        <div className="text-center font-display text-[28px] tracking-wider uppercase mb-1">
          <span className="text-[#F5F0E8]">OWL </span>
          <span className="text-[#B45309]">FAMILY</span>
        </div>

        {/* 2. Subtitle */}
        <div className="text-center font-mono text-[11px] text-[#9CA3AF] tracking-[0.3em] uppercase">
          Admin Portal
        </div>

        {/* 3. Divider */}
        <div className="w-10 h-[1px] bg-[#B45309] mx-auto my-6" />

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          {/* 4. Email Field */}
          <div className="mb-4">
            <label className="block font-mono text-[11px] text-[#9CA3AF] mb-1.5 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@owlfamily.com"
              disabled={isLocked || loading}
              className={`w-full h-[44px] bg-[#1A1A1A] text-[#F5F0E8] font-mono text-xs px-4 outline-none transition-colors border ${
                error && attempts > 0 && !isLocked ? "border-[#EF4444]" : "border-transparent focus:border-[#B45309]"
              } disabled:opacity-50`}
            />
          </div>

          {/* 5. Password Field */}
          <div className="mb-4 relative">
            <label className="block font-mono text-[11px] text-[#9CA3AF] mb-1.5 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked || loading}
                className={`w-full h-[44px] bg-[#1A1A1A] text-[#F5F0E8] font-mono text-xs px-4 pr-10 outline-none transition-colors border ${
                  error && attempts > 0 && !isLocked ? "border-[#EF4444]" : "border-transparent focus:border-[#B45309]"
                } disabled:opacity-50`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked || loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 font-mono text-[11px] text-[#EF4444] text-center tracking-wide">
              {error}
            </div>
          )}

          {/* 6. Remember Me Checkbox */}
          <div className="flex items-center gap-2 mb-6 mt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLocked || loading}
              className="w-3.5 h-3.5 accent-[#B45309] bg-[#1A1A1A] border-none cursor-pointer disabled:opacity-50"
            />
            <label htmlFor="remember" className="font-mono text-[11px] text-[#9CA3AF] cursor-pointer tracking-widest uppercase">
              Remember me
            </label>
          </div>

          {/* 7. Sign In Button */}
          <button
            type="submit"
            disabled={isLocked || loading}
            className="w-full h-[44px] bg-[#B45309] hover:bg-[#92400E] text-[#F5F0E8] font-mono text-[12px] uppercase tracking-widest rounded-[6px] transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>

          {/* 8. Forgot Password Link */}
          <div className="mt-auto text-center pt-4">
            <button
              type="button"
              className="font-mono text-[11px] text-[#9CA3AF] hover:text-[#F5F0E8] transition-colors tracking-widest uppercase"
              onClick={() => alert("Contact system administrator to reset password.")}
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
