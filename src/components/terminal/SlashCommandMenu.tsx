import { type Command } from "@/lib/commands";

interface SlashCommandMenuProps {
  commands: Command[];
  selectedIndex: number;
  onSelect: (cmd: Command) => void;
}

export default function SlashCommandMenu({
  commands,
  selectedIndex,
  onSelect,
}: SlashCommandMenuProps) {
  if (commands.length === 0) return null;

  return (
    <div className="absolute bottom-full left-4 right-4 mb-1 rounded border border-term-border bg-term-surface overflow-hidden">
      {commands.map((cmd, i) => (
        <button
          key={cmd.name}
          onClick={() => onSelect(cmd)}
          className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
            i === selectedIndex
              ? "bg-term-accent/10 text-term-accent"
              : "text-term-fg hover:bg-term-border/30"
          }`}
        >
          <span className="font-mono text-term-accent">/{cmd.name}</span>
          <span className="text-term-muted text-xs">{cmd.description}</span>
        </button>
      ))}
    </div>
  );
}
