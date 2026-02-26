import * as d from "./dialogue";

interface ResponseRule {
  keywords: RegExp;
  responses: string[];
}

const rules: ResponseRule[] = [
  { keywords: /\b(hi|hello|hey|sup|yo|greetings|howdy|hola|what'?s up)\b/i, responses: d.greetings },
  { keywords: /\b(who|about|elwin)\b/i, responses: d.about },
  { keywords: /\b(fox|phantom|ghost|spirit|mascot|creature|entity|wireframe)\b/i, responses: d.identity },
  { keywords: /\b(help|commands?|what can)\b/i, responses: d.help },
  { keywords: /\b(thanks?|thank you|thx|ty|cheers)\b/i, responses: d.thanks },
  { keywords: /\b(bye|goodbye|see ya|later|cya|farewell)\b/i, responses: d.goodbye },
  { keywords: /\b(cool|nice|awesome|cute|pretty|beautiful|love it|amazing|great)\b/i, responses: d.compliments },
  { keywords: /\b(ugly|bad|hate|stupid|dumb|suck|worst|lame)\b/i, responses: d.insults },
  { keywords: /\b(meaning|alive|conscious|feel|think|exist|purpose|why)\b/i, responses: d.existential },
  { keywords: /\b(tech|stack|built|made|code|react|canvas|how)\b/i, responses: d.tech },
  { keywords: /\b(bored|boring|nothing|meh|whatever)\b/i, responses: d.bored },
  { keywords: /\b(love|marry|date|crush|heart)\b/i, responses: d.love },
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
  return pick(d.fallbacks);
}
