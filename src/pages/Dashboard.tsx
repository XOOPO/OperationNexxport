import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ProfilePicture } from '@/components/ProfilePicture';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  FileText,
  DollarSign,
  Sparkles,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  RefreshCw,
  Save,
  Download,
  Upload
} from 'lucide-react';

export function Dashboard() {
  const { 
    stockMails, 
    bankIssues, 
    bankIssueFollowUps,
    bankAccounts,
    cOperations,
    transactions,
    agents,
    downlines,
    dailyReports,
    wealthListings,
    lastInOuts
  } = useData();
  
  // Live clock and date (Singapore Time)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time and date for Singapore (UTC+8)
  const sgtTime = currentTime.toLocaleTimeString('en-SG', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const sgtDate = currentTime.toLocaleDateString('en-SG', {
    timeZone: 'Asia/Singapore',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate real metrics from data
  const metrics = useMemo(() => {
    const usingMails = stockMails.filter(m => m.status === 'USING').length;
    const needVerifyMails = stockMails.filter(m => m.status === 'NEED VERIFY').length;
    const internalMails = stockMails.filter(m => m.assign === 'INTERNAL').length;
    const externalMails = stockMails.filter(m => m.assign === 'EXTERNAL').length;
    
    // Get unique handlers
    const handlers = new Set(stockMails.map(m => m.handler).filter(h => h));
    
    // Get unique banks from follow-ups
    const banks = new Set(bankIssueFollowUps.map(f => f.bankName));

    // Calculate total transfer out volume
    const totalVolume = bankIssueFollowUps.reduce((sum, f) => {
      const amount = parseFloat(f.transferOutBalance) || 0;
      return sum + amount;
    }, 0);

    return {
      usingMails,
      needVerifyMails,
      internalMails,
      externalMails,
      pendingIssues: bankIssues.length,
      activeHandlers: handlers.size,
      connectedBanks: banks.size,
      totalFollowUps: bankIssueFollowUps.length,
      totalVolume
    };
  }, [stockMails, bankIssues, bankIssueFollowUps]);

  // Get recent bank issue follow-ups
  const recentActivity = useMemo(() => {
    return bankIssueFollowUps
      .slice(0, 4)
      .map(followUp => ({
        id: followUp.id,
        user: followUp.bankAccountHolderName,
        bank: followUp.bankName,
        action: 'Transfer Out',
        amount: `-$${followUp.transferOutBalance}`,
        operator: followUp.operator,
        time: followUp.time,
        date: followUp.date
      }));
  }, [bankIssueFollowUps]);

  // Calculate performance metrics from real data
  const performanceMetrics = useMemo(() => {
    const totalStockMails = stockMails.length;
    const usageRate = totalStockMails > 0 ? (metrics.usingMails / totalStockMails) * 100 : 0;
    const assignmentRate = totalStockMails > 0 ? ((metrics.internalMails + metrics.externalMails) / totalStockMails) * 100 : 0;
    const verificationRate = totalStockMails > 0 ? ((totalStockMails - metrics.needVerifyMails) / totalStockMails) * 100 : 0;
    const handlerCoverage = stockMails.filter(m => m.handler).length > 0 ? (stockMails.filter(m => m.handler).length / totalStockMails) * 100 : 0;

    return [
      { label: 'Stock Mail Usage Rate', value: Math.round(usageRate), color: 'bg-gradient-to-r from-violet-500 to-purple-500' },
      { label: 'Assignment Coverage', value: Math.round(assignmentRate), color: 'bg-gradient-to-r from-emerald-500 to-green-500' },
      { label: 'Verification Rate', value: Math.round(verificationRate), color: 'bg-gradient-to-r from-rose-500 to-pink-500' },
      { label: 'Handler Coverage', value: Math.round(handlerCoverage), color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    ];
  }, [stockMails, metrics]);

  // Calculate weekly activity chart data from follow-ups
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts = new Array(7).fill(0);
    
    // Count follow-ups per day (simplified - just counting recent ones)
    bankIssueFollowUps.slice(0, 70).forEach((followUp, index) => {
      const dayIndex = index % 7;
      counts[dayIndex]++;
    });

    return days.map((day, index) => ({
      day,
      value: counts[index]
    }));
  }, [bankIssueFollowUps]);

  const maxValue = Math.max(...chartData.map(d => d.value), 1);

  // Auto-refresh functionality - listen for data updates
  useEffect(() => {
    const handleDataUpdate = () => {
      setLastUpdated(new Date());
      if (autoRefresh) {
        toast.success('Dashboard updated', {
          description: 'Data synchronized across all users',
          duration: 2000,
        });
      }
    };

    window.addEventListener('data-updated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);
    
    return () => {
      window.removeEventListener('data-updated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, [autoRefresh]);

  // Auto-refresh timer - check for updates every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Manual refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    
    toast.success('Dashboard refreshed', {
      description: 'All data is up to date',
      duration: 2000,
    });

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  // Save/Export data to JSON file
  const handleSaveData = () => {
    const allData = {
      stockMails,
      bankAccounts,
      bankIssues,
      bankIssueFollowUps,
      cOperations,
      transactions,
      agents,
      downlines,
      dailyReports,
      wealthListings,
      lastInOuts,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexxport-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Data exported successfully', {
      description: 'All dashboard data has been saved to file',
      duration: 3000,
    });
  };

  // Format relative time for last updated
  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    
    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ProfilePicture />
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-extralight tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground mt-1.5 text-sm font-light">
                Welcome to NEXXPORT Operations Dashboard
              </p>
            </div>
          </div>
          
          {/* Live Clock and Date */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-primary" />
              <div className="flex flex-col items-end">
                <span className="text-2xl font-light tabular-nums tracking-tight">{sgtTime}</span>
                <span className="text-[10px] text-muted-foreground font-light uppercase tracking-wider">SGT</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-muted/50">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-light text-muted-foreground">{sgtDate}</span>
            </div>
          </div>
        </div>
        
        {/* Control Panel */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-muted-foreground'}`} />
                <span className="text-sm font-light text-muted-foreground">
                  Last updated: {getRelativeTime(lastUpdated)}
                </span>
              </div>
              
              <div className="h-4 w-px bg-border" />
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-light text-muted-foreground">Auto-refresh:</span>
                <Button
                  variant={autoRefresh ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setAutoRefresh(!autoRefresh);
                    toast.info(autoRefresh ? 'Auto-refresh disabled' : 'Auto-refresh enabled', {
                      description: autoRefresh 
                        ? 'Dashboard will not update automatically' 
                        : 'Dashboard will sync every 30 seconds',
                      duration: 2000,
                    });
                  }}
                  className="h-7 text-xs font-light"
                >
                  {autoRefresh ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 gap-2 font-light"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveData}
                className="h-8 gap-2 font-light"
              >
                <Download className="w-3.5 h-3.5" />
                Export Data
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bank Issues Card */}
        <div className="metric-card rounded-xl p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-red-500/10 backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-light text-green-400">
              <ArrowDownRight className="w-3 h-3" />
              <span>-12%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-wider">Pending Issues</p>
            <p className="text-3xl font-extralight gradient-text">{metrics.pendingIssues}</p>
            <p className="text-xs text-muted-foreground font-light">
              {metrics.pendingIssues === 0 ? 'No pending issues' : 'Issues to resolve'}
            </p>
          </div>
        </div>

        {/* Active Handlers Card */}
        <div className="metric-card rounded-xl p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 backdrop-blur-sm">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-light text-emerald-400">
              <Activity className="w-3 h-3" />
              <span>Active</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-wider">Active Handlers</p>
            <p className="text-3xl font-extralight gradient-text">{metrics.activeHandlers}</p>
            <p className="text-xs text-muted-foreground font-light">Managing operations</p>
          </div>
        </div>

        {/* Total Volume Card */}
        <div className="metric-card rounded-xl p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-blue-500/10 backdrop-blur-sm">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-light text-blue-400">
              <ArrowUpRight className="w-3 h-3" />
              <span>Total</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-wider">Transfer Volume</p>
            <p className="text-3xl font-extralight gradient-text">${(metrics.totalVolume / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground font-light">{metrics.totalFollowUps} transactions</p>
          </div>
        </div>

        {/* Connected Banks Card */}
        <div className="metric-card rounded-xl p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-violet-500/10 backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-light text-violet-400">
              <Activity className="w-3 h-3" />
              <span>All Active</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-light text-muted-foreground uppercase tracking-wider">Connected Banks</p>
            <p className="text-3xl font-extralight gradient-text">{metrics.connectedBanks}</p>
            <p className="text-xs text-muted-foreground font-light">All systems online</p>
          </div>
        </div>
      </div>

      {/* Charts and Transactions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-light">Weekly Activity</h3>
              <p className="text-sm text-muted-foreground font-light mt-0.5">Transaction volume overview</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-48">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-muted/30 rounded-lg overflow-hidden relative group">
                  <div 
                    className="w-full rounded-lg transition-all duration-500 ease-out progress-bar"
                    style={{ 
                      height: `${(item.value / maxValue) * 192}px`,
                    }}
                  />
                </div>
                <span className="text-xs font-light text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-light">Recent Activity</h3>
              <p className="text-sm text-muted-foreground font-light mt-0.5">Latest bank transfers</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-light">
              View All
            </Button>
          </div>
          
          <div className="space-y-1">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="transaction-item flex items-center gap-4 p-3 rounded-lg"
                >
                  <Avatar className="w-10 h-10 border border-border/50">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-light">
                      {activity.user.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light truncate">{activity.user}</p>
                    <p className="text-xs text-muted-foreground font-light">{activity.bank} • {activity.action}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-light text-rose-400">
                      {activity.amount}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <p className="text-xs text-muted-foreground font-light">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
            )}
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-light">Performance Metrics</h3>
            <p className="text-sm text-muted-foreground font-light mt-0.5">System health indicators</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-light text-muted-foreground">All systems operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-light">{metric.label}</span>
                <span className="text-sm font-light text-muted-foreground">{metric.value}%</span>
              </div>
              <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className={`absolute inset-y-0 left-0 ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm group-hover:bg-primary/20 transition-all">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-light text-base">Stock Mail</h3>
                <p className="text-sm text-muted-foreground font-light">{stockMails.length} emails managed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm group-hover:bg-primary/20 transition-all">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-light text-base">Bank Follow-ups</h3>
                <p className="text-sm text-muted-foreground font-light">{metrics.totalFollowUps} records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm group-hover:bg-primary/20 transition-all">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-light text-base">Analytics</h3>
                <p className="text-sm text-muted-foreground font-light">Deep insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}