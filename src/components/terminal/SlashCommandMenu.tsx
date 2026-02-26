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
    <div className="mx-4 mt-1 rounded border border-term-border bg-term-surface overflow-hidden">
      {commands.map((cmd, i) => (
        <button
          key={cmd.name}
          onClick={() => onSelect(cmd)}
          className={`flex w-full items-center gap-3 px-3 py-1 text-left text-sm transition-colors ${
            i === selectedIndex
              ? "text-term-accent"
              : "text-term-fg"
          }`}
        >
          <span className="font-mono">/{cmd.name}</span>
          <span className={`text-xs ${i === selectedIndex ? "text-term-accent/60" : "text-term-muted"}`}>{cmd.description}</span>
        </button>
      ))}
    </div>
  );
}
