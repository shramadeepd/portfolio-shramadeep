import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-site flex min-h-[70vh] flex-col items-start justify-center pt-28 pb-24">
      <p className="mono-label">404 — not found</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">
        This node doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        The page you&apos;re looking for isn&apos;t in the graph. Try one of
        the sections instead.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        back to home
      </Link>
    </main>
  );
}