interface ResponseRule {
  keywords: RegExp;
  responses: string[];
}

const rules: ResponseRule[] = [
  {
    keywords: /\b(hi|hello|hey|sup|yo|greetings|howdy)\b/i,
    responses: [
      "Hey there! I'm Elwin's lobster assistant. Yes, a lobster. Don't question it.",
      "Ahoy! Welcome to the terminal. Try a /command or just chat — I don't judge.",
      "Hello, human. I'm the crustacean in charge here.",
    ],
  },
  {
    keywords: /\b(who|about|elwin)\b/i,
    responses: [
      "Elwin is a software engineer who let a lobster run his website. Bold choice.",
      "I'm just the mascot. Elwin does the actual engineering. I do the vibes.",
      "Elwin writes code. I guard the terminal. We make a good team.",
    ],
  },
  {
    keywords: /\b(lobster|crab|shrimp|crustacean|mascot)\b/i,
    responses: [
      "I'm a lobster, not a crab. We've been over this.",
      "Yes, I'm a lobster. No, I don't know why either. But here we are.",
      "Technically I'm an SVG lobster. Practically immortal.",
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
      "You're welcome. I accept payment in plankton.",
      "No problem! That's what terminal lobsters are for.",
      "Anytime. 🦞",
    ],
  },
  {
    keywords: /\b(bye|goodbye|see ya|later|cya)\b/i,
    responses: [
      "See you around! I'll be here. Always here. Watching.",
      "Bye! Don't forget — /github if you want to see the code.",
      "Later! 🦞",
    ],
  },
];

const fallbacks = [
  "Interesting. I'm a lobster, so I'll just nod along.",
  "I'd answer that, but my claws aren't great with nuance. Try a /command instead?",
  "That's above my pay grade. I'm literally a crustacean on a personal website.",
  "Hmm. I'll pretend I understood that perfectly.",
  "My neural net (two rubber bands and a shell) couldn't parse that. Try again?",
  "I'm flattered you think a lobster can help with that.",
  "*clicks claws thoughtfully* ...I got nothing.",
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
