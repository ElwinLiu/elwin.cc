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
    <div className="px-5 py-3 flex items-center gap-2.5 font-mono">
      <span className="text-[#ebdeb2] font-bold text-[13.5px] shrink-0">&#10095;</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a command..."
        autoFocus
        className="flex-1 bg-transparent text-[13.5px] text-[#ebdeb2] placeholder:text-[#7d7d85] outline-none caret-[#ebdeb2]"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
