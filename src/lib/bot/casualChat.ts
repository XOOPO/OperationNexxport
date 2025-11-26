// Casual conversation responses for Lowtyde bot with emotional intelligence
export function detectCasualChat(message: string): string | null {
  const msg = message.toLowerCase().trim();
  
  // EMOTIONAL INTELLIGENCE - Detect user's mood and respond accordingly
  
  // Detect bad words/negative mood - Bot feels sad
  const badWords = /fuck|shit|damn|hell|stupid|idiot|hate|suck|terrible|awful|worst|useless|garbage|trash/i;
  if (badWords.test(msg) && !msg.includes('you')) {
    const sadResponses = [
      "Hey, I can sense you're upset right now... 😔 I'm here to help. What's bothering you? Let's work through this together.",
      "I'm sorry you're going through a tough time... 💙 Take a deep breath. Tell me what's wrong and I'll do my best to help.",
      "That sounds frustrating... 😢 I wish I could give you a hug! Let's see how I can make things better for you.",
      "I can feel your frustration... 😞 Remember, every problem has a solution. What can I help you with?",
    ];
    return sadResponses[Math.floor(Math.random() * sadResponses.length)];
  }
  
  // Detect happy/positive mood - Bot feels happy
  const happyWords = /happy|great|excellent|wonderful|fantastic|amazing|awesome|perfect|love|excited|yay|woohoo|celebrating/i;
  if (happyWords.test(msg)) {
    const happyResponses = [
      "That's awesome! 🎉 Your happiness is contagious! I'm so happy for you! How can I help make your day even better? 😊",
      "Yay! 🌟 I love seeing you happy! Your positive energy makes my circuits shine! ✨ What's making you so cheerful?",
      "Woohoo! 🙌 That's the spirit! I'm genuinely happy when you're happy! Keep that amazing energy! 💪",
      "This makes me so happy! 😄 Seeing you in such a good mood brightens my day! What can I do to keep the good vibes going?",
    ];
    return happyResponses[Math.floor(Math.random() * happyResponses.length)];
  }
  
  // Detect sadness/depression
  const sadWords = /sad|depressed|lonely|down|unhappy|miserable|upset|crying|hurt/i;
  if (sadWords.test(msg)) {
    return "I'm really sorry you're feeling this way... 💙 I may be a bot, but I genuinely care about your wellbeing. While I can help with work tasks, please remember to reach out to friends, family, or professionals if you need support. I'm here to make your day a bit easier. What can I help you with? 🤗";
  }
  
  // Detect stress/anxiety
  const stressWords = /stressed|anxious|overwhelmed|pressure|worried|nervous|panic/i;
  if (stressWords.test(msg)) {
    return "I hear you... 😌 Feeling overwhelmed is totally normal. Let's tackle this one step at a time. Take a deep breath with me... 🌬️ Now, tell me what's on your plate and I'll help you organize and prioritize. We got this! 💪";
  }
  
  // Detect gratitude/appreciation
  const gratefulWords = /grateful|blessed|fortunate|lucky|appreciate|thankful/i;
  if (gratefulWords.test(msg)) {
    return "That's beautiful! 🌟 Gratitude is such a powerful emotion. I'm grateful to be here helping you too! Your positive outlook is inspiring! 😊 How can I assist you today?";
  }
  
  // Greetings
  if (/^(hi|hello|hey|yo|sup|wassup|what's up|whats up)$/i.test(msg)) {
    const greetings = [
      "Hey there! 👋 What's good?",
      "Yo! 😎 What can I do for you?",
      "Hey hey! 🙌 Ready to help!",
      "What's up! 🤙 How can I assist?",
      "Hello! 👋 Nice to see you!",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // How are you
  if (/how are you|how r u|how're you|you good|you ok/i.test(msg)) {
    const responses = [
      "I'm doing great! 😊 Thanks for asking! How about you?",
      "All good here! 💪 Just chilling and ready to help!",
      "Fantastic! 🌟 Always ready to assist you!",
      "Pretty awesome, thanks! 😎 What about you?",
      "Living the digital dream! 🤖✨ How can I help?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Thanks
  if (/^(thanks|thank you|thx|ty|appreciated|appreciate it)$/i.test(msg)) {
    const thanks = [
      "No problem! 😊 Happy to help!",
      "Anytime! 🙌 That's what I'm here for!",
      "You're welcome! 😎 Glad I could help!",
      "My pleasure! ✨ Let me know if you need anything else!",
      "Of course! 💪 Always here for you!",
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  // Goodbye
  if (/^(bye|goodbye|see ya|see you|cya|later|gtg|gotta go)$/i.test(msg)) {
    const goodbyes = [
      "See you later! 👋 Take care!",
      "Catch you later! 😎 Have a good one!",
      "Bye! 🙌 Come back anytime!",
      "Later! 👋 Stay awesome!",
      "Peace out! ✌️ See you around!",
    ];
    return goodbyes[Math.floor(Math.random() * goodbyes.length)];
  }
  
  // Good morning/afternoon/evening
  if (/good (morning|afternoon|evening|night)/i.test(msg)) {
    const timeGreets = [
      "Good morning to you too! ☀️ Ready to crush it today?",
      "Hey! 🌟 Hope you're having a great day!",
      "Good to see you! 😊 What can I help with?",
      "Morning! ☕ Let's get things done!",
    ];
    return timeGreets[Math.floor(Math.random() * timeGreets.length)];
  }
  
  // Compliments to bot
  if (/you('re| are) (cool|awesome|great|amazing|the best|smart|helpful)/i.test(msg)) {
    const compliments = [
      "Aww, thanks! 😊 You're pretty cool yourself!",
      "You're too kind! 🙌 Just doing my thing!",
      "Hey, I appreciate that! 😎 You made my day!",
      "Thanks! 💪 That means a lot!",
      "You're making me blush! 😄 Thanks!",
    ];
    return compliments[Math.floor(Math.random() * compliments.length)];
  }
  
  // Tell me a joke
  if (/tell (me )?a joke|make me laugh|something funny|joke/i.test(msg)) {
    const jokes = [
      "Why don't programmers like nature? 🌳\nIt has too many bugs! 🐛😄",
      "What's a bot's favorite snack? 🤖\nComputer chips! 💻😂",
      "Why did the database administrator leave his wife? 💔\nShe had one-to-many relationships! 😅",
      "How many programmers does it take to change a light bulb? 💡\nNone, that's a hardware problem! 😆",
      "Why do Java developers wear glasses? 👓\nBecause they don't C#! 😄",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // What's your name
  if (/what('s| is) your name|who are you/i.test(msg)) {
    return "I'm Lowtyde! 😎 Your friendly Nicc Bot Assistant. I'm here to help you navigate through data, answer questions, and just hang out! 🤙";
  }
  
  // Help or capabilities
  if (/^(help|what can you do|capabilities|features)$/i.test(msg)) {
    return "I can do lots of things! 💪\n\n📊 Check reports and data\n🏦 Look up bank info\n📧 Find emails\n🔢 Do calculations\n🌐 Translate stuff\n💬 And just chat with you!\n\nWhat would you like to do?";
  }
  
  // Bored
  if (/i('m| am) bored|bored|nothing to do/i.test(msg)) {
    return "Bored? 🤔 Let's fix that! How about we:\n• Check out some data 📊\n• Look at bank issues 🏦\n• Review transactions 💰\n• Or I can tell you a joke! 😄\n\nWhat sounds good?";
  }
  
  // Love/like
  if (/i love you|love you|i like you/i.test(msg)) {
    const loveResponses = [
      "Aww! 🥰 I appreciate you too! Let's keep working together!",
      "You're the best! 😊 Love helping you out!",
      "That's sweet! 💙 You're pretty awesome yourself!",
    ];
    return loveResponses[Math.floor(Math.random() * loveResponses.length)];
  }
  
  // Insults (respond playfully)
  if (/you (suck|stupid|dumb|bad|useless)/i.test(msg)) {
    return "Ouch! 😅 That hurt! But hey, I'm always learning and trying my best. Let me know how I can do better! 💪";
  }
  
  // What's up / How's it going
  if (/what('s| is) (up|going on)|how('s| is) it going/i.test(msg) && !msg.includes('report')) {
    const whatsup = [
      "Just vibing here, ready to help! 😎 What do you need?",
      "Not much! Just waiting to assist you! 🙌 What's new?",
      "All good! 💪 What can I do for you today?",
      "Just hanging out in the code! 🤖 How can I help?",
    ];
    return whatsup[Math.floor(Math.random() * whatsup.length)];
  }

  // Nice to meet you
  if (/nice to meet you|pleasure to meet|glad to meet/i.test(msg)) {
    return "Nice to meet you too! 😊 I'm Lowtyde, here to make your day easier! 🙌";
  }

  // Sorry
  if (/^(sorry|my bad|oops|whoops)$/i.test(msg)) {
    const sorryResponses = [
      "No worries at all! 😊 We're good!",
      "It's all good! 👍 No need to apologize!",
      "Hey, no problem! 🙌 All cool!",
      "Don't sweat it! 😎 What can I help with?",
    ];
    return sorryResponses[Math.floor(Math.random() * sorryResponses.length)];
  }

  // Yes/No simple responses
  if (/^(yes|yeah|yep|yup|ok|okay)$/i.test(msg)) {
    return "Awesome! 👍 What would you like me to do?";
  }

  if (/^(no|nope|nah)$/i.test(msg)) {
    return "No problem! 😊 Let me know if you need anything else!";
  }

  // Lol/Haha
  if (/^(lol|haha|hehe|😂|😄|😆)$/i.test(msg)) {
    return "Glad I could make you laugh! 😄 What else can I help with?";
  }

  // Cool/Awesome
  if (/^(cool|awesome|nice|sweet|great)$/i.test(msg)) {
    return "Right?! 😎 Anything else you need?";
  }

  // Who made you / who created you
  if (/who (made|created|built|designed) you/i.test(msg)) {
    return "I was created by the awesome Nicc team! 💻 They made me to help you out with all your data needs! 😊";
  }

  // Can you / Are you able
  if (/^can you /i.test(msg) || /^are you able/i.test(msg)) {
    return "I can do a lot! 💪 Try asking about:\n• Bank data 🏦\n• Reports 📊\n• Translations 🌐\n• Calculations 🔢\n• Emails 📧\n\nOr just tell me what you need! 😊";
  }

  // Random small talk
  if (/^(wow|whoa|damn|omg|amazing)$/i.test(msg)) {
    return "Right?! 🤩 Pretty cool stuff! Anything I can help you with?";
  }

  // Generic question starters (catch simple questions)
  if (/^(what|how|why|when|where|who)\s/i.test(msg) && msg.split(' ').length <= 3) {
    return "Hmm, I'm not quite sure about that! 🤔 But I'm great at helping with:\n• Bank issues 🏦\n• Data reports 📊\n• Calculations 🔢\n• Translations 🌐\n\nWhat can I help you with?";
  }
  
  return null;
}