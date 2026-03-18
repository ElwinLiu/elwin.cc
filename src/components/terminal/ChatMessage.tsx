import Image from "next/image";
import WelcomeCard from "./WelcomeCard";
import { projects } from "@/lib/projects";
import styles from "./terminal.module.css";

export interface Message {
  id: number;
  role: "user" | "system" | "error" | "welcome" | "projects";
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

export default function ChatMessage({ message }: { message: Message }) {
  if (message.role === "welcome") {
    return <WelcomeCard />;
  }

  if (message.role === "projects") {
    return (
      <div className="my-3 space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-term-muted">
          <span className="text-[#28c840]">&#9679;</span>
          <span>
            Found {projects.length} project{projects.length !== 1 && "s"}
          </span>
        </div>
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-selectable
            className="group block rounded-lg border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 transition-all duration-300 hover:border-term-accent/30 hover:shadow-[0_0_30px_-8px_rgba(239,111,47,0.15)]"
          >
            <div className="flex items-start gap-4">
              {/* Logo with glow */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-xl bg-term-accent/10 blur-lg transition-all duration-300 group-hover:bg-term-accent/20" />
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={48}
                  height={48}
                  className="relative rounded-xl"
                />
              </div>

              <div className="min-w-0 flex-1">
                {/* Name + version */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium text-term-fg transition-colors group-hover:text-term-accent">
                    {project.name}
                  </span>
                  <span className="rounded border border-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-term-muted/40">
                    v{project.version}
                  </span>
                </div>

                {/* Tagline */}
                <div className="mt-0.5 font-mono text-xs italic text-term-accent/50">
                  {project.tagline}
                </div>

                {/* Description */}
                <p className="mt-2 text-xs leading-relaxed text-term-muted">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-term-muted/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* URL */}
                <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-term-accent/40 transition-colors group-hover:text-term-accent/80">
                  <span>{project.url.replace("https://", "")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
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
