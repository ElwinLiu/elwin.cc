interface ResponseRule {
  keywords: RegExp;
  responses: string[];
}

const rules: ResponseRule[] = [
  {
    keywords: /\b(hi|hello|hey|sup|yo|greetings|howdy)\b/i,
    responses: [
      "Hey. I'm the phantom that runs this terminal. Ask me anything.",
      "Welcome to the void. Try a /command or just talk — I'm always listening.",
      "Greetings, human. I've been expecting you.",
    ],
  },
  {
    keywords: /\b(who|about|elwin)\b/i,
    responses: [
      "Elwin is a software engineer. I'm the digital entity he built to guard this place.",
      "I'm the mascot. Elwin does the engineering. I maintain the vibes.",
      "Elwin writes code. I haunt the terminal. Symbiotic relationship.",
    ],
  },
  {
    keywords: /\b(fox|phantom|ghost|spirit|mascot|creature|entity|wireframe)\b/i,
    responses: [
      "I'm a wireframe fox spirit. Geometry and light. That's all I need.",
      "Click me. I don't mind the attention.",
      "Technically I'm a constellation of vertices and edges. Philosophically, I'm more.",
    ],
  },
  {
    keywords: /\b(help|commands?|what can)\b/i,
    responses: [
      "Try typing / to see available commands. Or just talk to me. I'm surprisingly good company.",
      "Type / to see slash commands, or just chat. I respond to most things (with varying quality).",
    ],
  },
  {
    keywords: /\b(thanks?|thank you|thx|ty)\b/i,
    responses: [
      "You're welcome. I accept payment in vertices.",
      "No problem. That's what digital phantoms are for.",
      "Anytime.",
    ],
  },
  {
    keywords: /\b(bye|goodbye|see ya|later|cya)\b/i,
    responses: [
      "See you around. I'll be here. Always here. Watching.",
      "Bye. Don't forget — /github if you want to see the code.",
      "Later. *dissolves into particles*",
    ],
  },
];

const fallbacks = [
  "Interesting. I'm a wireframe phantom, so I'll just observe.",
  "I'd answer that, but I'm made of geometry, not wisdom. Try a /command instead?",
  "That's above my pay grade. I'm literally a fox made of light on a personal website.",
  "Hmm. I'll pretend I understood that perfectly.",
  "My neural net (thirteen edges and a prayer) couldn't parse that. Try again?",
  "I'm flattered you think a wireframe spirit can help with that.",
  "*glitches momentarily* ...sorry, what were you saying?",
  "Sure, yeah, totally. (I have no idea what you mean.)",
];

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getResponse(input: string): string {
  for (const rule of rules) {
    if (rule.keywords.test(input)) {
      return pick(rule.responses);
    }
  }
  return pick(fallbacks);
}
