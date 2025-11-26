import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleBankIssues, BankIssue } from '@/lib/sampleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ISSUE_OPTIONS = [
  'Suspend Cant Transfer In',
  'Cannot transfer out',
  'Cannot received',
  'Cannot transfer out and receive',
  'Password incorrected',
  'Cannot login and ask for contact CS',
  'Log out',
  'Account closed',
  'Security Alert',
  'Suspended Can\'t IN',
  'Returned to owner',
  'Bank owner used',
  'Account Blocked',
  'Account Error',
  'Email Error'
];

const STATUS_OPTIONS = ['PENDING', 'IN PROGRESS', 'RESOLVED', 'Close Limit'];
const HANDLER_OPTIONS = ['Yulita', 'Danial', 'Halvin'];

export function BankIssues() {
  const [issues, setIssues] = useState<BankIssue[]>(sampleBankIssues);
  const [form, setForm] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    issue: ISSUE_OPTIONS[0],
    lastBalance: '',
    status: 'PENDING',
    handler: '',
    dateReported: new Date().toISOString().split('T')[0],
    device: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterHandler, setFilterHandler] = useState<string>('all');

  const stats = useMemo(() => {
    return {
      total: issues.length,
      pending: issues.filter(i => i.status === 'PENDING').length,
      inProgress: issues.filter(i => i.status === 'IN PROGRESS').length,
      resolved: issues.filter(i => i.status === 'RESOLVED').length,
      closeLimit: issues.filter(i => i.status === 'Close Limit').length,
    };
  }, [issues]);

  const filteredIssues = useMemo(() => {
    let filtered = [...issues];
    if (filterStatus !== 'all') {
      filtered = filtered.filter(i => i.status === filterStatus);
    }
    if (filterHandler !== 'all') {
      filtered = filtered.filter(i => i.handler === filterHandler);
    }
    return filtered;
  }, [issues, filterStatus, filterHandler]);

  const resetForm = () => {
    setForm({
      bankName: '',
      accountHolder: '',
      accountNumber: '',
      issue: ISSUE_OPTIONS[0],
      lastBalance: '',
      status: 'PENDING',
      handler: '',
      dateReported: new Date().toISOString().split('T')[0],
      device: ''
    });
    setEditingId(null);
  };

  const addIssue = () => {
    if (!form.bankName || !form.accountHolder || !form.accountNumber || !form.lastBalance) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setIssues(issues.map(i => i.id === editingId ? { ...i, ...form } : i));
      toast.success('Issue updated successfully');
    } else {
      const newIssue: BankIssue = {
        id: Date.now(),
        ...form
      };
      setIssues([newIssue, ...issues]);
      toast.success('Issue added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editIssue = (issue: BankIssue) => {
    setForm({
      bankName: issue.bankName,
      accountHolder: issue.accountHolder,
      accountNumber: issue.accountNumber,
      issue: issue.issue,
      lastBalance: issue.lastBalance,
      status: issue.status,
      handler: issue.handler,
      dateReported: issue.dateReported,
      device: issue.device || ''
    });
    setEditingId(issue.id);
    setIsDialogOpen(true);
  };

  const deleteIssue = (id: number) => {
    setIssues(issues.filter(i => i.id !== id));
    toast.success('Issue deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Bank Name', 'Account Holder', 'Account Number', 'Issue', 'Device', 'Last Balance', 'Status', 'Handler', 'Date Reported'];
    const csvData = [
      headers.join(','),
      ...filteredIssues.map(i => 
        [i.bankName, i.accountHolder, i.accountNumber, i.issue, i.device || '', i.lastBalance, i.status, i.handler, i.dateReported].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-issues-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bank Issues</h1>
          <p className="text-muted-foreground mt-1">Track and manage bank account issues</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Issue' : 'Report New Issue'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the issue details below.' : 'Report a new bank account issue.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="LIQUIDPAY"
                  value={form.bankName}
                  onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountHolder">Account Holder *</Label>
                <Input
                  id="accountHolder"
                  placeholder="John Doe"
                  value={form.accountHolder}
                  onChange={(e) => setForm({ ...form, accountHolder: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  placeholder="1234567890"
                  value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue">Issue *</Label>
                <Select value={form.issue} onValueChange={(value) => setForm({ ...form, issue: value })}>
                  <SelectTrigger id="issue">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ISSUE_OPTIONS.map(issue => (
                      <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="device">Device</Label>
                <Input
                  id="device"
                  placeholder="F104"
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastBalance">Last Balance *</Label>
                <Input
                  id="lastBalance"
                  placeholder="$5,000"
                  value={form.lastBalance}
                  onChange={(e) => setForm({ ...form, lastBalance: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="handler">Handler</Label>
                  <Select value={form.handler} onValueChange={(value) => setForm({ ...form, handler: value })}>
                    <SelectTrigger id="handler">
                      <SelectValue placeholder="Select handler" />
                    </SelectTrigger>
                    <SelectContent>
                      {HANDLER_OPTIONS.map(handler => (
                        <SelectItem key={handler} value={handler}>{handler}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateReported">Date Reported *</Label>
                <Input
                  id="dateReported"
                  type="date"
                  value={form.dateReported}
                  onChange={(e) => setForm({ ...form, dateReported: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addIssue}>
                {editingId ? 'Update' : 'Report'} Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Close Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.closeLimit}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bank Issues</CardTitle>
              <CardDescription>View and manage all reported issues</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {STATUS_OPTIONS.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterHandler} onValueChange={setFilterHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Handler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Handlers</SelectItem>
                {HANDLER_OPTIONS.map(handler => (
                  <SelectItem key={handler} value={handler}>{handler}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(filterStatus !== 'all' || filterHandler !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setFilterStatus('all'); setFilterHandler('all'); }}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Filters
              </Button>
            )}
          </div>

          <EnhancedDataTable
            columns={[
              { key: 'bankName', label: 'Bank Name' },
              { key: 'accountHolder', label: 'Account Holder' },
              { key: 'accountNumber', label: 'Account Number' },
              { key: 'issue', label: 'Issue' },
              { key: 'device', label: 'Device' },
              { key: 'lastBalance', label: 'Last Balance' },
              { 
                key: 'status', 
                label: 'Status',
                render: (value) => {
                  const colors = {
                    'PENDING': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                    'IN PROGRESS': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    'RESOLVED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    'Close Limit': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  };
                  return <Badge className={colors[value as keyof typeof colors]}>{value}</Badge>;
                }
              },
              { key: 'handler', label: 'Handler' },
              { key: 'dateReported', label: 'Date Reported' },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editIssue(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteIssue(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={filteredIssues}
            searchKeys={['bankName', 'accountHolder', 'accountNumber', 'issue', 'device', 'handler']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}