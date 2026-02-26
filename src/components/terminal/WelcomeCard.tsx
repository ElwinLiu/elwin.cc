import Mascot from "@/components/Mascot";
import { commands } from "@/lib/commands";

export default function WelcomeCard() {
  return (
    <fieldset className="rounded border border-solid border-[#ef6f2f]/40 px-4 pb-4 pt-2">
      <legend className="px-2 text-sm font-mono text-term-accent">elwin.cc</legend>
      <div className="flex gap-6">
        {/* Left: mascot + identity */}
        <div className="flex flex-col items-center gap-2 py-2">
          <p className="text-sm font-bold text-term-fg">Welcome!</p>
          <Mascot className="w-20 h-20" />
          <div className="text-center text-xs font-mono text-term-muted">
            <p>Free Model &middot; Phantom</p>
            <p>~/elwin.cc</p>
          </div>
        </div>

        <div className="w-px bg-[#ef6f2f]/30 self-stretch" />

        {/* Right: commands */}
        <div className="flex-1 space-y-3 py-2">
          <p className="text-sm font-semibold text-term-accent">Available commands</p>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {commands.map((cmd) => (
              <div key={cmd.name} className="contents">
                <span className="text-term-fg font-mono">/{cmd.name}</span>
                <span className="text-term-muted">{cmd.description}</span>
              </div>
            ))}
          </div>
          <hr className="border-term-border" />
          <p className="text-xs text-term-muted">
            Type <span className="text-term-accent">/</span> to see autocomplete suggestions.
          </p>
        </div>
      </div>
    </fieldset>
  );
}
