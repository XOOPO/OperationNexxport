import { detectIntent } from './intentDetector';
import { entityExtractor } from './entityExtractor';
import { subDays, format, parseISO } from 'date-fns';
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

export interface BotResponse {
  page: string | null;
  filter?: Record<string, any>;
  message: string;
  hasData?: boolean;
  qrCode?: string;
  requiresRefresh?: boolean;
}

export interface DataSources {
  bankIssues: any[];
  bankIssueFollowUps: any[];
  lastInOuts: any[];
  transactions: any[];
  cOperations: any[];
  agents: any[];
  wealthListings: any[];
  dailyReports: any[];
  bankAccounts: any[];
  stockMails: any[];
}

export interface UserInfo {
  username: string;
  displayName: string;
}

function handleDateKeywords(message: string, extractedDate: string | null): string | null {
  const msg = message.toLowerCase();
  
  if (msg.includes('yesterday')) {
    const yesterday = subDays(new Date(), 1);
    return format(yesterday, 'M/d/yyyy');
  }
  
  if (msg.includes('today')) {
    return format(new Date(), 'M/d/yyyy');
  }
  
  return extractedDate;
}

export async function botDispatcher(
  message: string,
  data: DataSources
): Promise<BotResponse> {
  const msg = message.toLowerCase();
  
  // Check if this is an email field query for stock mail
  const email = entityExtractor.extractEmail(message);
  const field = entityExtractor.extractFieldQuery(message);
  
  if (email && (msg.includes('check') || msg.includes('help') || msg.includes('what'))) {
    const result = queryStockMailByEmail(data.stockMails, email, field || undefined);
    return {
      page: result?.result ? '/stock-mail' : null,
      message: formatResults('STOCK_MAIL_FIELD', result),
      hasData: !!result?.result
    };
  }
  
  const intent = detectIntent(message);
  let date = entityExtractor.extractDate(message);
  const amount = entityExtractor.extractAmount(message);
  const id = entityExtractor.extractID(message);
  const agent = entityExtractor.extractAgent(message);

  date = handleDateKeywords(message, date);

  const filter = { date, amount, id, agent, email, field };

  switch (intent) {
    case 'BANK_ISSUES': {
      const results = queryBankIssues(data.bankIssues, filter);
      return {
        page: '/bank-issues',
        filter: { date },
        message: formatResults('BANK_ISSUES', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'BANK_FOLLOWUP': {
      const results = queryBankIssueFollowUps(data.bankIssueFollowUps, { ...filter, status: 'pending' });
      return {
        page: '/bank-issues-follow-up',
        filter: { status: 'pending' },
        message: formatResults('BANK_FOLLOWUP', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'BANK_ACCOUNTS': {
      const count = data.bankAccounts.length;
      return {
        page: '/bank-accounts',
        message: count > 0 
          ? `🏦 You have ${count} bank account${count > 1 ? 's' : ''} registered.`
          : "No bank accounts found in the system bro.",
        hasData: count > 0
      };
    }
    
    case 'LAST_IN_OUT': {
      const results = queryLastInOut(data.lastInOuts, filter);
      return {
        page: '/bank-issues-last-in-out',
        filter: { date },
        message: formatResults('LAST_IN_OUT', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'TRANSACTION_SUMMARY': {
      const results = queryTransactionSummary(data.transactions, filter);
      return {
        page: '/transaction-summary',
        filter: { date },
        message: formatResults('TRANSACTION_SUMMARY', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'C_OPERATION': {
      const results = queryCOperations(data.cOperations, filter);
      return {
        page: '/c-operation',
        filter: { id, agent },
        message: formatResults('C_OPERATION', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'STOCK_MAIL': {
      let statusFilter: string | undefined;
      
      if (msg.includes('new mail') || msg.includes('send me mail')) {
        statusFilter = 'NEW';
      } else if (msg.includes('unused mail')) {
        statusFilter = 'UNUSED';
      } else if (msg.includes('need verify')) {
        statusFilter = 'NEED VERIFY';
      } else if (msg.includes('using')) {
        statusFilter = 'USING';
      }
      
      const results = queryStockMail(data.stockMails, statusFilter);
      return {
        page: '/stock-mail',
        message: formatResults('STOCK_MAIL', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'AGENT_LISTING': {
      if (!agent) {
        return {
          page: null,
          message: "Which agent bro? Please provide an agent name.",
          hasData: false
        };
      }
      
      const results = queryAgentListing(data.agents, filter);
      return {
        page: '/agent-listing',
        filter: { agent },
        message: formatResults('AGENT_LISTING', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'WEALTH_PLUS': {
      const results = queryWealthPlus(data.wealthListings, filter);
      return {
        page: '/wealth-plus',
        filter: { amount },
        message: formatResults('WEALTH_PLUS', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'DAILY_REPORT': {
      const results = queryDailyReport(data.dailyReports, filter);
      return {
        page: '/daily-report',
        filter: { date },
        message: formatResults('DAILY_REPORT', results, filter),
        hasData: results.length > 0
      };
    }
    
    case 'BANK_INFO': {
      // Check if asking for all banks
      if (msg.includes('list all') || msg.includes('which bank') || msg.includes('all singapore')) {
        const allBanks = getAllBanks();
        return {
          page: null,
          message: `🏦 **Singapore Banks in Knowledge Base:**\n\n${allBanks.map(bank => `• ${bank}`).join('\n')}\n\n💡 Ask me about any bank! Examples:\n• "What is MariBank?"\n• "MariBank daily limit"\n• "How to register DBS?"\n• "Contact UOB CS"\n• "OCBC common issues"\n• "Email template DBS"`,
          hasData: true
        };
      }
      
      // Try to find bank name using new getBankName function
      const foundBankName = getBankName(message);
      
      if (!foundBankName) {
        // Try to search for partial matches
        const searchResults = searchBanks(message);
        if (searchResults.length > 0) {
          return {
            page: null,
            message: `Found these banks: ${searchResults.join(', ')}\n\nWhich one you want to know about bro?`,
            hasData: true
          };
        }
        
        return {
          page: null,
          message: "Which Singapore bank bro? Try: DBS, OCBC, UOB, MariBank, Trust Bank, GXS Bank, HSBC, etc.\n\nOr ask 'list all banks'",
          hasData: false
        };
      }
      
      const bankInfo = getBankInfo(foundBankName);
      if (!bankInfo) {
        return {
          page: null,
          message: `Sorry bro, no info for ${foundBankName} yet.`,
          hasData: false
        };
      }
      
      // Check what specific info is being requested
      
      // Customer Service / Contact
      if (msg.includes('contact') || msg.includes('customer service') || msg.includes('cs') || msg.includes('hotline') || msg.includes('call')) {
        return {
          page: null,
          message: formatCustomerService(foundBankName, bankInfo),
          hasData: true
        };
      }
      
      // Email template generation
      if (msg.includes('email') || msg.includes('mail to') || msg.includes('form mail') || msg.includes('template')) {
        const issueDescription = msg.includes('transfer') ? 'Transfer issue' :
                                msg.includes('login') ? 'Login issue' :
                                msg.includes('paynow') ? 'PayNow registration issue' :
                                msg.includes('blocked') ? 'Account blocked' :
                                msg.includes('limit') ? 'Limit increase request' :
                                'General inquiry';
        
        return {
          page: null,
          message: generateEmailTemplate(foundBankName, issueDescription),
          hasData: true
        };
      }
      
      // Registration / How to register
      if (msg.includes('how to register') || msg.includes('registration') || msg.includes('open account') || msg.includes('sign up')) {
        return {
          page: null,
          message: formatRegistrationGuide(foundBankName, bankInfo),
          hasData: true
        };
      }
      
      // Common issues / troubleshooting
      if (msg.includes('issue') || msg.includes('problem') || msg.includes('error') || msg.includes('help') || msg.includes('solve') || msg.includes('fix')) {
        return {
          page: null,
          message: formatCommonIssues(foundBankName, bankInfo),
          hasData: true
        };
      }
      
      // Daily/Monthly limits
      if (msg.includes('daily limit') || msg.includes('per day') || msg.includes('perday')) {
        let response = `💰 **${foundBankName} Daily Limits**\n\n`;
        
        if (bankInfo.default_daily_limit) {
          response += '**Default Daily Limits:**\n';
          Object.entries(bankInfo.default_daily_limit).forEach(([key, val]) => {
            response += `• ${key.replace('_', ' ')}: S$${val.toLocaleString()}\n`;
          });
          response += '\n';
        }
        
        if (bankInfo.daily_customer_limit) {
          response += `**Customer Daily Limit:** S$${bankInfo.daily_customer_limit.toLocaleString()}\n\n`;
        }
        
        if (bankInfo.max_daily_limit) {
          response += '**Maximum Daily Limits:**\n';
          Object.entries(bankInfo.max_daily_limit).forEach(([key, val]) => {
            response += `• ${key.replace('_', ' ')}: S$${val.toLocaleString()}\n`;
          });
        }
        
        response += `\n💡 **Need to increase limit?** Contact ${foundBankName} at ${bankInfo.customer_service.hotline}`;
        
        return {
          page: null,
          message: response,
          hasData: true
        };
      }
      
      if (msg.includes('monthly limit') || msg.includes('per month') || msg.includes('permonth')) {
        let response = `💰 **${foundBankName} Monthly Limit**\n\n`;
        
        if (bankInfo.monthly_limit) {
          response += `**Monthly Transfer Limit:** S$${bankInfo.monthly_limit.toLocaleString()}\n\n`;
        } else {
          response += `Monthly limit info not available. Contact ${foundBankName} CS for details.\n\n`;
        }
        
        response += `📞 **Contact:** ${bankInfo.customer_service.hotline}`;
        
        return {
          page: null,
          message: response,
          hasData: true
        };
      }
      
      // Transfer limits (general)
      if (msg.includes('limit') || msg.includes('transfer')) {
        let response = `💰 **${foundBankName} Transfer Limits**\n\n`;
        
        if (bankInfo.default_daily_limit) {
          response += '**Default Daily:**\n';
          Object.entries(bankInfo.default_daily_limit).forEach(([key, val]) => {
            response += `• ${key.replace('_', ' ')}: S$${val.toLocaleString()}\n`;
          });
          response += '\n';
        }
        
        if (bankInfo.max_daily_limit) {
          response += '**Maximum Daily:**\n';
          Object.entries(bankInfo.max_daily_limit).forEach(([key, val]) => {
            response += `• ${key.replace('_', ' ')}: S$${val.toLocaleString()}\n`;
          });
          response += '\n';
        }
        
        if (bankInfo.monthly_limit) {
          response += `**Monthly:** S$${bankInfo.monthly_limit.toLocaleString()}\n\n`;
        }
        
        response += `💡 To increase limits, contact ${bankInfo.customer_service.hotline}`;
        
        return {
          page: null,
          message: response,
          hasData: true
        };
      }
      
      // Scam protection / fraud
      if (msg.includes('scam') || msg.includes('fraud') || msg.includes('protection') || msg.includes('cooling')) {
        let response = `🛡️ **${foundBankName} Scam Protection**\n\n`;
        response += `**Cooling Period:** ${bankInfo.scam_safeguard.cooling_period_hours} hours\n`;
        response += `**Trigger:** ${bankInfo.scam_safeguard.trigger}\n\n`;
        response += `**What to do if transaction is held:**\n`;
        response += bankInfo.abnormal_transaction_advice + '\n\n';
        response += `📞 **Contact:** ${bankInfo.customer_service.hotline}`;
        
        return {
          page: null,
          message: response,
          hasData: true
        };
      }
      
      // Default: Return full bank info
      return {
        page: null,
        message: formatBankInfo(foundBankName, bankInfo),
        hasData: true
      };
    }
    
    default:
      return {
        page: null,
        message: "I'm not sure what you mean bro. Try asking about:\n\n• Bank info (e.g., 'What is DBS?', 'UOB limit')\n• Bank issues\n• Bank follow-ups\n• Stock mail\n• Transactions\n• Daily reports\n• Agent listings\n• Wealth Plus\n• C-Operation\n\nOr check specific email info like:\n'Check gmail test@gmail.com what device?'",
        hasData: false
      };
  }
}