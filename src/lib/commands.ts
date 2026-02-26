export interface Command {
  name: string;
  label?: string;
  description: string;
  url?: string;
  builtin?: boolean;
}

export const commands: Command[] = [
  { name: "github", label: "GitHub", description: "Open GitHub profile", url: "https://github.com/ElwinLiu" },
  { name: "x", label: "X / Twitter", description: "Open X (Twitter)", url: "https://x.com/elwin1116" },
  { name: "email", label: "Email", description: "Send an email", url: "mailto:elwin1116@gmail.com" },
  { name: "help", description: "Show welcome message", builtin: true },
  { name: "clear", description: "Clear terminal", builtin: true },
];
