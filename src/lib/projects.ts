export interface Project {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Handless",
    tagline: "Speak. Transcribe. Done.",
    description:
      "Free, open-source macOS speech-to-text. Press a shortcut, speak, get text in any app. Run locally for privacy or use cloud APIs for speed.",
    url: "https://handless.elwin.cc",
    logo: "/handless-logo.png",
    tags: ["macOS", "Rust + React", "Local-first", "Open Source"],
  },
];
