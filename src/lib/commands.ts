export interface Command {
  name: string;
  description: string;
  url?: string;
  builtin?: boolean;
}

export const commands: Command[] = [
  { name: "github", description: "Open GitHub profile", url: "https://github.com/elwin" },
  { name: "x", description: "Open X (Twitter)", url: "https://x.com/" },
  { name: "email", description: "Send an email", url: "mailto:hello@elwin.cc" },
  { name: "help", description: "Show welcome message", builtin: true },
  { name: "clear", description: "Clear terminal", builtin: true },
];
