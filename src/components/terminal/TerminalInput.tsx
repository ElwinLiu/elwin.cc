import { forwardRef, type KeyboardEvent } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  function TerminalInput({ value, onChange, onSubmit, onKeyDown }, ref) {
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
      <span className="text-[#ef6f2f] font-bold text-[13.5px] shrink-0">&#10095;</span>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a command..."
        autoFocus
        className="flex-1 bg-transparent text-[13.5px] text-[#fafafa] placeholder:text-[#8a8380] outline-none caret-[#ef6f2f]"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
  },
);

export default TerminalInput;
