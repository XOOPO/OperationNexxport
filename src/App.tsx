import { Route, Router, Switch } from "wouter";
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { VoiceChatProvider } from '@/contexts/VoiceChatContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { AppLayout } from '@/components/Layout';
import { RequireAuth } from '@/components/RequireAuth';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { StockMail } from '@/pages/StockMail';
import { BankAccounts } from '@/pages/BankAccounts';
import { BankIssues } from '@/pages/BankIssues';
import { LastInOut } from '@/pages/LastInOut';
import { BankIssueFollowUp } from '@/pages/BankIssueFollowUp';
import { COperation } from '@/pages/COperation';
import { TransactionSummary } from '@/pages/TransactionSummary';
import { AgentListing } from '@/pages/AgentListing';
import { AgentDownlines } from '@/pages/AgentDownlines';
import { DailyReport } from '@/pages/DailyReport';
import { WealthPlus } from '@/pages/WealthPlus';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VoiceChatProvider>
          <DataProvider>
          <Router base="/">
            <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/stock-mail">
              <RequireAuth>
                <AppLayout>
                  <StockMail />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/bank-accounts">
              <RequireAuth>
                <AppLayout>
                  <BankAccounts />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/bank-issues">
              <RequireAuth>
                <AppLayout>
                  <BankIssues />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/bank-issues-last-in-out">
              <RequireAuth>
                <AppLayout>
                  <LastInOut />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/bank-issues-follow-up">
              <RequireAuth>
                <AppLayout>
                  <BankIssueFollowUp />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/c-operation">
              <RequireAuth>
                <AppLayout>
                  <COperation />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/transaction-summary">
              <RequireAuth>
                <AppLayout>
                  <TransactionSummary />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/agent-listing">
              <RequireAuth>
                <AppLayout>
                  <AgentListing />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/agent-downlines">
              <RequireAuth>
                <AppLayout>
                  <AgentDownlines />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/daily-report">
              <RequireAuth>
                <AppLayout>
                  <DailyReport />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/wealth-plus">
              <RequireAuth>
                <AppLayout>
                  <WealthPlus />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/analytics">
              <RequireAuth>
                <AppLayout>
                  <Analytics />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route path="/settings">
              <RequireAuth>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </RequireAuth>
            </Route>
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2">404</h1>
                  <p className="text-muted-foreground">Sorry, this page doesn't exist.</p>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
        <Toaster />
          </DataProvider>
        </VoiceChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;