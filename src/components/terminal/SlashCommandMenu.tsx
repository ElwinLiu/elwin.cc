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
    <div className="grid grid-cols-[auto_1fr] mt-1 pb-3" style={{ paddingLeft: "calc(1.25rem + 8px + 10px)", paddingRight: "1.25rem" }}>
      {commands.map((cmd, i) => {
        const selected = i === selectedIndex;
        return (
          <button
            key={cmd.name}
            onClick={() => onSelect(cmd)}
            className="contents text-left text-sm"
          >
            <span className={`font-mono py-0.5 pr-8 transition-colors ${selected ? "text-term-accent" : "text-term-muted"}`}>
              /{cmd.name}
            </span>
            <span className={`font-mono py-0.5 truncate transition-colors ${selected ? "text-term-accent" : "text-term-muted"}`}>
              {cmd.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
