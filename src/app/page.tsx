export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="w-full max-w-lg space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Elwin</h1>
          <p className="text-muted leading-relaxed">
            Welcome to my corner of the internet.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Links
          </h2>
          <nav className="flex flex-col gap-2">
            <SocialLink href="https://github.com/elwin" label="GitHub" />
            <SocialLink
              href="https://x.com/"
              label="X (Twitter)"
            />
            <SocialLink
              href="mailto:hello@elwin.cc"
              label="Email"
            />
          </nav>
        </section>
      </main>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-foreground/5"
    >
      <span className="text-sm">{label}</span>
      <span className="text-muted transition-transform group-hover:translate-x-0.5">
        &rarr;
      </span>
    </a>
  );
}
