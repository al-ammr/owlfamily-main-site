export default function Template({ children }: { children: React.ReactNode }) {
  // Using Next.js Template guarantees this runs on every page change
  // but it *doesn't* destroy the parent layout DOM tree like key={pathname} does.
  return (
    <div className="animate-page-transition flex-grow flex flex-col w-full">
      {children}
    </div>
  );
}
