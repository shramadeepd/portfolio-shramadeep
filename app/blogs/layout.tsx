import { Nav, ScrollProgress } from "@/components/Nav";

export default function BlogsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-noise relative min-h-screen bg-ink">
      <ScrollProgress />
      <Nav />
      {children}
    </div>
  );
}
