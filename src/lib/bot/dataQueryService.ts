import { format, parse, isValid, subDays } from 'date-fns';

interface DataFilter {
  date?: string | null;
  amount?: number | null;
  id?: string | null;
  agent?: string | null;
  status?: string | null;
  email?: string | null;
  field?: string | null;
}

function parseDate(dateStr: string): Date | null {
  try {
    const formats = ['M/d/yyyy', 'MM/dd/yyyy', 'd/M/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd'];
    
    for (const fmt of formats) {
      const parsed = parse(dateStr, fmt, new Date());
      if (isValid(parsed)) {
        return parsed;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function formatDate(date: Date): string {
  return format(date, 'M/d/yyyy');
}

function matchesDate(itemDate: string, filterDate: string): boolean {
  const parsed = parseDate(filterDate);
  if (!parsed) return true;
  
  const formattedFilter = formatDate(parsed);
  return itemDate === formattedFilter;
}

export function queryBankIssues(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.date) {
    results = results.filter(item => matchesDate(item.date, filter.date!));
  }
  
  return results.slice(0, 10);
}

export function queryBankIssueFollowUps(data: any[], filter: DataFilter) {
  let results = [...data];
  
  const status = filter.status || 'pending';
  results = results.filter(item => 
    item.status?.toLowerCase().includes(status.toLowerCase())
  );
  
  return results.slice(0, 10);
}

export function queryStockMail(data: any[], filterStatus?: string) {
  if (filterStatus) {
    const results = data.filter(item => 
      item.status?.toUpperCase() === filterStatus.toUpperCase()
    );
    return results.slice(0, 20);
  }
  
  const results = data.filter(item => 
    item.status?.toUpperCase() === 'NEW' || 
    item.status?.toUpperCase() === 'UNUSED' ||
    item.status?.toUpperCase() === 'NEED VERIFY'
  );
  
  return results.slice(0, 20);
}

export function queryStockMailByEmail(data: any[], email: string, field?: string) {
  const result = data.find(item => 
    item.email?.toLowerCase() === email.toLowerCase()
  );
  
  if (!result) {
    return null;
  }
  
  return { result, field };
}

export function queryLastInOut(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.date) {
    results = results.filter(item => matchesDate(item.date, filter.date!));
  }
  
  return results.slice(0, 10);
}

export function queryTransactionSummary(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.date) {
    results = results.filter(item => matchesDate(item.date, filter.date!));
  }
  
  return results.slice(0, 20);
}

export function queryCOperations(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.id) {
    results = results.filter(item => 
      item.id?.toString().includes(filter.id!)
    );
  }
  
  if (filter.agent) {
    results = results.filter(item => 
      item.agent?.toLowerCase().includes(filter.agent!.toLowerCase())
    );
  }
  
  return results.slice(0, 10);
}

export function queryAgentListing(data: any[], filter: DataFilter) {
  if (!filter.agent) {
    return [];
  }
  
  const results = data.filter(item => 
    item.name?.toLowerCase().includes(filter.agent!.toLowerCase()) ||
    item.agentName?.toLowerCase().includes(filter.agent!.toLowerCase())
  );
  
  return results.slice(0, 10);
}

export function queryWealthPlus(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.amount) {
    results = results.filter(item => {
      const balance = parseFloat(item.balance?.replace(/[^0-9.-]/g, '') || '0');
      return balance > filter.amount!;
    });
  }
  
  return results.slice(0, 10);
}

export function queryDailyReport(data: any[], filter: DataFilter) {
  let results = [...data];
  
  if (filter.date) {
    results = results.filter(item => matchesDate(item.date, filter.date!));
  }
  
  return results.slice(0, 20);
}

export function formatResults(intent: string, results: any, filter?: DataFilter): string {
  // Handle email field query
  if (intent === 'STOCK_MAIL_FIELD' && results) {
    const { result, field } = results;
    
    if (!result) {
      return `I don't have that email in the system bro.`;
    }
    
    if (field) {
      const fieldValue = result[field];
      return `📧 Gmail: ${result.email}\n\n${field.charAt(0).toUpperCase() + field.slice(1)}: ${fieldValue || 'N/A'}`;
    }
    
    // Show all info if no specific field
    let response = `📧 Gmail Info:\n\n`;
    response += `Email: ${result.email}\n`;
    response += `Password: ${result.password}\n`;
    response += `Device: ${result.device}\n`;
    response += `Status: ${result.status}\n`;
    response += `Handler: ${result.handler || 'N/A'}\n`;
    response += `Assign: ${result.assign || 'N/A'}`;
    return response;
  }
  
  // Handle array results
  if (Array.isArray(results) && results.length === 0) {
    return "I don't have any data for that request bro. Please check if the filters are correct.";
  }
  
  const count = Array.isArray(results) ? results.length : 0;
  let response = '';
  
  switch (intent) {
    case 'BANK_ISSUES': {
      response = filter?.date 
        ? `📋 Bank Issues for ${filter.date}:\n\n`
        : `📋 Found ${count} Bank Issue${count > 1 ? 's' : ''}:\n\n`;
      
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${item.bankName}\n`;
        response += `   Amount: ${item.amount} — Status: ${item.status}\n`;
        response += `   Issue: ${item.issueType}\n`;
        response += `   Date: ${item.date}\n\n`;
      });
      break;
    }
      
    case 'BANK_FOLLOWUP': {
      response = `📌 Pending Follow-ups (${count}):\n\n`;
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${item.bankName} — ${item.issueType}\n`;
        response += `   Status: ${item.status}\n`;
        response += `   Follow-up Date: ${item.followUpDate}\n`;
        response += `   Notes: ${item.notes || 'None'}\n\n`;
      });
      break;
    }
    
    case 'STOCK_MAIL': {
      response = `📧 Here are the Stock Mail (${count}):\n\n`;
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. Email: ${item.email}\n`;
        response += `   Password: ${item.password}\n`;
        response += `   Device: ${item.device}\n`;
        response += `   Status: ${item.status}\n\n`;
      });
      break;
    }
      
    case 'LAST_IN_OUT': {
      response = filter?.date
        ? `💰 Last In/Out for ${filter.date}:\n\n`
        : `💰 Last In/Out Records (${count}):\n\n`;
        
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${item.bankName}\n`;
        response += `   Last In: ${item.lastIn} | Last Out: ${item.lastOut}\n`;
        response += `   Balance: ${item.balance}\n`;
        response += `   Date: ${item.date}\n\n`;
      });
      break;
    }
      
    case 'TRANSACTION_SUMMARY': {
      response = filter?.date
        ? `💳 Transaction Summary for ${filter.date}:\n\n`
        : `💳 Transaction Summary (${count}):\n\n`;
        
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${item.type} — ${item.description}\n`;
        response += `   Amount: ${item.amount}\n`;
        response += `   Date: ${item.date}\n`;
        response += `   Reference: ${item.reference || 'N/A'}\n\n`;
      });
      break;
    }
      
    case 'C_OPERATION': {
      response = `🏢 C-Operation Records (${count}):\n\n`;
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. Operation ID: ${item.id}\n`;
        response += `   Type: ${item.type} | Agent: ${item.agent}\n`;
        response += `   Status: ${item.status}\n`;
        response += `   Amount: ${item.amount || 'N/A'}\n`;
        response += `   Date: ${item.date}\n\n`;
      });
      break;
    }
      
    case 'AGENT_LISTING': {
      if (results.length === 1) {
        const agent = results[0];
        response = `👤 Agent Found:\n\n`;
        response += `Name: ${agent.agentName || agent.name}\n`;
        response += `ID: ${agent.agentId || 'N/A'}\n`;
        response += `Join Date: ${agent.joinDate || 'N/A'}\n`;
        response += `Total Commission: ${agent.totalCommission || '0'}\n`;
        response += `Total Bank: ${agent.totalBank || '0'}\n`;
        response += `Total Downlines: ${agent.totalDownline || '0'}\n`;
        response += `Contact: ${agent.agentContact || 'N/A'}\n`;
      } else {
        response = `👥 Found ${count} Agent${count > 1 ? 's' : ''}:\n\n`;
        results.forEach((item: any, idx: number) => {
          response += `${idx + 1}. ${item.agentName || item.name}\n`;
          response += `   ID: ${item.agentId || 'N/A'}\n`;
          response += `   Commission: ${item.totalCommission || '0'}\n\n`;
        });
      }
      break;
    }
      
    case 'WEALTH_PLUS': {
      response = filter?.amount
        ? `💎 Wealth+ accounts above ${filter.amount}:\n\n`
        : `💎 Wealth+ Accounts (${count}):\n\n`;
        
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${item.ownerCode}\n`;
        response += `   Bank: ${item.bankName}\n`;
        response += `   Holder: ${item.accountHolderName}\n`;
        response += `   Rent Amount: ${item.rentAmount}\n`;
        response += `   Status: ${item.accountStatus}\n\n`;
      });
      break;
    }
      
    case 'DAILY_REPORT': {
      response = filter?.date
        ? `📊 Daily Report for ${filter.date}:\n\n`
        : `📊 Daily Reports (${count}):\n\n`;
        
      results.forEach((item: any, idx: number) => {
        response += `${idx + 1}. Date: ${item.date}\n`;
        response += `   Staff Name: ${item.staffName}\n`;
        response += `   Report: ${item.note}\n\n`;
      });
      break;
    }
      
    default:
      response = `Found ${count} record${count > 1 ? 's' : ''}:\n\n`;
      results.slice(0, 5).forEach((item: any, idx: number) => {
        response += `${idx + 1}. ${JSON.stringify(item).substring(0, 100)}...\n\n`;
      });
  }
  
  return response.trim();
}