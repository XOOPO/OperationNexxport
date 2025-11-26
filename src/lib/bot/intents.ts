export const intents = {
  // More specific intents first to avoid conflicts
  STOCK_MAIL: [
    // English
    "stock mail", "stock list", "mail stock", "new mail", "send me mail", "send me new mail", "help me send mail", 
    "unused mail", "show mail", "got mail", "check gmail", "help me check", "need verify mail", "using mail", "send new mail",
    // Chinese
    "邮件", "新邮件", "发送邮件", "给我邮件", "发邮件", "请给我发送", "发送新邮件", "库存邮件", "检查邮件", "查看邮件", 
    "未使用邮件", "需要验证", "使用中邮件", "帮我发送", "请发送"
  ],
  DAILY_REPORT: [
    // English
    "daily report", "report harian", "laporan harian", "today report", "yesterday report", "got daily report", 
    "give me daily report", "show daily report", "daily report date", "report date",
    // Chinese
    "每日报告", "日报", "今天报告", "昨天报告", "报告", "给我报告", "显示报告", "查看报告"
  ],
  BANK_ISSUES: [
    // English
    "bank issue", "bank issues", "bank problem", "issue bank", "show bank issue", "give me bank issue",
    // Chinese
    "银行问题", "银行", "问题", "显示问题", "查看问题", "给我看问题", "最新问题", "银行错误"
  ],
  BANK_FOLLOWUP: [
    // English
    "follow up", "bank follow up", "pending follow up", "followup", "follow-up", "pending bank",
    // Chinese
    "跟进", "银行跟进", "待处理", "后续", "跟踪"
  ],
  BANK_ACCOUNTS: [
    // English
    "bank account", "list bank account", "show bank account", "give me bank account",
    // Chinese
    "银行账户", "账户", "显示账户", "查看账户", "银行账号"
  ],
  LAST_IN_OUT: [
    // English
    "last in", "last out", "cash movement", "money in out", "in out", "show last in out",
    // Chinese
    "最后进出", "资金进出", "出入", "显示进出", "查看进出"
  ],
  TRANSACTION_SUMMARY: [
    // English
    "transaction summary", "summary transaction", "transactions", "transaction", "give me transaction",
    // Chinese
    "交易摘要", "交易", "交易记录", "显示交易", "查看交易", "交易总结"
  ],
  C_OPERATION: [
    // English
    "c operation", "operation c", "cop", "c-op", "c op", "show c operation",
    // Chinese
    "操作", "C操作", "显示操作", "查看操作"
  ],
  AGENT_LISTING: [
    // English
    "agent list", "agent listing", "find agent", "search agent", "show agent", "give me agent",
    // Chinese
    "代理列表", "代理", "查找代理", "搜索代理", "显示代理", "给我代理"
  ],
  WEALTH_PLUS: [
    // English
    "wealth plus", "wp", "wealth", "show wealth",
    // Chinese
    "财富", "财富加", "显示财富", "查看财富"
  ],
  // Bank info last to avoid conflicts with more specific intents
  BANK_INFO: [
    // English
    "what is dbs", "what is ocbc", "what is uob", "what is maribank", "what is trust bank", "what is gxs", 
    "tell me about bank", "bank info", "bank detail", "explain bank", "daily limit", "per day", "perday", 
    "monthly limit", "per month", "permonth", "bank limit", "bank transfer", "paynow limit", "fast limit", 
    "transfer limit", "scam protection", "fraud protection", "cooling period", "abnormal transaction", 
    "registration help", "can't register bank", "how to register bank", "open bank account", "which bank", 
    "list all bank", "contact bank", "customer service bank", "hotline bank", "call bank", "cs bank", 
    "bank email template", "common bank issue", "problem with bank", "dbs limit", "ocbc limit", "uob limit", 
    "maribank limit", "mari bank", "maribank", "dbs bank", "ocbc bank", "uob bank", "trust bank", "gxs bank", 
    "hsbc bank", "maybank", "cimb bank",
    // Chinese
    "什么是", "告诉我", "银行信息", "银行详情", "每日限额", "每月限额", "转账限额", "银行转账", "诈骗保护", 
    "欺诈保护", "冷却期", "异常交易", "注册帮助", "如何注册", "开户", "哪个银行", "列出所有银行", 
    "联系银行", "客服", "热线", "银行限额", "常见问题"
  ],
} as const;

export type IntentType = keyof typeof intents;