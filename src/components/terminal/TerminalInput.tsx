import { type KeyboardEvent } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
}: TerminalInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
      return;
    }
    onKeyDown(e);
  }

  return (
    <div className="mx-4 mb-3 flex items-center gap-2 rounded border border-term-border px-3 py-2.5">
      <span className="text-term-prompt text-sm shrink-0">&#10095;</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a command..."
        autoFocus
        className="flex-1 bg-transparent text-sm text-term-fg placeholder:text-term-muted/50 outline-none font-mono caret-term-fg"
      />
    </div>
  );
}
