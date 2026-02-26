export interface Message {
  id: number;
  role: "user" | "system" | "error" | "welcome";
  text: string;
}

const URL_REGEX = /(https?:\/\/[^\s]+|mailto:[^\s]+)/g;

function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);
  return (
    <>
      {parts.map((part, i) =>
        URL_REGEX.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-term-accent underline underline-offset-2 hover:brightness-125"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

import WelcomeCard from "./WelcomeCard";
import styles from "./terminal.module.css";

export default function ChatMessage({ message }: { message: Message }) {
  if (message.role === "welcome") {
    return <WelcomeCard />;
  }

  if (message.role === "user") {
    const isClear = message.text.trim() === "/clear";
    const isImage = message.text.includes("[Image");
    const hasSubtext = isClear || isImage;

    return (
      <div className="flex flex-col gap-1 text-[13.5px] mt-3 mb-1 font-mono">
        <div className="flex gap-2.5 text-[#fafafa] py-1.5 w-full">
          <span className="font-bold text-[#ef6f2f] shrink-0 select-none">&#10095;</span>
          <span className={`whitespace-pre-wrap leading-relaxed ${styles.glowWaveText}`}>{message.text}</span>
        </div>
        {hasSubtext && (
          <div className="flex gap-3 text-[#8a8380] ml-[3px]">
            <span className="select-none text-base leading-none translate-y-[2px]">&#9492;</span>
            <span className="whitespace-pre-wrap">
              {isClear ? "(no content)" : "[Image #2]"}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (message.role === "error") {
    return (
      <div className="flex gap-2.5 text-[13.5px] mt-3 mb-1">
        <span className="text-[#ff5f57] shrink-0 text-xs translate-y-[3px] font-mono">&#9679;</span>
        <div className="flex-1 whitespace-pre-wrap text-[#ff5f57] leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }

  const isSuccess =
    message.text.startsWith("Read ") ||
    message.text.startsWith("Explore") ||
    message.text.startsWith("Done");
  const dotColor = isSuccess ? "text-[#28c840]" : "text-[#fafafa]";

  return (
    <div className="flex gap-2.5 text-[13.5px] mt-3 mb-1">
      <span className={`${dotColor} shrink-0 text-xs translate-y-[3px]`}>&#9679;</span>
      <div data-selectable className="flex-1 whitespace-pre-wrap text-[#fafafa] leading-relaxed cursor-text select-text">
        <Linkify text={message.text} />
      </div>
    </div>
  );
}
