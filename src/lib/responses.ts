interface ResponseRule {
  keywords: RegExp;
  responses: string[];
}

const rules: ResponseRule[] = [
  {
    keywords: /\b(hi|hello|hey|sup|yo|greetings|howdy)\b/i,
    responses: [
      "Hey there! I'm Elwin's cat assistant. Yes, I live in a terminal. Don't question it.",
      "Ahoy! Welcome to the terminal. Try a /command or just chat — I don't judge.",
      "Hello, human. I'm the cat in charge here. *purrs*",
    ],
  },
  {
    keywords: /\b(who|about|elwin)\b/i,
    responses: [
      "Elwin is a software engineer who let a cat run his website. Wise choice.",
      "I'm just the mascot. Elwin does the actual engineering. I do the vibes.",
      "Elwin writes code. I guard the terminal. We make a good team.",
    ],
  },
  {
    keywords: /\b(cat|kitten|kitty|meow|mascot|mochi|blob|creature)\b/i,
    responses: [
      "Yes, I'm a cat. An SVG cat, specifically. Practically immortal.",
      "*purrs* You noticed me! Click me for a surprise.",
      "I'm the cutest thing on this site and I know it.",
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
      "You're welcome. I accept payment in fish.",
      "No problem! That's what terminal cats are for.",
      "Anytime. :3",
    ],
  },
  {
    keywords: /\b(bye|goodbye|see ya|later|cya)\b/i,
    responses: [
      "See you around! I'll be here. Always here. Watching.",
      "Bye! Don't forget — /github if you want to see the code.",
      "Later! :3",
    ],
  },
];

const fallbacks = [
  "Interesting. I'm a cat, so I'll just stare at you blankly.",
  "I'd answer that, but my paws aren't great with nuance. Try a /command instead?",
  "That's above my pay grade. I'm literally a cat on a personal website.",
  "Hmm. I'll pretend I understood that perfectly.",
  "My neural net (two yarn balls and a whisker) couldn't parse that. Try again?",
  "I'm flattered you think a cat can help with that.",
  "*knocks your question off the table* ...sorry, instinct.",
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
