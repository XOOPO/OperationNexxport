// Language detection
export function detectLanguage(text: string): string {
  // Chinese detection
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return 'zh';
  }
  // Japanese detection
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
    return 'ja';
  }
  // Korean detection
  if (/[\uac00-\ud7af]/.test(text)) {
    return 'ko';
  }
  // Thai detection
  if (/[\u0e00-\u0e7f]/.test(text)) {
    return 'th';
  }
  // Arabic detection
  if (/[\u0600-\u06ff]/.test(text)) {
    return 'ar';
  }
  
  return 'en'; // Default to English
}

// Simple calculator
export function calculate(expression: string): string {
  try {
    // Remove any non-math characters for safety
    const sanitized = expression
      .replace(/[^0-9+\-*/().\s]/g, '')
      .trim();
    
    if (!sanitized) {
      return 'Invalid expression';
    }
    
    // Use Function constructor for safe evaluation
    const result = Function(`'use strict'; return (${sanitized})`)();
    
    if (typeof result === 'number' && !isNaN(result)) {
      return result.toString();
    }
    
    return 'Invalid calculation';
  } catch (error) {
    return 'Error in calculation';
  }
}

// Extract user first name from username
export function extractFirstName(username: string): string {
  // Remove prefix like PE_, BM_, WP_, M1_
  const nameWithoutPrefix = username.replace(/^[A-Z0-9]+_/, '');
  
  // Capitalize first letter, lowercase rest
  return nameWithoutPrefix.charAt(0).toUpperCase() + 
         nameWithoutPrefix.slice(1).toLowerCase();
}

// Translation responses (Chinese)
export const translations = {
  greeting: {
    en: (name: string) => `👋 Hello ${name}! I'm NICC BOT ASSISTANT. How can I help you?`,
    zh: (name: string) => `👋 你好 ${name}！我是 NICC 机器人助手。我能帮你什么？`
  },
  stockMail: {
    en: (count: number) => `📧 Found ${count} mail(s). Navigating to Stock Mail page...`,
    zh: (count: number) => `📧 找到 ${count} 封邮件。正在跳转到邮件库存页面...`
  },
  bankIssues: {
    en: (count: number) => `⚠️ Found ${count} bank issue(s).`,
    zh: (count: number) => `⚠️ 找到 ${count} 个银行问题。`
  },
  dailyReport: {
    en: (date: string) => `📊 Showing daily report for ${date}...`,
    zh: (date: string) => `📊 显示 ${date} 的每日报告...`
  },
  calculation: {
    en: (expr: string, result: string) => `🔢 **Calculation:**\n\n${expr} = **${result}**`,
    zh: (expr: string, result: string) => `🔢 **计算：**\n\n${expr} = **${result}**`
  },
  languageDetected: {
    en: (lang: string) => `🌐 Language detected: ${lang}`,
    zh: (lang: string) => `🌐 检测到的语言：${lang}`
  },
  help: {
    en: `I can help you with:
• 📊 Dashboard data queries
• 🏦 Bank information
• 📧 Stock mail management
• 💱 Translation (any language)
• 🔢 Calculator
• 🌐 Language detection

Try asking:
• "Send me new mail"
• "Calculate 25 + 75"
• "Translate to Chinese: Hello"
• "Show bank issues for yesterday"`,
    zh: `我可以帮助你：
• 📊 仪表板数据查询
• 🏦 银行信息
• 📧 邮件库存管理
• 💱 翻译（任何语言）
• 🔢 计算器
• 🌐 语言检测

试试问：
• "给我发新邮件"
• "计算 25 + 75"
• "翻译成中文：Hello"
• "显示昨天的银行问题"`
  },
  notFound: {
    en: "I'm not sure what you mean. Try asking about bank info, stock mail, or calculations.",
    zh: "我不确定你的意思。试试问关于银行信息、邮件库存或计算。"
  }
};

// Check if text contains calculation
export function isCalculation(text: string): boolean {
  const mathPattern = /(\d+\s*[\+\-\*\/]\s*\d+)|calculate|calc|计算/i;
  return mathPattern.test(text);
}

// Check if text is translation request
export function isTranslationRequest(text: string): boolean {
  const translationPattern = /translate|翻译|翻訳|번역/i;
  return translationPattern.test(text);
}

// Simple translation (for demo - in production use proper translation API)
export function simpleTranslate(text: string, targetLang: string): string {
  const commonPhrases: Record<string, Record<string, string>> = {
    'hello': {
      zh: '你好',
      ja: 'こんにちは',
      ko: '안녕하세요',
      es: 'hola',
      fr: 'bonjour',
      de: 'hallo'
    },
    'thank you': {
      zh: '谢谢',
      ja: 'ありがとう',
      ko: '감사합니다',
      es: 'gracias',
      fr: 'merci',
      de: 'danke'
    },
    'good morning': {
      zh: '早上好',
      ja: 'おはよう',
      ko: '좋은 아침',
      es: 'buenos días',
      fr: 'bonjour',
      de: 'guten morgen'
    },
    'goodbye': {
      zh: '再见',
      ja: 'さようなら',
      ko: '안녕히 가세요',
      es: 'adiós',
      fr: 'au revoir',
      de: 'auf wiedersehen'
    },
    'yes': {
      zh: '是',
      ja: 'はい',
      ko: '네',
      es: 'sí',
      fr: 'oui',
      de: 'ja'
    },
    'no': {
      zh: '不',
      ja: 'いいえ',
      ko: '아니요',
      es: 'no',
      fr: 'non',
      de: 'nein'
    }
  };
  
  const lowerText = text.toLowerCase().trim();
  
  if (commonPhrases[lowerText] && commonPhrases[lowerText][targetLang]) {
    return commonPhrases[lowerText][targetLang];
  }
  
  return `[Translation to ${targetLang}]: ${text} (Use Google Translate API for accurate translations)`;
}