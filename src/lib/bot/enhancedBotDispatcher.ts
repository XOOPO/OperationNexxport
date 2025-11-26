import { detectIntent } from './intentDetector';
import { entityExtractor } from './entityExtractor';
import { subDays, format } from 'date-fns';
import {
  queryBankIssues,
  queryBankIssueFollowUps,
  queryStockMail,
  queryStockMailByEmail,
  queryLastInOut,
  queryTransactionSummary,
  queryCOperations,
  queryAgentListing,
  queryWealthPlus,
  queryDailyReport,
  formatResults
} from './dataQueryService';
import { 
  getBankInfo, 
  getBankName,
  formatBankInfo, 
  formatCustomerService,
  formatRegistrationGuide,
  formatCommonIssues,
  generateEmailTemplate,
  getAllBanks, 
  searchBanks 
} from './bankKnowledge';
import {
  detectLanguage,
  calculate,
  extractFirstName,
  translations,
  isCalculation,
  isTranslationRequest,
  simpleTranslate
} from './botUtils';
import { botDispatcher as originalBotDispatcher, BotResponse, DataSources } from './botDispatcher';
import { detectCasualChat } from './casualChat';
import { analyzeProblem, generateSolutionMessage } from './problemSolver';
import { conversationStateManager } from './conversationState';
import {
  detectAccountAction,
  extractEmailFromMessage,
  isValidEmail,
  generate2FAForPasswordReset,
  verify2FACode,
  generateRandomPassword,
  extractNameFromMessage,
  extract2FACode
} from './accountManager';

export interface UserInfo {
  username: string;
  displayName: string;
  email: string;
}

export interface AccountManagementCallbacks {
  verifyUserEmail?: (email: string) => boolean;
  updateUserPassword?: (email: string, newPassword: string) => boolean;
  updateUserProfile?: (email: string, username: string, displayName: string) => boolean;
  getUserSecret?: (email: string) => string | null;
}

export async function enhancedBotDispatcher(
  message: string,
  data: DataSources,
  userInfo?: UserInfo,
  accountCallbacks?: AccountManagementCallbacks
): Promise<BotResponse> {
  const msg = message.toLowerCase();
  const detectedLang = detectLanguage(message);
  
  // Extract user's first name for personalization
  const userName = userInfo ? extractFirstName(userInfo.displayName) : 'there';
  const userId = userInfo?.email || 'anonymous';
  
  // CHECK FOR ACTIVE CONVERSATION STATE (multi-step flows)
  const currentState = conversationStateManager.getState(userId);
  
  if (currentState) {
    // Handle password reset flow
    if (currentState.step === 'awaiting_email') {
      const email = extractEmailFromMessage(message);
      
      if (!email || !isValidEmail(email)) {
        return {
          page: null,
          message: '❌ **Invalid Email**\n\nPlease provide a valid email address.',
          hasData: false
        };
      }
      
      // Verify email exists in system
      if (accountCallbacks?.verifyUserEmail && !accountCallbacks.verifyUserEmail(email)) {
        conversationStateManager.clearState(userId);
        return {
          page: null,
          message: '❌ **Email Not Found**\n\nThe email address you provided is not registered in our system. Please check and try again.',
          hasData: false
        };
      }
      
      // Generate 2FA QR code for verification
      const { uri, secret } = generate2FAForPasswordReset(email);
      
      conversationStateManager.setState(userId, 'awaiting_2fa_code', {
        email,
        secret,
        uri
      });
      
      return {
        page: null,
        message: '🔐 **Two-Factor Authentication Required**\n\nFor security, please scan this QR code with Google Authenticator or any TOTP app, then enter the 6-digit code.\n\n**After scanning, please send me the 6-digit code.**',
        hasData: true,
        qrCode: uri
      };
    }
    
    if (currentState.step === 'awaiting_2fa_code') {
      const code = extract2FACode(message);
      
      if (!code) {
        return {
          page: null,
          message: '❌ **Invalid Code Format**\n\nPlease enter the 6-digit code from your authenticator app.',
          hasData: false
        };
      }
      
      const { secret, email } = currentState.data;
      
      // Verify the 2FA code
      if (!verify2FACode(secret, code)) {
        return {
          page: null,
          message: '❌ **Invalid Code**\n\nThe verification code is incorrect. Please try again with the current code from your authenticator app.',
          hasData: false
        };
      }
      
      // Generate new password
      const newPassword = generateRandomPassword();
      
      // Update password in system
      if (accountCallbacks?.updateUserPassword) {
        const success = accountCallbacks.updateUserPassword(email, newPassword);
        
        if (success) {
          conversationStateManager.clearState(userId);
          
          return {
            page: null,
            message: `✅ **Password Reset Successful!**\n\n**Email:** ${email}\n**New Password:** \`${newPassword}\`\n\n⚠️ **Important:**\n• Please save this password securely\n• Consider changing it after logging in\n• Never share your password with anyone\n\nYou can now log in with your new password!`,
            hasData: true
          };
        }
      }
      
      conversationStateManager.clearState(userId);
      return {
        page: null,
        message: '❌ **Password Reset Failed**\n\nSomething went wrong. Please try again later or contact support.',
        hasData: false
      };
    }
    
    if (currentState.step === 'awaiting_name') {
      const nameData = extractNameFromMessage(message);
      
      if (!nameData || (!nameData.username && !nameData.displayName)) {
        return {
          page: null,
          message: '❌ **Invalid Name**\n\nPlease tell me what you\'d like to change your name to. For example:\n• "Change my name to John Doe"\n• "Update my username to johndoe123"',
          hasData: false
        };
      }
      
      const username = nameData.username || userInfo?.username || '';
      const displayName = nameData.displayName || userInfo?.displayName || '';
      
      if (accountCallbacks?.updateUserProfile && userInfo?.email) {
        const success = accountCallbacks.updateUserProfile(userInfo.email, username, displayName);
        
        if (success) {
          conversationStateManager.clearState(userId);
          
          return {
            page: null,
            message: `✅ **Profile Updated Successfully!**\n\n**New Username:** ${username}\n**New Display Name:** ${displayName}\n\nYour profile has been updated. The changes will be reflected immediately!`,
            hasData: true,
            requiresRefresh: true
          };
        }
      }
      
      conversationStateManager.clearState(userId);
      return {
        page: null,
        message: '❌ **Profile Update Failed**\n\nSomething went wrong. Please try again later.',
        hasData: false
      };
    }
  }
  
  // CHECK FOR ACCOUNT MANAGEMENT ACTIONS
  const accountAction = detectAccountAction(message);
  
  if (accountAction.type === 'password_reset') {
    conversationStateManager.setState(userId, 'awaiting_email');
    return {
      page: null,
      message: accountAction.message || '',
      hasData: true
    };
  }
  
  if (accountAction.type === 'edit_profile') {
    // If user is logged in and we can detect the name directly, update immediately
    const nameData = extractNameFromMessage(message);
    
    if (nameData && userInfo?.email && accountCallbacks?.updateUserProfile) {
      const username = nameData.username || userInfo.username;
      const displayName = nameData.displayName || userInfo.displayName;
      
      const success = accountCallbacks.updateUserProfile(userInfo.email, username, displayName);
      
      if (success) {
        return {
          page: null,
          message: `✅ **Profile Updated Successfully!**\n\n**New Username:** ${username}\n**New Display Name:** ${displayName}\n\nYour profile has been updated!`,
          hasData: true,
          requiresRefresh: true
        };
      }
    }
    
    // Otherwise, ask for the name
    conversationStateManager.setState(userId, 'awaiting_name');
    return {
      page: null,
      message: accountAction.message || '',
      hasData: true
    };
  }
  
  // 0. CHECK FOR CASUAL CHAT (greetings, jokes, small talk)
  const casualResponse = detectCasualChat(message);
  if (casualResponse) {
    return {
      page: null,
      message: casualResponse,
      hasData: true
    };
  }
  
  // 1. CHECK FOR CALCULATOR REQUEST
  if (isCalculation(message)) {
    const mathMatch = message.match(/(?:calculate|calc|计算)?\s*([0-9+\-*/().\s]+)/i);
    if (mathMatch) {
      const expression = mathMatch[1].trim();
      const result = calculate(expression);
      
      const response = detectedLang === 'zh' 
        ? translations.calculation.zh(expression, result)
        : translations.calculation.en(expression, result);
      
      return {
        page: null,
        message: response,
        hasData: true
      };
    }
  }
  
  // 2. CHECK FOR TRANSLATION REQUEST
  if (isTranslationRequest(message)) {
    const translatePattern = /translate\s+(?:to\s+)?(\w+)[:：]?\s*(.+)/i;
    const match = message.match(translatePattern);
    
    if (match) {
      const targetLang = match[1].toLowerCase();
      const textToTranslate = match[2].trim();
      const translated = simpleTranslate(textToTranslate, targetLang);
      
      return {
        page: null,
        message: `🌐 **Translation:**\n\n**Original:** ${textToTranslate}\n**${targetLang.toUpperCase()}:** ${translated}`,
        hasData: true
      };
    }
  }
  
  // 3. CHECK FOR LANGUAGE DETECTION REQUEST
  if (msg.includes('detect language') || msg.includes('what language')) {
    const langNames: Record<string, string> = {
      'zh': 'Chinese (中文)',
      'ja': 'Japanese (日本語)',
      'ko': 'Korean (한국어)',
      'th': 'Thai (ไทย)',
      'ar': 'Arabic (العربية)',
      'en': 'English'
    };
    
    return {
      page: null,
      message: `🌐 **Language Detected:** ${langNames[detectedLang] || detectedLang}\n\nYour message appears to be in ${langNames[detectedLang]}.`,
      hasData: true
    };
  }
  
  // 4. CHECK FOR BANK ISSUE HISTORY REQUEST
  if (msg.includes('latest issue') || msg.includes('latest bank issue') || msg.includes('recent issue')) {
    const dateMatch = entityExtractor.extractDate(message);
    const targetDate = dateMatch || format(new Date(), 'M/d/yyyy');
    
    const issuesOnDate = data.bankIssues.filter((issue: any) => {
      if (!issue.date) return false;
      return issue.date === targetDate;
    });
    
    if (issuesOnDate.length > 0) {
      const latest = issuesOnDate[issuesOnDate.length - 1];
      const response = detectedLang === 'zh'
        ? `⚠️ **最新银行问题 (${targetDate}):**\n\n**银行:** ${latest.bank || 'N/A'}\n**问题:** ${latest.issue || 'N/A'}\n**状态:** ${latest.status || 'N/A'}\n**金额:** S$${latest.amount?.toLocaleString() || '0'}\n\n总共找到 ${issuesOnDate.length} 个问题在这一天。`
        : `⚠️ **Latest Bank Issue (${targetDate}):**\n\n**Bank:** ${latest.bank || 'N/A'}\n**Issue:** ${latest.issue || 'N/A'}\n**Status:** ${latest.status || 'N/A'}\n**Amount:** S$${latest.amount?.toLocaleString() || '0'}\n\nFound ${issuesOnDate.length} issue(s) on this date.`;
      
      return {
        page: '/bank-issues',
        filter: { date: targetDate },
        message: response,
        hasData: true
      };
    } else {
      const response = detectedLang === 'zh'
        ? `✅ ${targetDate} 没有发现银行问题！`
        : `✅ No bank issues found for ${targetDate}!`;
      
      return {
        page: null,
        message: response,
        hasData: false
      };
    }
  }
  
  // 5. GREETING WITH USER NAME
  if (msg.includes('hello') || msg.includes('hi ') || msg === 'hi' || msg.includes('你好') || msg.includes('嗨') || msg.includes('こんにちは') || msg.includes('안녕')) {
    let response: string;
    
    if (detectedLang === 'zh') {
      response = `👋 你好 ${userName}！我是 Lowtyde。我能帮你什么？`;
    } else if (detectedLang === 'ja') {
      response = `👋 こんにちは ${userName}！私はLowtyde です。何かお手伝いできますか？`;
    } else if (detectedLang === 'ko') {
      response = `👋 안녕하세요 ${userName}! 저는 Lowtyde입니다. 무엇을 도와드릴까요?`;
    } else {
      response = `👋 Hello ${userName}! I'm Lowtyde, your friendly assistant! How can I help you?`;
    }
    
    return {
      page: null,
      message: response,
      hasData: true
    };
  }
  
  // 6. INTELLIGENT PROBLEM SOLVER - Analyzes user's problems and provides step-by-step solutions
  const problem = analyzeProblem(message);
  if (problem) {
    const solutionMessage = generateSolutionMessage(problem);
    return {
      page: null,
      message: solutionMessage,
      hasData: true
    };
  }
  
  // 7. HELP COMMAND
  if (msg.includes('help') && !msg.includes('help me check') && !msg.includes('help me send')) {
    let response: string;
    
    if (detectedLang === 'zh') {
      response = `👋 你好 ${userName}！\n\n我可以帮助你：\n• 📊 仪表板数据查询\n• 🏦 银行信息和问题解决\n• 📧 邮件库存管理\n• 💱 翻译（任何语言）\n• 🔢 计算器\n• 🌐 语言检测\n• 🛠️ 智能问题解决\n• 🔐 密码重置\n• ✏️ 个人资料更新\n\n试试问：\n• "我的PayNow无法使用"\n• "忘记密码"\n• "更改我的名字为..."\n• "计算 25 + 75"`;
    } else {
      response = `👋 Hello ${userName}!\n\nI can help you with:\n• 📊 Dashboard data queries\n• 🏦 Singapore bank info & problem solving\n• 📧 Stock mail management\n• 💱 Translation (any language)\n• 🔢 Calculator\n• 🌐 Language detection\n• 🛠️ Intelligent problem solving\n• 🔐 Password reset & recovery\n• ✏️ Profile updates\n\nTry asking:\n• "My PayNow is not working"\n• "Forgot password"\n• "Change my name to..."\n• "Calculate 25 + 75"\n• "Show bank issues for yesterday"`;
    }
    
    return {
      page: null,
      message: response,
      hasData: true
    };
  }
  
  // Fall back to original dispatcher for standard queries
  const originalResponse = await originalBotDispatcher(message, data);
  
  // Check if response indicates unknown/not found
  if (originalResponse.message.includes("I'm not sure") || 
      originalResponse.message.includes("not found") || 
      originalResponse.message.includes("don't have any data") ||
      originalResponse.message.includes("我不确定")) {
    const funnyResponses = [
      "Hmm, that's a tough one! 🤔 Nicc hasn't taught me that yet! Try asking something else? 😅",
      "Oops! 😅 I don't know that one yet. Still learning from Nicc! Got another question?",
      "You got me there! 🤷‍♂️ That's beyond my current knowledge. Ask me something else! 💪",
      "Uh oh! 😬 I'm still learning that part. Nicc will teach me soon! What else can I help with?",
    ];
    return {
      page: null,
      message: funnyResponses[Math.floor(Math.random() * funnyResponses.length)],
      hasData: false
    };
  }
  
  // If detected language is Chinese and we have a successful response, translate key parts
  if (detectedLang === 'zh' && originalResponse.message) {
    // Add Chinese translation for common responses
    let translatedMessage = originalResponse.message;
    
    // Translate common phrases to Chinese
    translatedMessage = translatedMessage
      .replace(/Found (\d+)/g, '找到 $1')
      .replace(/No data/g, '没有数据')
      .replace(/Navigating to/g, '正在导航到')
      .replace(/Stock Mail/g, '邮件库存')
      .replace(/Bank Issue/g, '银行问题')
      .replace(/Daily Report/g, '每日报告')
      .replace(/Transaction/g, '交易')
      .replace(/Agent/g, '代理');
    
    return {
      ...originalResponse,
      message: translatedMessage
    };
  }
  
  return originalResponse;
}