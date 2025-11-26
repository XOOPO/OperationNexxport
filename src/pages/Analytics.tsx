import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export function Analytics() {
  const { bankIssueFollowUps } = useData();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate operator performance from current month's data
  const { operatorStats, displayMonth, displayYear } = useMemo(() => {
    // Parse all dates and find the most recent month with data
    const recordsWithDates = bankIssueFollowUps.map(record => {
      const [day, month, year] = record.date.split('/').map(Number);
      return {
        ...record,
        parsedDate: new Date(year, month - 1, day)
      };
    }).filter(r => !isNaN(r.parsedDate.getTime()));

    // Find the most recent month/year combination in the data
    let filterMonth = currentMonth;
    let filterYear = currentYear;
    
    if (recordsWithDates.length > 0) {
      // Sort by date descending to get most recent
      const sortedRecords = [...recordsWithDates].sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());
      const mostRecentDate = sortedRecords[0].parsedDate;
      filterMonth = mostRecentDate.getMonth();
      filterYear = mostRecentDate.getFullYear();
    }

    // Filter records for the target month
    const currentMonthRecords = recordsWithDates.filter(record => {
      return record.parsedDate.getMonth() === filterMonth && 
             record.parsedDate.getFullYear() === filterYear;
    });

    // Group by operator
    const operatorGroups: Record<string, { count: number; totalAmount: number }> = {};
    
    currentMonthRecords.forEach(record => {
      const operator = record.operator || '-';
      if (!operatorGroups[operator]) {
        operatorGroups[operator] = { count: 0, totalAmount: 0 };
      }
      operatorGroups[operator].count++;
      // Parse transfer amount (remove any non-numeric characters except decimal point)
      const amount = parseFloat(record.transferOutBalance.replace(/[^0-9.]/g, '')) || 0;
      operatorGroups[operator].totalAmount += amount;
    });

    // Convert to array and sort by count descending
    const stats = Object.entries(operatorGroups)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        totalAmount: stats.totalAmount
      }))
      .sort((a, b) => b.count - a.count);

    return { 
      operatorStats: stats, 
      displayMonth: filterMonth, 
      displayYear: filterYear 
    };
  }, [bankIssueFollowUps, currentMonth, currentYear]);

  // Calculate overall stats
  const overallStats = useMemo(() => {
    const total = operatorStats.reduce((sum, op) => sum + op.count, 0);
    const totalAmount = operatorStats.reduce((sum, op) => sum + op.totalAmount, 0);
    
    return {
      totalRecords: total,
      totalAmount,
      uniqueOperators: operatorStats.length
    };
  }, [operatorStats]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get color for operator card
  const getOperatorColor = (index: number) => {
    const colors = [
      'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      'bg-pink-100 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
      'bg-teal-100 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
    ];
    return colors[index % colors.length];
  };

  const getOperatorIconColor = (index: number) => {
    const colors = [
      'text-blue-600 dark:text-blue-400',
      'text-purple-600 dark:text-purple-400',
      'text-green-600 dark:text-green-400',
      'text-orange-600 dark:text-orange-400',
      'text-pink-600 dark:text-pink-400',
      'text-teal-600 dark:text-teal-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Total Performance</h1>
        <p className="text-muted-foreground mt-1">
          Individual operator performance for {monthNames[displayMonth]} {displayYear}
        </p>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Records
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallStats.totalRecords}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Bank issue follow-ups this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Amount
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${overallStats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total transferred out balance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Operators
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overallStats.uniqueOperators}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Different operators this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Individual Operator Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Performance</CardTitle>
          <CardDescription>
            Performance breakdown by operator for {monthNames[displayMonth]} {displayYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {operatorStats.map((operator, index) => (
              <Card key={operator.name} className={`${getOperatorColor(index)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-white/50 dark:bg-black/20">
                        <User className={`w-4 h-4 ${getOperatorIconColor(index)}`} />
                      </div>
                      <h3 className="font-semibold text-lg">{operator.name}</h3>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Total Cases:</span>
                      <span className="text-2xl font-bold">{operator.count}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Total Amount:</span>
                      <span className="text-lg font-semibold">
                        ${operator.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t">
                      <span className="text-xs text-muted-foreground">Avg per case:</span>
                      <span className="text-sm font-medium">
                        ${(operator.totalAmount / operator.count).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {operatorStats.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-sm text-muted-foreground">
                No bank issue follow-ups recorded for {monthNames[displayMonth]} {displayYear}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Reset Notice */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Auto-Reset Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All performance metrics automatically reset at the beginning of each new month. 
                Currently showing the most recent month with data: {monthNames[displayMonth]} {displayYear}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}