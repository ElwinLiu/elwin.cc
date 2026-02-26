"use client";

import { useState, useCallback, type KeyboardEvent } from "react";
import { commands, type Command } from "@/lib/commands";
import { getResponse } from "@/lib/responses";
import ChatArea from "./ChatArea";
import TerminalInput from "./TerminalInput";
import SlashCommandMenu from "./SlashCommandMenu";
import StatusBar from "./StatusBar";
import type { Message } from "./ChatMessage";

let nextId = 0;

function welcomeMessage(): Message {
  return { id: nextId++, role: "welcome", text: "" };
}

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage()]);
  const [input, setInput] = useState("");
  const [menuIndex, setMenuIndex] = useState(0);

  const showMenu = input.startsWith("/");
  const query = input.slice(1).toLowerCase();
  const filtered = showMenu
    ? commands.filter((c) => c.name.startsWith(query))
    : [];

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
    <div className="flex h-screen w-full items-center justify-center p-4 font-mono">
      <div className="flex w-full max-w-4xl max-h-[520px] flex-col overflow-hidden rounded-lg border border-term-border bg-term-bg shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-term-border bg-term-surface px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 text-center text-xs text-term-muted tracking-wider">
            ELWIN.CC
          </span>
        </div>

        {/* Chat area */}
        <ChatArea messages={messages} />

        {/* Slash command menu + input */}
        <div className="relative mt-auto">
          <SlashCommandMenu
            commands={filtered}
            selectedIndex={menuIndex}
            onSelect={executeCommand}
          />
          <TerminalInput
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Status bar */}
        <StatusBar />
      </div>
    </div>
  );
}
