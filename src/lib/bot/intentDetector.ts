import { intents, IntentType } from './intents';

export function detectIntent(message: string): IntentType | 'UNKNOWN' {
  const msg = message.toLowerCase();
  const originalMsg = message; // Keep original for Chinese/non-Latin characters
  
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      // Check both lowercase and original message for better matching
      return msg.includes(lowerKeyword) || originalMsg.includes(keyword);
    })) {
      return intent as IntentType;
    }
  }
  
  return 'UNKNOWN';
}