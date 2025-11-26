// Advanced problem-solving system for Lowtyde
// Analyzes user problems and provides step-by-step solutions

export interface Solution {
  problem: string;
  category: string;
  steps: string[];
  tips: string[];
  relatedTopics: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export function analyzeProblem(userMessage: string): Solution | null {
  const msg = userMessage.toLowerCase();

  // BANKING PROBLEMS
  if (msg.includes('paynow') && (msg.includes('not working') || msg.includes('failed') || msg.includes('error') || msg.includes('cannot') || msg.includes("can't"))) {
    return {
      problem: "PayNow Registration/Transfer Issue",
      category: "Banking",
      urgency: "high",
      steps: [
        "1️⃣ First, check if PayNow is already registered to another bank - You can only have ONE PayNow per NRIC/mobile",
        "2️⃣ If yes, de-register from old bank: Go to old bank's app > PayNow settings > De-register",
        "3️⃣ Wait 5 minutes for system to update",
        "4️⃣ Now register with new bank: Banking app > PayNow > Register with NRIC or mobile number",
        "5️⃣ Verify with OTP sent to your phone",
        "6️⃣ Test with small amount (e.g., S$1) to yourself first"
      ],
      tips: [
        "💡 Your mobile number must match the one registered with NRIC database",
        "💡 Digital banks (MariBank, GXS) may not support PayNow yet - check their latest updates",
        "💡 If still failing, call bank hotline with NRIC ready"
      ],
      relatedTopics: ["FAST Transfer", "Bank Account", "Digital Banking"]
    };
  }

  if (msg.includes('transfer') && (msg.includes('limit') || msg.includes('low') || msg.includes('increase'))) {
    return {
      problem: "Transfer Limit Too Low",
      category: "Banking",
      urgency: "medium",
      steps: [
        "1️⃣ Login to your bank's mobile app or internet banking",
        "2️⃣ Go to Settings > Security > Transfer Limits (location varies by bank)",
        "3️⃣ Select the limit type you want to increase (PayNow, FAST, Same Bank)",
        "4️⃣ Choose new limit (max usually S$200,000 per day for most banks)",
        "5️⃣ Verify with OTP or security token",
        "6️⃣ Changes usually take effect immediately"
      ],
      tips: [
        "💡 Most Singapore banks allow up to S$200,000 daily limit for retail accounts",
        "💡 Business accounts may have higher limits - contact your RM",
        "💡 Some banks require branch visit for limits above S$50,000",
        "💡 Monthly limits typically S$6,000,000 across all banks per MAS guidelines"
      ],
      relatedTopics: ["PayNow Limits", "FAST Transfer", "Security Settings"]
    };
  }

  if (msg.includes('account') && (msg.includes('locked') || msg.includes('blocked') || msg.includes('freeze'))) {
    return {
      problem: "Account Locked/Blocked",
      category: "Banking",
      urgency: "critical",
      steps: [
        "1️⃣ DON'T PANIC - This is usually due to: wrong PIN 3x, suspicious activity, or expired credentials",
        "2️⃣ Check your email/SMS for notification from bank explaining why",
        "3️⃣ Call bank's fraud hotline IMMEDIATELY (number in banking app or back of card)",
        "4️⃣ Verify your identity with: NRIC, account number, recent transactions",
        "5️⃣ Bank will investigate and unlock if legitimate",
        "6️⃣ If due to wrong PIN: visit branch with NRIC to reset",
        "7️⃣ If due to scam alert: expect 24-48hr cooling period before unlock"
      ],
      tips: [
        "⚠️ URGENT: If you didn't make those transactions, report fraud ASAP",
        "💡 Cooling period (24hrs) is MANDATORY for large suspicious withdrawals >50% balance",
        "💡 Keep your phone nearby - bank may call to verify",
        "💡 Have recent transaction history ready when calling bank"
      ],
      relatedTopics: ["Fraud Protection", "Scam Prevention", "Account Security"]
    };
  }

  if (msg.includes('transaction') && (msg.includes('hold') || msg.includes('pending') || msg.includes('delayed') || msg.includes('stuck'))) {
    return {
      problem: "Transaction On Hold/Delayed",
      category: "Banking",
      urgency: "high",
      steps: [
        "1️⃣ This is likely anti-scam protection kicking in - It's for your safety!",
        "2️⃣ Check your banking app notifications - bank may need you to approve",
        "3️⃣ If triggered by cooling period (24hrs): You MUST wait it out",
        "4️⃣ Verify transaction details: Check if amount, recipient matches what you intended",
        "5️⃣ Call bank fraud hotline (NOT customer service) to verify",
        "6️⃣ Prepare to answer: Your identity, transaction purpose, recipient details",
        "7️⃣ Bank will release after verification (if legitimate)"
      ],
      tips: [
        "⚠️ MAS requires 24hr cooling period for suspicious large withdrawals",
        "💡 This applies if: Withdrawal >50% of account balance (if ≥S$50,000)",
        "💡 First-time large transfer to new recipient often triggers this",
        "💡 Digital banks (Trust, Mari, GXS) may have stricter AI monitoring",
        "🛡️ This protection has prevented MILLIONS in scam losses!"
      ],
      relatedTopics: ["Scam Protection", "Fraud Prevention", "Large Transfers"]
    };
  }

  // ACCOUNT/PASSWORD PROBLEMS
  if (msg.includes('forgot') && (msg.includes('password') || msg.includes('pin') || msg.includes('login'))) {
    return {
      problem: "Forgot Password/PIN",
      category: "Account Access",
      urgency: "medium",
      steps: [
        "1️⃣ Go to bank app or website login page",
        "2️⃣ Click 'Forgot Password' or 'Reset PIN'",
        "3️⃣ Verify identity with: Account number + NRIC/mobile number",
        "4️⃣ OTP will be sent to registered mobile/email",
        "5️⃣ Create NEW password (8+ chars, uppercase, number, special char)",
        "6️⃣ Re-login with new credentials",
        "7️⃣ If OTP doesn't arrive: Check spam folder, or call bank hotline"
      ],
      tips: [
        "💡 Use a password manager to store securely",
        "💡 Never use same password across multiple banks",
        "💡 Enable biometric login (fingerprint/face) for convenience",
        "⚠️ After 3 failed attempts, account may lock - stop trying and call bank!"
      ],
      relatedTopics: ["Account Security", "Two-Factor Authentication", "Password Management"]
    };
  }

  // EMAIL/MAIL STOCK PROBLEMS
  if (msg.includes('email') && (msg.includes('not receiving') || msg.includes('not sent') || msg.includes('failed'))) {
    return {
      problem: "Email Not Received/Sent",
      category: "Email",
      urgency: "medium",
      steps: [
        "1️⃣ Check SPAM/Junk folder - 80% of 'missing' emails are there!",
        "2️⃣ Add sender to Safe Senders list or whitelist",
        "3️⃣ Check if email address is correct (typos are common)",
        "4️⃣ If business email: Check with IT if mail server is working",
        "5️⃣ Clear email app cache and restart",
        "6️⃣ Try accessing from web browser (webmail) to confirm",
        "7️⃣ Contact sender to confirm they sent it"
      ],
      tips: [
        "💡 Gmail/Outlook have 'Promotions' and 'Social' tabs - check those too",
        "💡 Large attachments (>25MB) may fail - ask for cloud link instead",
        "💡 Some corporate emails block external senders - check with IT",
        "💡 Use the Stock Mail feature in dashboard to track sent emails"
      ],
      relatedTopics: ["Stock Mail Dashboard", "Email Management", "Communication"]
    };
  }

  // DATA/REPORT PROBLEMS
  if (msg.includes('report') && (msg.includes('not showing') || msg.includes('empty') || msg.includes('no data') || msg.includes('missing'))) {
    return {
      problem: "Report Data Not Showing",
      category: "Dashboard",
      urgency: "medium",
      steps: [
        "1️⃣ Check date filter - you might be looking at wrong date range",
        "2️⃣ Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)",
        "3️⃣ Refresh page with hard reload: Ctrl+F5 (Cmd+Shift+R on Mac)",
        "4️⃣ Check if you have permission to view this report type",
        "5️⃣ Verify data exists for selected filters (date, agent, bank, etc.)",
        "6️⃣ Try different date range to confirm",
        "7️⃣ If still empty, data might not be uploaded yet - check with admin"
      ],
      tips: [
        "💡 Daily reports usually uploaded by 9 AM next business day",
        "💡 Use the bot to quickly check: 'Show daily report for [date]'",
        "💡 Export to CSV/Excel if you need to analyze further",
        "💡 Contact Nicc if data should be there but isn't"
      ],
      relatedTopics: ["Daily Report", "Data Export", "Dashboard Access"]
    };
  }

  // TECHNICAL ISSUES
  if (msg.includes('app') && (msg.includes('crash') || msg.includes('not working') || msg.includes('slow') || msg.includes('freeze'))) {
    return {
      problem: "App Crashing/Not Working",
      category: "Technical",
      urgency: "high",
      steps: [
        "1️⃣ Force close app completely (don't just minimize)",
        "2️⃣ Clear app cache: Settings > Apps > [App Name] > Clear Cache",
        "3️⃣ Restart your phone",
        "4️⃣ Check if app needs update in App Store/Play Store",
        "5️⃣ If still crashing: Uninstall and reinstall app",
        "6️⃣ Ensure you have stable internet connection",
        "7️⃣ If problem persists: Contact app's support team"
      ],
      tips: [
        "💡 Keep apps updated - old versions often have bugs",
        "💡 Clear cache monthly for optimal performance",
        "💡 Ensure phone OS is up to date",
        "💡 Free up phone storage if below 1GB free space",
        "⚠️ If banking app: DO NOT download from unofficial sources!"
      ],
      relatedTopics: ["Mobile Banking", "App Troubleshooting", "Device Management"]
    };
  }

  // GENERAL HELP REQUESTS
  if (msg.includes('help') || msg.includes('how to') || msg.includes('how do i') || msg.includes('guide')) {
    return {
      problem: "General Help Request",
      category: "General",
      urgency: "low",
      steps: [
        "1️⃣ Tell me specifically what you need help with",
        "2️⃣ I can assist with: Banking (PayNow, transfers, limits), Reports, Data analysis, Bank information",
        "3️⃣ Try asking me: 'How do I [specific task]?' or 'What is [specific topic]?'",
        "4️⃣ I can also explain Singapore bank features and solve problems step-by-step",
        "5️⃣ For urgent issues: Call your bank hotline directly (I can provide numbers)"
      ],
      tips: [
        "💡 Be specific! Instead of 'help', try 'How do I increase transfer limit?'",
        "💡 I learn from every interaction to help you better!",
        "💡 I have deep knowledge of all major Singapore banks",
        "💡 Ask me about: DBS, OCBC, UOB, MariBank, Trust Bank, GXS, HSBC, and more!"
      ],
      relatedTopics: ["Banking Guide", "Dashboard Features", "Singapore Banks"]
    };
  }

  return null;
}

// Generate natural language explanation of solution
export function generateSolutionMessage(solution: Solution): string {
  const urgencyEmoji = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    critical: '🔴'
  };

  let message = `${urgencyEmoji[solution.urgency]} **Problem Identified: ${solution.problem}**\n\n`;
  message += `📂 Category: ${solution.category}\n`;
  message += `⚡ Urgency: ${solution.urgency.toUpperCase()}\n\n`;
  
  message += `**🛠️ Solution Steps:**\n\n`;
  solution.steps.forEach(step => {
    message += `${step}\n`;
  });

  if (solution.tips.length > 0) {
    message += `\n**💡 Pro Tips:**\n\n`;
    solution.tips.forEach(tip => {
      message += `${tip}\n`;
    });
  }

  if (solution.relatedTopics.length > 0) {
    message += `\n**🔗 Related Topics:** ${solution.relatedTopics.join(', ')}`;
  }

  message += `\n\n✨ Let me know if you need more help or have questions about any step! I'm here for you! 😊`;

  return message;
}