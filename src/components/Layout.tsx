import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BotAssistant } from '@/components/BotAssistant';
import { VoiceChat } from '@/components/VoiceChat';
import { ProfilePicture } from '@/components/ProfilePicture';
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  Building2, 
  ArrowRightLeft, 
  Users, 
  AlertCircle, 
  Wallet, 
  Settings as SettingsIcon,
  BarChart3
} from 'lucide-react';

export function Sidebar() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  return (
    <aside className="w-72 bg-card border-r min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-xl font-bold text-primary-foreground">N</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">NEXXPORT</h2>
            <p className="text-xs text-muted-foreground">Operations Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-sm flex-1">
        <NavLink href="/" active={isActive('/')} icon={<LayoutDashboard className="w-4 h-4" />}>
          Overview
        </NavLink>
        <NavLink href="/stock-mail" active={isActive('/stock-mail')} icon={<Mail className="w-4 h-4" />}>
          Stock Mail
        </NavLink>
        <NavLink href="/bank-accounts" active={isActive('/bank-accounts')} icon={<Building2 className="w-4 h-4" />}>
          Bank Account Details
        </NavLink>
        <NavLink href="/bank-issues" active={isActive('/bank-issues')} icon={<AlertCircle className="w-4 h-4" />}>
          Bank Issues
        </NavLink>
        <NavLink href="/bank-issues-last-in-out" active={isActive('/bank-issues-last-in-out')} icon={<ArrowRightLeft className="w-4 h-4" />}>
          Last In Out
        </NavLink>
        <NavLink href="/bank-issues-follow-up" active={isActive('/bank-issues-follow-up')} icon={<FileText className="w-4 h-4" />}>
          Issue Follow Up
        </NavLink>
        <NavLink href="/c-operation" active={isActive('/c-operation')} icon={<Building2 className="w-4 h-4" />}>
          C Operation
        </NavLink>
        <NavLink href="/transaction-summary" active={isActive('/transaction-summary')} icon={<ArrowRightLeft className="w-4 h-4" />}>
          Transaction Summary
        </NavLink>
        <NavLink href="/agent-listing" active={isActive('/agent-listing')} icon={<Users className="w-4 h-4" />}>
          Agent Listing
        </NavLink>
        <NavLink href="/daily-report" active={isActive('/daily-report')} icon={<FileText className="w-4 h-4" />}>
          Daily Report
        </NavLink>
        <NavLink href="/wealth-plus" active={isActive('/wealth-plus')} icon={<Wallet className="w-4 h-4" />}>
          Wealth+
        </NavLink>
        <NavLink href="/analytics" active={isActive('/analytics')} icon={<BarChart3 className="w-4 h-4" />}>
          Analytics & Insights
        </NavLink>
        <NavLink href="/settings" active={isActive('/settings')} icon={<SettingsIcon className="w-4 h-4" />}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

function NavLink({ href, active, icon, children }: { href: string; active: boolean; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-accent hover:text-accent-foreground'}`}>
        {icon}
        <span className="font-medium">{children}</span>
      </a>
    </Link>
  );
}

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold tracking-wide">Operational Management</h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <ProfilePicture />
        <div className="text-sm font-medium px-3 py-1.5 bg-muted rounded-md">{user?.displayName || user?.username}</div>
        <Button onClick={logout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <BotAssistant />
      <VoiceChat />
    </div>
  );
}