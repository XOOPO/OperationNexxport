export interface BankInfo {
  type: string;
  paynow: boolean;
  fast: boolean;
  description: string;
  aliases: string[]; // Alternative names for the bank
  default_daily_limit?: {
    local?: number;
    same_bank?: number;
    paynow?: number;
    local_transfers?: number;
    total_transfer?: number;
  };
  max_daily_limit?: {
    local?: number;
    same_bank?: number;
    paynow?: number;
    paynow_adhoc?: number;
    fast?: number;
  };
  monthly_limit?: number;
  paynow_limit_choices?: number[];
  daily_customer_limit?: number;
  scam_safeguard: {
    cooling_period_hours: number;
    trigger: string;
  };
  customer_service: {
    hotline: string;
    email: string;
    operating_hours: string;
    website: string;
  };
  registration_guide: {
    steps: string[];
    requirements: string[];
    estimated_time: string;
  };
  common_issues: {
    issue: string;
    solution: string;
  }[];
  registration_help: string;
  abnormal_transaction_advice: string;
}

export const bankKnowledge: Record<string, BankInfo> = {
  "DBS": {
    type: "Major Singapore Bank",
    paynow: true,
    fast: true,
    description: "DBS is the largest bank in Singapore. Full digital banking, FAST/PayNow available.",
    aliases: ["dbs bank", "dbs posb", "posb"],
    default_daily_limit: {
      local: 1000,
      same_bank: 3000,
    },
    max_daily_limit: {
      local: 200000,
      same_bank: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "if withdrawals in 24h + this >50% of account balance (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "1800 111 1111",
      email: "dbsbank@dbs.com",
      operating_hours: "24/7 hotline, branches Mon-Fri 9:30AM-4:30PM",
      website: "https://www.dbs.com.sg"
    },
    registration_guide: {
      steps: [
        "Download DBS digibank app or visit www.dbs.com.sg",
        "Click 'Apply Now' for new account",
        "Prepare NRIC/FIN and proof of address",
        "Complete online form (10-15 mins)",
        "Video verification or branch visit",
        "Activate account and set up PayNow/FAST"
      ],
      requirements: ["Valid NRIC/FIN", "Singapore address", "Mobile number", "Email address", "Initial deposit S$1,000 (varies by account type)"],
      estimated_time: "15-30 minutes online, instant approval for most applicants"
    },
    common_issues: [
      {
        issue: "PayNow registration failed",
        solution: "1) De-register PayNow from old bank first 2) Ensure mobile number matches NRIC record 3) Call 1800 111 1111 for assistance"
      },
      {
        issue: "Transfer limit too low",
        solution: "Login to digibank app > Settings > Daily transfer limit > Increase limit (max S$200,000)"
      },
      {
        issue: "Account locked after multiple wrong PIN",
        solution: "Visit DBS branch with NRIC to unlock, or call hotline 1800 111 1111"
      },
      {
        issue: "Transaction on hold / cooling period",
        solution: "This is scam protection. Contact DBS fraud hotline 1800 339 6963 to verify and release"
      }
    ],
    registration_help: "If you have issues registering DBS for PayNow / FAST, contact DBS customer support or visit a branch.",
    abnormal_transaction_advice: "If a large or rapid withdrawal happens, bank may hold it for 24 hours — you should verify via DBS app or call them."
  },
  
  "OCBC": {
    type: "Major Singapore Bank",
    paynow: true,
    fast: true,
    description: "OCBC is one of the top 3 Singapore banks with full digital services.",
    aliases: ["ocbc bank"],
    default_daily_limit: {
      paynow: 1000,
      local_transfers: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    paynow_limit_choices: [100, 500, 1000, 3000, 5000, 10000, 25000, 50000, 100000, 200000],
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "rapid withdrawals draining >50% of account (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "1800 363 3333",
      email: "customer_service@ocbc.com",
      operating_hours: "24/7 hotline, branches Mon-Fri 9:30AM-5PM",
      website: "https://www.ocbc.com/personal-banking/index.page"
    },
    registration_guide: {
      steps: [
        "Visit OCBC website or download OCBC Digital app",
        "Click 'Open Account'",
        "Prepare NRIC/passport and selfie",
        "Fill in personal details",
        "MyInfo auto-fill (if available)",
        "Video call verification or branch visit",
        "Receive account details via email"
      ],
      requirements: ["Singapore NRIC/FIN or valid passport", "Minimum age 18", "Singapore mobile number", "Email address"],
      estimated_time: "20 minutes online application"
    },
    common_issues: [
      {
        issue: "Can't set PayNow limit above S$1,000",
        solution: "Login to OCBC app > Pay > PayNow > Settings > Select higher limit from dropdown (up to S$200,000)"
      },
      {
        issue: "PayNow already registered elsewhere",
        solution: "De-register from previous bank first via their app/internet banking, then register with OCBC"
      },
      {
        issue: "Transaction declined due to cooling period",
        solution: "This is anti-scam measure. Call OCBC fraud hotline 1800 363 3333 to verify identity and approve transaction"
      },
      {
        issue: "Forgot OneToken password",
        solution: "Reset via OCBC app or call 1800 363 3333. May need to visit branch for security reset"
      }
    ],
    registration_help: "Ensure you're using the correct ID/mobile for PayNow registration. OCBC may impose a 'cooling period' for key account changes.",
    abnormal_transaction_advice: "Large or unusual digital transactions could be held for verification per scam-safeguard rules."
  },
  
  "UOB": {
    type: "Major Singapore Bank",
    paynow: true,
    fast: true,
    description: "UOB provides banking, loans, credit cards, FAST/PayNow supported.",
    aliases: ["uob bank", "united overseas bank"],
    default_daily_limit: { 
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow_adhoc: 200000,
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "suspicious rapid withdrawals, drain >50% of balance (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "1800 222 2121",
      email: "CustomerService@UOBgroup.com",
      operating_hours: "24/7 hotline, branches Mon-Fri 9:30AM-4:30PM, Sat 9:30AM-12:30PM",
      website: "https://www.uob.com.sg"
    },
    registration_guide: {
      steps: [
        "Visit UOB.com.sg or download UOB TMRW app",
        "Select account type (e.g., One Account, TMRW)",
        "Prepare NRIC and proof of income (for some accounts)",
        "Complete online application",
        "Biometric/video verification",
        "Receive account details and debit card via mail"
      ],
      requirements: ["Singapore NRIC/FIN", "Minimum age 18", "Proof of address", "Initial deposit varies by account"],
      estimated_time: "15-25 minutes, instant approval for eligible applicants"
    },
    common_issues: [
      {
        issue: "PayNow registration shows 'already registered'",
        solution: "De-register from old bank first. Use old bank's app/internet banking to remove PayNow, then register with UOB"
      },
      {
        issue: "Transfer held for 24 hours",
        solution: "This is fraud protection. Verify via UOB app > Transactions or call fraud hotline +65 6255 0160"
      },
      {
        issue: "UOB Mighty app login failed",
        solution: "Reset password via 'Forgot Password' or call 1800 222 2121. May need to visit branch for hard reset"
      },
      {
        issue: "FAST transfer limit too low",
        solution: "Login to UOB internet banking > Settings > Daily limit > Increase (max S$200,000 per day)"
      }
    ],
    registration_help: "If PayNow registration fails, de-register from old bank first. UOB requires deregistration before you can re-register.",
    abnormal_transaction_advice: "If a transfer is held, check your UOB app under 'Transactions' or contact UOB Fraud Hotline: +65 6255 0160."
  },
  
  "MariBank": {
    type: "Digital Bank (Sea Group)",
    paynow: false,
    fast: true,
    description: "MariBank is a digital bank by Shopee/Sea Group. App-only, FAST supported, NO PayNow yet.",
    aliases: ["mari bank", "maribank singapore", "sea bank"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      fast: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "large or suspicious withdrawals >50% of account (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "N/A (App-only support)",
      email: "support@maribank.sg",
      operating_hours: "In-app chat 9AM-6PM Mon-Fri",
      website: "https://www.maribank.sg"
    },
    registration_guide: {
      steps: [
        "Download MariBank app from App Store/Google Play",
        "Click 'Sign Up'",
        "Verify mobile number (Singapore +65)",
        "Scan NRIC front and back",
        "Take selfie for verification",
        "Create 6-digit PIN",
        "Account approved instantly (most cases)"
      ],
      requirements: ["Singapore NRIC/FIN", "Age 18+", "Singapore mobile number", "No minimum deposit"],
      estimated_time: "5-10 minutes, instant approval"
    },
    common_issues: [
      {
        issue: "No PayNow support",
        solution: "MariBank doesn't support PayNow yet. Use FAST transfer or bank transfer instead"
      },
      {
        issue: "Daily limit only S$5,000",
        solution: "Login to MariBank app > Settings > Transfer Limit > Increase (max S$200,000 via FAST)"
      },
      {
        issue: "Can't transfer to other banks",
        solution: "Use FAST transfer (not PayNow). Enter recipient's bank account number, not phone/NRIC"
      },
      {
        issue: "Account verification stuck",
        solution: "Ensure good lighting for NRIC scan, retake selfie, or contact support@maribank.sg"
      }
    ],
    registration_help: "MariBank is app-only. For registration help, use in-app support or contact customer service.",
    abnormal_transaction_advice: "MariBank uses AI fraud detection. Unusual patterns may trigger a 24-hour hold."
  },
  
  "Trust Bank": {
    type: "Digital Bank",
    paynow: true,
    fast: true,
    description: "Trust Bank is a digital bank by FairPrice Group + Standard Chartered.",
    aliases: ["trustbank", "trust bank sg"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "suspicious activity or rapid withdrawal >50% of balance (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "N/A (App-only)",
      email: "hello@trustbank.sg",
      operating_hours: "In-app chat 8AM-10PM daily",
      website: "https://www.trustbank.sg"
    },
    registration_guide: {
      steps: [
        "Download Trust Bank app",
        "Tap 'Get Started'",
        "Enter mobile number",
        "Scan NRIC",
        "Take selfie",
        "Link to Singpass for MyInfo",
        "Set PIN and security questions",
        "Account ready in minutes"
      ],
      requirements: ["Singapore NRIC", "Age 18+", "Singpass account", "Singapore mobile number"],
      estimated_time: "10 minutes, instant approval"
    },
    common_issues: [
      {
        issue: "Singpass linking failed",
        solution: "Ensure Singpass app is updated, try again, or reset Singpass password at singpass.gov.sg"
      },
      {
        issue: "Can't increase transfer limit",
        solution: "Go to Trust Bank app > Profile > Settings > Transfer Limits > Adjust (max S$200,000)"
      },
      {
        issue: "PayNow registration error",
        solution: "De-register from old bank first, then register via Trust Bank app > Pay > PayNow"
      },
      {
        issue: "Large transfer on hold",
        solution: "Anti-scam measure. Verify via app notification or contact hello@trustbank.sg"
      }
    ],
    registration_help: "Trust Bank registration is fully digital. If you face issues, contact support via the Trust Bank app.",
    abnormal_transaction_advice: "Being a digital bank, Trust Bank has strong fraud detection. Large transactions may be flagged for 24h review."
  },
  
  "GXS Bank": {
    type: "Digital Bank",
    paynow: false,
    fast: true,
    description: "GXS is a Grab + Singtel digital bank.",
    aliases: ["gxs", "grab bank"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      fast: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "rapid withdrawals or suspicious activity draining >50% of balance (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "N/A (App-only)",
      email: "help@gxs.com.sg",
      operating_hours: "In-app support 24/7",
      website: "https://www.gxs.com.sg"
    },
    registration_guide: {
      steps: [
        "Download GXS Bank app",
        "Sign up with Singpass",
        "Verify identity via MyInfo",
        "Create 6-digit PIN",
        "Set up biometric login",
        "Account activated instantly"
      ],
      requirements: ["Singapore NRIC/PR", "Age 18+", "Singpass", "Singapore mobile number"],
      estimated_time: "5 minutes"
    },
    common_issues: [
      {
        issue: "No PayNow yet",
        solution: "GXS doesn't support PayNow currently. Use FAST transfer with account number"
      },
      {
        issue: "Cannot link to Grab account",
        solution: "Ensure same mobile number for GXS and Grab, update Grab app to latest version"
      },
      {
        issue: "Transfer limit stuck at S$5,000",
        solution: "Increase via GXS app > Settings > Security > Transfer Limit (max S$200,000)"
      },
      {
        issue: "Singpass verification failed",
        solution: "Update Singpass app, clear cache, or visit singpass.gov.sg to verify account status"
      }
    ],
    registration_help: "GXS Bank is accessible via the GXS Bank app. For issues, contact support through the app.",
    abnormal_transaction_advice: "GXS employs real-time fraud monitoring. Large transactions may be held for verification."
  },
  
  "HSBC": {
    type: "International Bank",
    paynow: true,
    fast: true,
    description: "HSBC Singapore offers savings, credit cards, loans. FAST/PayNow supported.",
    aliases: ["hsbc bank", "hsbc singapore"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "withdrawals draining >50% of account balance (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "1800 216 9000",
      email: "contact@hsbc.com.sg",
      operating_hours: "24/7 hotline",
      website: "https://www.hsbc.com.sg"
    },
    registration_guide: {
      steps: [
        "Visit HSBC branch or apply online at hsbc.com.sg",
        "Prepare NRIC, proof of income, proof of address",
        "Complete application form",
        "Branch visit for verification (if online)",
        "Receive account kit via courier",
        "Activate via HSBC app or internet banking"
      ],
      requirements: ["NRIC/FIN", "Proof of income", "Proof of address", "Initial deposit S$5,000 (varies)"],
      estimated_time: "30 minutes online + 3-5 days processing"
    },
    common_issues: [
      {
        issue: "PayNow registration failed",
        solution: "Call 1800 216 9000 or visit branch. May need to de-register from previous bank first"
      },
      {
        issue: "Transfer on hold for 24-48 hours",
        solution: "HSBC has strict fraud checks. Call fraud hotline immediately or approve via HSBC app notification"
      },
      {
        issue: "Daily limit increase request rejected",
        solution: "Visit HSBC branch with NRIC to apply for higher limit, or call 1800 216 9000"
      },
      {
        issue: "Secure Key token not working",
        solution: "Re-activate via HSBC app or visit branch for replacement token"
      }
    ],
    registration_help: "For PayNow/FAST setup issues, visit HSBC branch or call customer service at 1800 216 9000.",
    abnormal_transaction_advice: "HSBC has global fraud monitoring. Large or unusual transactions may be held for 24-48 hours."
  },
  
  "Standard Chartered": {
    type: "International Bank",
    paynow: true,
    fast: true,
    description: "Standard Chartered Singapore supports full FAST and PayNow transfers.",
    aliases: ["stanchart", "sc bank", "standard chartered bank"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "large withdrawals >50% of balance (if ≥ S$50,000) or flagged suspicious activity"
    },
    customer_service: {
      hotline: "1800 747 7000",
      email: "customersupport.sg@sc.com",
      operating_hours: "24/7 hotline",
      website: "https://www.sc.com/sg"
    },
    registration_guide: {
      steps: [
        "Visit sc.com/sg and click 'Open Account'",
        "Select account type",
        "Fill personal details (MyInfo supported)",
        "Upload NRIC and proof of address",
        "Video call verification or branch visit",
        "Receive account details via email"
      ],
      requirements: ["NRIC/FIN", "Proof of address", "Initial deposit varies", "Singapore mobile"],
      estimated_time: "20 minutes online"
    },
    common_issues: [
      {
        issue: "PayNow already linked to another bank",
        solution: "De-register from previous bank via their app, then register with SC via online banking"
      },
      {
        issue: "Transaction delayed/on hold",
        solution: "SC monitors for fraud. Approve via SC mobile app notification or call 1800 747 7000"
      },
      {
        issue: "Forgot internet banking password",
        solution: "Reset via SC app or website, or call 1800 747 7000"
      },
      {
        issue: "FAST transfer limit too low",
        solution: "Login to SC online banking > Settings > Transfer limits > Increase (max S$200,000)"
      }
    ],
    registration_help: "For PayNow issues, de-register from previous bank first, then register via SC online banking.",
    abnormal_transaction_advice: "SC monitors for scams actively. Large transfers may be delayed for verification."
  },
  
  "Maybank": {
    type: "Regional Bank",
    paynow: true,
    fast: true,
    description: "Maybank SG is popular for business banking. Supports PayNow/FAST.",
    aliases: ["maybank singapore", "maybank sg"],
    daily_customer_limit: 200000,
    max_daily_limit: {
      paynow: 1000000,
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "if flagged under scam detection systems"
    },
    customer_service: {
      hotline: "1800 629 2265",
      email: "maybanksg@maybank.com",
      operating_hours: "Mon-Fri 8:30AM-5PM, Sat 8:30AM-12:30PM",
      website: "https://www.maybank.com/singapore"
    },
    registration_guide: {
      steps: [
        "Visit maybank.com/singapore",
        "Click 'Open Account'",
        "Prepare NRIC and documents",
        "Complete online form",
        "Schedule branch visit or video verification",
        "Activate account"
      ],
      requirements: ["NRIC/FIN", "Proof of address", "Minimum deposit varies"],
      estimated_time: "30 minutes + branch visit"
    },
    common_issues: [
      {
        issue: "PayNow setup error",
        solution: "Contact eServices team at 1800 629 2265 or visit branch"
      },
      {
        issue: "Transaction on hold",
        solution: "Call hotline to verify identity and release transaction"
      },
      {
        issue: "M2U login failed",
        solution: "Reset password via 'Forgot Password' or call customer service"
      }
    ],
    registration_help: "If you can't register PayNow or FAST, contact Maybank's eServices team or your branch.",
    abnormal_transaction_advice: "For abnormal or high-value transactions, Maybank may temporarily hold or require additional verification."
  },
  
  "CIMB": {
    type: "Regional Bank",
    paynow: true,
    fast: true,
    description: "CIMB Singapore supports FAST transfers and PayNow.",
    aliases: ["cimb bank", "cimb singapore"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "large withdrawals draining >50% of account (if ≥ S$50,000)"
    },
    customer_service: {
      hotline: "6333 8222",
      email: "sg.customerservice@cimb.com",
      operating_hours: "Mon-Fri 8:30AM-5:30PM",
      website: "https://www.cimb.com.sg"
    },
    registration_guide: {
      steps: [
        "Visit CIMB branch",
        "Bring NRIC and proof of address",
        "Fill application form",
        "Submit documents",
        "Receive account details and debit card"
      ],
      requirements: ["NRIC/FIN", "Proof of address", "Initial deposit S$1,000"],
      estimated_time: "Branch visit required"
    },
    common_issues: [
      {
        issue: "PayNow registration issues",
        solution: "Call 6333 8222 for assistance"
      },
      {
        issue: "Transfer delayed",
        solution: "Security verification needed, contact customer service"
      }
    ],
    registration_help: "For PayNow registration issues, contact CIMB customer service at 6333 8222.",
    abnormal_transaction_advice: "CIMB monitors unusual transactions and may delay large transfers for security verification."
  },
  
  "Citibank": {
    type: "International Bank",
    paynow: true,
    fast: true,
    description: "Citibank Singapore supports FAST + PayNow for local transfers.",
    aliases: ["citi bank", "citi singapore"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "rapid large withdrawals or suspicious patterns draining >50%"
    },
    customer_service: {
      hotline: "6225 5225",
      email: "citiphone@citi.com",
      operating_hours: "24/7 hotline",
      website: "https://www.citibank.com.sg"
    },
    registration_guide: {
      steps: [
        "Visit citibank.com.sg",
        "Apply online or visit branch",
        "Submit NRIC and documents",
        "Wait for approval (2-5 days)",
        "Activate via Citi Mobile app"
      ],
      requirements: ["NRIC/FIN", "Income proof", "Initial deposit varies"],
      estimated_time: "2-5 days processing"
    },
    common_issues: [
      {
        issue: "PayNow setup via app",
        solution: "Use Citi Mobile app > Pay > PayNow, or call 6225 5225"
      },
      {
        issue: "Unusual activity hold",
        solution: "Approve via app notification or call fraud team"
      }
    ],
    registration_help: "For PayNow setup, use Citi Mobile app or contact customer service at 6225 5225.",
    abnormal_transaction_advice: "Citibank employs advanced fraud detection. Unusual activity may trigger temporary holds."
  },
  
  "Bank of China": {
    type: "China Bank (SG Branch)",
    paynow: true,
    fast: true,
    description: "BOC SG supports FAST and PayNow for local transfer.",
    aliases: ["boc", "boc singapore", "bank of china singapore"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "large withdrawals >50% of balance"
    },
    customer_service: {
      hotline: "1800 229 2265",
      email: "customerservice.sg@bankofchina.com",
      operating_hours: "Mon-Fri 9AM-5PM",
      website: "https://www.bankofchina.com/sg"
    },
    registration_guide: {
      steps: [
        "Visit BOC branch",
        "Bring NRIC and documents",
        "Complete application",
        "Account activated same day (usually)"
      ],
      requirements: ["NRIC/FIN", "Proof of address"],
      estimated_time: "Branch visit"
    },
    common_issues: [
      {
        issue: "PayNow registration",
        solution: "Visit branch or use online banking portal"
      },
      {
        issue: "Large transaction verification",
        solution: "May require additional verification, call hotline"
      }
    ],
    registration_help: "For PayNow registration, visit BOC branch or use online banking portal.",
    abnormal_transaction_advice: "BOC monitors for unusual patterns. Large transactions may require additional verification."
  },
  
  "ICBC": {
    type: "China Bank (SG Branch)",
    paynow: false,
    fast: true,
    description: "ICBC Singapore supports FAST but not PayNow.",
    aliases: ["icbc singapore", "industrial and commercial bank"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      fast: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "suspicious large withdrawals >50%"
    },
    customer_service: {
      hotline: "6538 1122",
      email: "customerservice@sg.icbc.com.cn",
      operating_hours: "Mon-Fri 9AM-5PM",
      website: "https://singapore.icbc.com.cn"
    },
    registration_guide: {
      steps: [
        "Visit ICBC branch",
        "Submit NRIC and documents",
        "Complete forms",
        "Receive account details"
      ],
      requirements: ["NRIC/FIN", "Proof of address"],
      estimated_time: "Branch visit required"
    },
    common_issues: [
      {
        issue: "No PayNow support",
        solution: "ICBC doesn't support PayNow, use FAST instead"
      },
      {
        issue: "FAST transfer help",
        solution: "Call 6538 1122 for FAST setup assistance"
      }
    ],
    registration_help: "ICBC does not support PayNow currently. Use FAST transfers instead.",
    abnormal_transaction_advice: "ICBC follows ABS guidelines for fraud prevention. Large transactions may be held for review."
  },
  
  "ANZ": {
    type: "International Bank",
    paynow: true,
    fast: true,
    description: "ANZ Singapore offers banking services with FAST/PayNow support.",
    aliases: ["anz bank", "anz singapore"],
    default_daily_limit: {
      total_transfer: 5000
    },
    max_daily_limit: {
      paynow: 200000
    },
    monthly_limit: 6000000,
    scam_safeguard: {
      cooling_period_hours: 24,
      trigger: "large or rapid withdrawals draining >50%"
    },
    customer_service: {
      hotline: "1800 429 8269",
      email: "sg.contact@anz.com",
      operating_hours: "Mon-Fri 8:30AM-6PM",
      website: "https://www.anz.com/singapore"
    },
    registration_guide: {
      steps: [
        "Visit ANZ branch or apply online",
        "Submit NRIC and documents",
        "Complete application",
        "Wait for approval",
        "Activate account"
      ],
      requirements: ["NRIC/FIN", "Proof of income", "Proof of address"],
      estimated_time: "3-5 days"
    },
    common_issues: [
      {
        issue: "PayNow setup",
        solution: "Contact ANZ at 1800 429 8269 for assistance"
      },
      {
        issue: "Suspicious activity hold",
        solution: "Verify via ANZ app or call fraud team"
      }
    ],
    registration_help: "For PayNow setup, contact ANZ customer service at 1800 429 8269.",
    abnormal_transaction_advice: "ANZ monitors transactions for fraud. Suspicious activity may trigger holds."
  },
  
  "LiquidPay": {
    type: "Payment Wallet, NOT a bank",
    paynow: false,
    fast: false,
    description: "LiquidPay is a digital payment service, NOT a licensed bank.",
    aliases: ["liquid pay", "liquidpay wallet"],
    scam_safeguard: {
      cooling_period_hours: 0,
      trigger: "N/A - not a licensed bank"
    },
    customer_service: {
      hotline: "N/A",
      email: "support@liquidpay.com",
      operating_hours: "Email support only",
      website: "https://www.liquidpay.com"
    },
    registration_guide: {
      steps: [
        "Download LiquidPay app",
        "Sign up with email/mobile",
        "Verify identity",
        "Link bank account or card",
        "Start using wallet"
      ],
      requirements: ["Email", "Mobile number", "Bank account or card"],
      estimated_time: "10 minutes"
    },
    common_issues: [
      {
        issue: "Is this a bank?",
        solution: "NO. LiquidPay is a payment wallet, not a licensed bank. Your money is NOT protected by SDIC"
      },
      {
        issue: "Can I use PayNow?",
        solution: "LiquidPay doesn't support PayNow or FAST as it's not a bank"
      }
    ],
    registration_help: "LiquidPay is a payment wallet. Registration is app-based. Contact their support for help.",
    abnormal_transaction_advice: "As a payment service (not a bank), LiquidPay has different security measures. Check their app for transaction limits."
  }
};

// Helper to find bank by name or alias
export function getBankInfo(bankName: string): BankInfo | null {
  const normalizedName = bankName.toLowerCase().trim();
  
  // Direct match (case insensitive)
  const directMatch = Object.keys(bankKnowledge).find(
    key => key.toLowerCase() === normalizedName
  );
  if (directMatch) {
    return bankKnowledge[directMatch];
  }
  
  // Check aliases
  for (const [key, info] of Object.entries(bankKnowledge)) {
    if (info.aliases.some(alias => normalizedName.includes(alias) || alias.includes(normalizedName))) {
      return info;
    }
  }
  
  // Partial match
  const partialMatch = Object.keys(bankKnowledge).find(key => 
    normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)
  );
  
  return partialMatch ? bankKnowledge[partialMatch] : null;
}

export function getBankName(bankName: string): string | null {
  const normalizedName = bankName.toLowerCase().trim();
  
  // Direct match
  const directMatch = Object.keys(bankKnowledge).find(
    key => key.toLowerCase() === normalizedName
  );
  if (directMatch) return directMatch;
  
  // Check aliases
  for (const key of Object.keys(bankKnowledge)) {
    const info = bankKnowledge[key];
    if (info.aliases.some(alias => normalizedName.includes(alias) || alias.includes(normalizedName))) {
      return key;
    }
  }
  
  // Partial match
  return Object.keys(bankKnowledge).find(key => 
    normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)
  ) || null;
}

export function formatBankInfo(bankName: string, info: BankInfo): string {
  let response = `🏦 **${bankName}**\n\n`;
  response += `**Type:** ${info.type}\n`;
  response += `**Description:** ${info.description}\n\n`;
  
  response += `**Features:**\n`;
  response += `• PayNow: ${info.paynow ? '✅ Yes' : '❌ No'}\n`;
  response += `• FAST Transfer: ${info.fast ? '✅ Yes' : '❌ No'}\n\n`;
  
  if (info.default_daily_limit) {
    response += `**Default Daily Limits:**\n`;
    Object.entries(info.default_daily_limit).forEach(([key, value]) => {
      response += `• ${key.replace('_', ' ')}: S$${value.toLocaleString()}\n`;
    });
    response += '\n';
  }
  
  if (info.daily_customer_limit) {
    response += `**Daily Customer Limit:** S$${info.daily_customer_limit.toLocaleString()}\n\n`;
  }
  
  if (info.max_daily_limit) {
    response += `**Maximum Daily Limits:**\n`;
    Object.entries(info.max_daily_limit).forEach(([key, value]) => {
      response += `• ${key.replace('_', ' ')}: S$${value.toLocaleString()}\n`;
    });
    response += '\n';
  }
  
  if (info.monthly_limit) {
    response += `**Monthly Limit:** S$${info.monthly_limit.toLocaleString()}\n\n`;
  }
  
  if (info.paynow_limit_choices && info.paynow_limit_choices.length > 0) {
    response += `**PayNow Limit Options:** ${info.paynow_limit_choices.map(l => `S$${l.toLocaleString()}`).join(', ')}\n\n`;
  }
  
  response += `**🛡️ Scam Protection:**\n`;
  response += `• Cooling period: ${info.scam_safeguard.cooling_period_hours} hours\n`;
  response += `• Trigger: ${info.scam_safeguard.trigger}\n\n`;
  
  response += `**📞 Customer Service:**\n`;
  response += `• Hotline: ${info.customer_service.hotline}\n`;
  response += `• Email: ${info.customer_service.email}\n`;
  response += `• Hours: ${info.customer_service.operating_hours}\n`;
  response += `• Website: ${info.customer_service.website}\n\n`;
  
  return response;
}

export function formatCustomerService(bankName: string, info: BankInfo): string {
  let response = `📞 **${bankName} Customer Service**\n\n`;
  response += `**Hotline:** ${info.customer_service.hotline}\n`;
  response += `**Email:** ${info.customer_service.email}\n`;
  response += `**Operating Hours:** ${info.customer_service.operating_hours}\n`;
  response += `**Website:** ${info.customer_service.website}\n\n`;
  response += `💡 **Tip:** Have your account number and NRIC ready when calling!`;
  return response;
}

export function formatRegistrationGuide(bankName: string, info: BankInfo): string {
  let response = `📝 **How to Register ${bankName} Account**\n\n`;
  response += `**Steps:**\n`;
  info.registration_guide.steps.forEach((step, i) => {
    response += `${i + 1}. ${step}\n`;
  });
  response += `\n**Requirements:**\n`;
  info.registration_guide.requirements.forEach(req => {
    response += `• ${req}\n`;
  });
  response += `\n**Estimated Time:** ${info.registration_guide.estimated_time}`;
  return response;
}

export function formatCommonIssues(bankName: string, info: BankInfo): string {
  let response = `⚠️ **${bankName} Common Issues & Solutions**\n\n`;
  info.common_issues.forEach((item, i) => {
    response += `**${i + 1}. ${item.issue}**\n`;
    response += `${item.solution}\n\n`;
  });
  return response;
}

export function generateEmailTemplate(bankName: string, issue: string, accountNumber?: string): string {
  const info = getBankInfo(bankName);
  if (!info) return "Bank not found";
  
  return `Subject: ${issue} - Account ${accountNumber || '[Your Account Number]'}

Dear ${bankName} Customer Service Team,

I am writing to report an issue with my account.

Account Number: ${accountNumber || '[Your Account Number]'}
NRIC: [Your NRIC Last 4 digits]
Contact Number: [Your Mobile]

Issue Description:
${issue}

Request:
Please investigate this matter and provide assistance to resolve the issue.

I can be reached at:
- Mobile: [Your Number]
- Email: [Your Email]

Thank you for your prompt attention to this matter.

Best regards,
[Your Name]

---
Auto-generated by Banking Assistant
${bankName} Email: ${info.customer_service.email}
Hotline: ${info.customer_service.hotline}`;
}

export function getAllBanks(): string[] {
  return Object.keys(bankKnowledge);
}

export function searchBanks(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  const results = new Set<string>();
  
  Object.keys(bankKnowledge).forEach(bank => {
    const info = bankKnowledge[bank];
    if (
      bank.toLowerCase().includes(lowerQuery) ||
      info.description.toLowerCase().includes(lowerQuery) ||
      info.type.toLowerCase().includes(lowerQuery) ||
      info.aliases.some(alias => alias.includes(lowerQuery))
    ) {
      results.add(bank);
    }
  });
  
  return Array.from(results);
}