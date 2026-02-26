"use client";

import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from "react";
import { commands, type Command } from "@/lib/commands";
import { getResponse } from "@/lib/responses";
import ChatArea, { type ChatAreaHandle } from "./ChatArea";
import TerminalInput from "./TerminalInput";
import SlashCommandMenu from "./SlashCommandMenu";
import StatusBar from "./StatusBar";
import type { Message } from "./ChatMessage";
import styles from "./terminal.module.css";

let nextId = 0;

function welcomeMessage(): Message {
  return { id: nextId++, role: "welcome", text: "" };
}

function msg(role: Message["role"], text: string): Message {
  return { id: nextId++, role, text };
}

const initialMessages: Message[] = [
  welcomeMessage(),
  msg("user", "Hey Phantom, show them how this works"),
  msg(
    "system",
    'Easy — type / and a menu pops up with all available commands. Pick one or keep typing to filter. You can also just chat with me, I don\'t bite. *glances at own wireframe* ...I can\'t.',
  ),
  msg("user", "/github"),
  msg("system", "https://github.com/ElwinLiu"),
];

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [menuIndex, setMenuIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<ChatAreaHandle>(null);

  const showMenu = input.startsWith("/");
  const query = input.slice(1).toLowerCase();
  const filtered = showMenu
    ? commands.filter((c) => c.name.startsWith(query))
    : [];

  useEffect(() => {
    if (filtered.length > 0) {
      requestAnimationFrame(() => chatRef.current?.scrollToBottom());
    }
  }, [filtered.length]);

  const addMessage = useCallback((role: Message["role"], text: string) => {
    setMessages((prev) => [...prev, { id: nextId++, role, text }]);
  }, []);

  const executeCommand = useCallback(
    (cmd: Command) => {
      if (cmd.name === "help") {
        setMessages((prev) => [
          ...prev,
          { id: nextId++, role: "user", text: "/help" },
          welcomeMessage(),
        ]);
      } else if (cmd.name === "clear") {
        setMessages([]);
      } else {
        addMessage("user", `/${cmd.name}`);
        if (cmd.url) {
          addMessage("system", cmd.url);
        }
      }

      setInput("");
      setMenuIndex(0);
    },
    [addMessage],
  );

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (showMenu && filtered.length > 0) {
      executeCommand(filtered[menuIndex]);
      return;
    }

    if (trimmed.startsWith("/")) {
      const name = trimmed.slice(1).toLowerCase();
      const cmd = commands.find((c) => c.name === name);
      if (cmd) {
        executeCommand(cmd);
        return;
      }
      addMessage("user", trimmed);
      addMessage("error", `Unknown command: ${trimmed}`);
      addMessage("system", "Type /help to see available commands.");
      setInput("");
      return;
    }

    addMessage("user", trimmed);
    setInput("");

    setTimeout(() => {
      addMessage("system", getResponse(trimmed));
    }, 300 + Math.random() * 400);
  }, [input, showMenu, filtered, menuIndex, executeCommand, addMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!showMenu || filtered.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMenuIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setMenuIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setInput("");
        setMenuIndex(0);
      }
    },
    [showMenu, filtered.length],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      setMenuIndex(0);
    },
    [],
  );

  return (
    <div className={`${styles.terminalAmbient} flex h-screen w-full items-center justify-center overflow-hidden p-4 font-sans`}>
      <div
        className={`${styles.terminalGlass} relative flex w-full max-w-4xl max-h-[600px] flex-col overflow-hidden rounded-xl`}
        onMouseDown={(e) => {
          if (e.target !== inputRef.current) {
            const target = e.target as HTMLElement;
            if (target.closest("[data-selectable]")) return;
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {/* Title bar */}
        <div className="relative z-10 flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="flex-1 text-center text-xs font-mono text-term-muted tracking-wider">
            ELWIN.CC
          </span>
        </div>

        {/* Chat area */}
        <ChatArea ref={chatRef} messages={messages} />

        {/* Slash command menu + input */}
        <div className="relative mt-auto">
          <TerminalInput
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
          <SlashCommandMenu
            commands={filtered}
            selectedIndex={menuIndex}
            onSelect={executeCommand}
          />
        </div>

        {/* Status bar */}
        {filtered.length === 0 && <StatusBar />}
      </div>
    </div>
  );
}
