import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import ChatMessage, { type Message } from "./ChatMessage";

export interface ChatAreaHandle {
  scrollToBottom: () => void;
}

const ChatArea = forwardRef<ChatAreaHandle, { messages: Message[] }>(
  function ChatArea({ messages }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      const el = containerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    };

    useImperativeHandle(ref, () => ({ scrollToBottom }));

    useEffect(scrollToBottom, [messages]);

    return (
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
    );
  },
);

export default ChatArea;
