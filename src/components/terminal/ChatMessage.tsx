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

export default function ChatMessage({ message }: { message: Message }) {
  if (message.role === "welcome") {
    return <WelcomeCard />;
  }

  if (message.role === "user") {
    return (
      <div className="flex gap-2 text-sm">
        <span className="text-term-prompt shrink-0">&#10095;</span>
        <span className="text-term-fg">{message.text}</span>
      </div>
    );
  }

  if (message.role === "error") {
    return (
      <div className="text-sm text-term-red">{message.text}</div>
    );
  }

  return (
    <div className="text-sm text-term-fg">
      <Linkify text={message.text} />
    </div>
  );
}
