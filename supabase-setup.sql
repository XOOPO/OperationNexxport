-- NEXXPORT Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stock Mails Table
CREATE TABLE IF NOT EXISTS stock_mails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  backup_code TEXT,
  status TEXT NOT NULL,
  assign TEXT,
  handler TEXT,
  remark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank Accounts Table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bank_name TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  balance TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank Issues Table
CREATE TABLE IF NOT EXISTS bank_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bank_name TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  priority TEXT,
  reported_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank Issue Follow Ups Table
CREATE TABLE IF NOT EXISTS bank_issue_follow_ups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bank_name TEXT NOT NULL,
  bank_account_holder_name TEXT NOT NULL,
  bank_account_number TEXT NOT NULL,
  transfer_out_balance TEXT,
  operator TEXT,
  time TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- C Operations Table
CREATE TABLE IF NOT EXISTS c_operations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operation_type TEXT NOT NULL,
  description TEXT,
  status TEXT,
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_type TEXT NOT NULL,
  amount TEXT,
  currency TEXT,
  status TEXT,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_name TEXT NOT NULL,
  agent_code TEXT,
  status TEXT,
  contact_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Downlines Table
CREATE TABLE IF NOT EXISTS downlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id),
  downline_name TEXT NOT NULL,
  level INTEGER,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Reports Table
CREATE TABLE IF NOT EXISTS daily_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_date DATE NOT NULL,
  report_type TEXT,
  content TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wealth Listings Table
CREATE TABLE IF NOT EXISTS wealth_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_name TEXT NOT NULL,
  category TEXT,
  value TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Last In Out Table
CREATE TABLE IF NOT EXISTS last_in_outs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  record_type TEXT NOT NULL,
  amount TEXT,
  timestamp TIMESTAMPTZ,
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stock_mails_status ON stock_mails(status);
CREATE INDEX IF NOT EXISTS idx_stock_mails_handler ON stock_mails(handler);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_bank_name ON bank_accounts(bank_name);
CREATE INDEX IF NOT EXISTS idx_bank_issues_status ON bank_issues(status);
CREATE INDEX IF NOT EXISTS idx_bank_issue_follow_ups_bank_name ON bank_issue_follow_ups(bank_name);

-- Enable Row Level Security (RLS)
ALTER TABLE stock_mails ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_issue_follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE c_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE downlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE wealth_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE last_in_outs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (adjust based on your auth requirements)
-- For now, allowing all operations for authenticated users

CREATE POLICY "Enable all operations for authenticated users" ON stock_mails
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON bank_accounts
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON bank_issues
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON bank_issue_follow_ups
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON c_operations
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON transactions
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON agents
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON downlines
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON daily_reports
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON wealth_listings
  FOR ALL USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON last_in_outs
  FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_stock_mails_updated_at BEFORE UPDATE ON stock_mails
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_issues_updated_at BEFORE UPDATE ON bank_issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_issue_follow_ups_updated_at BEFORE UPDATE ON bank_issue_follow_ups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_c_operations_updated_at BEFORE UPDATE ON c_operations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_downlines_updated_at BEFORE UPDATE ON downlines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_reports_updated_at BEFORE UPDATE ON daily_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wealth_listings_updated_at BEFORE UPDATE ON wealth_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_last_in_outs_updated_at BEFORE UPDATE ON last_in_outs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();