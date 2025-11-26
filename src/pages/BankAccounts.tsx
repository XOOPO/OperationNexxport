import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleBankAccounts, BankAccount } from '@/lib/sampleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react';
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

const BANK_OPTIONS = ['LIQUIDPAY', 'MARI BANK', 'DBS', 'MARI CORP'];
const STATUS_OPTIONS = ['ACTIVE', 'ON-HOLD', 'STOPPED', 'SUSPEND'];

const MASTER_PASSWORD = 'AAaa1234';

export function BankAccounts() {
  const [accounts, setAccounts] = useState<BankAccount[]>(sampleBankAccounts);
  const [form, setForm] = useState({
    bankName: 'LIQUIDPAY',
    status: 'ACTIVE',
    accountHolderName: '',
    bankAccountNumber: '',
    email: '',
    emailPassword: '',
    bankPassword: '',
    device: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBank, setFilterBank] = useState<string>('all');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState<{[key: number]: boolean}>({});
  const [showBankPassword, setShowBankPassword] = useState<{[key: number]: boolean}>({});

  const stats = useMemo(() => {
    return {
      total: accounts.length,
      active: accounts.filter(a => a.status === 'ACTIVE').length,
      onHold: accounts.filter(a => a.status === 'ON-HOLD').length,
      stopped: accounts.filter(a => a.status === 'STOPPED').length,
      suspend: accounts.filter(a => a.status === 'SUSPEND').length,
    };
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    let filtered = [...accounts];
    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }
    if (filterBank !== 'all') {
      filtered = filtered.filter(a => a.bankName === filterBank);
    }
    return filtered;
  }, [accounts, filterStatus, filterBank]);

  const resetForm = () => {
    setForm({
      bankName: 'LIQUIDPAY',
      status: 'ACTIVE',
      accountHolderName: '',
      bankAccountNumber: '',
      email: '',
      emailPassword: '',
      bankPassword: '',
      device: ''
    });
    setEditingId(null);
  };

  const addAccount = () => {
    if (!form.accountHolderName || !form.bankAccountNumber || !form.email || !form.emailPassword || !form.bankPassword || !form.device) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setAccounts(accounts.map(a => a.id === editingId ? { ...a, ...form } : a));
      toast.success('Bank account updated successfully');
    } else {
      const newAccount: BankAccount = {
        id: Date.now(),
        ...form
      };
      setAccounts([newAccount, ...accounts]);
      toast.success('Bank account added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editAccount = (account: BankAccount) => {
    setForm({
      bankName: account.bankName,
      status: account.status,
      accountHolderName: account.accountHolderName,
      bankAccountNumber: account.bankAccountNumber,
      email: account.email,
      emailPassword: account.emailPassword,
      bankPassword: account.bankPassword,
      device: account.device
    });
    setEditingId(account.id);
    setIsDialogOpen(true);
  };

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(a => a.id !== id));
    toast.success('Bank account deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Bank Name', 'Status', 'Account Holder', 'Account Number', 'Email', 'Device'];
    const csvData = [
      headers.join(','),
      ...filteredAccounts.map(a => 
        [a.bankName, a.status, a.accountHolderName, a.bankAccountNumber, a.email, a.device].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-accounts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const handleUnlock = () => {
    if (passwordInput === MASTER_PASSWORD) {
      setIsUnlocked(true);
      setPasswordInput('');
      toast.success('Access granted');
    } else {
      toast.error('Incorrect password');
      setPasswordInput('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Bank Account Details</CardTitle>
            <CardDescription>Enter password to access sensitive information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unlock-password">Password</Label>
              <div className="relative">
                <Input
                  id="unlock-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnlock();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={handleUnlock} className="w-full">
              Unlock
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bank Account Details</h1>
          <p className="text-muted-foreground mt-1">Manage bank accounts and credentials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Bank Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Bank Account' : 'Add New Bank Account'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the bank account details below.' : 'Add a new bank account to your system.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Select value={form.bankName} onValueChange={(value) => setForm({ ...form, bankName: value })}>
                    <SelectTrigger id="bankName">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BANK_OPTIONS.map(bank => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  placeholder="John Doe"
                  value={form.accountHolderName}
                  onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bankAccountNumber">Bank Account Number *</Label>
                <Input
                  id="bankAccountNumber"
                  placeholder="1234567890"
                  value={form.bankAccountNumber}
                  onChange={(e) => setForm({ ...form, bankAccountNumber: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailPassword">Email Password *</Label>
                <Input
                  id="emailPassword"
                  type="password"
                  placeholder="Enter email password"
                  value={form.emailPassword}
                  onChange={(e) => setForm({ ...form, emailPassword: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bankPassword">Bank Password *</Label>
                <Input
                  id="bankPassword"
                  type="password"
                  placeholder="Enter bank password"
                  value={form.bankPassword}
                  onChange={(e) => setForm({ ...form, bankPassword: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="device">Device *</Label>
                <Input
                  id="device"
                  placeholder="iPhone-12, Android-8"
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addAccount}>
                {editingId ? 'Update' : 'Add'} Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On-Hold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.onHold}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stopped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.stopped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.suspend}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bank Accounts</CardTitle>
              <CardDescription>View and manage all bank accounts</CardDescription>
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
            <Select value={filterBank} onValueChange={setFilterBank}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {BANK_OPTIONS.map(bank => (
                  <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {(filterStatus !== 'all' || filterBank !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setFilterStatus('all'); setFilterBank('all'); }}
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
              { 
                key: 'status', 
                label: 'Status',
                render: (value) => {
                  const colors = {
                    'ACTIVE': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    'ON-HOLD': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    'STOPPED': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                    'SUSPEND': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  };
                  return <Badge className={colors[value as keyof typeof colors]}>{value}</Badge>;
                }
              },
              { key: 'accountHolderName', label: 'Account Holder' },
              { key: 'bankAccountNumber', label: 'Account Number' },
              { key: 'email', label: 'Email' },
              { 
                key: 'emailPassword', 
                label: 'Email Password',
                render: (value, row) => (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {showEmailPassword[row.id] ? value : '••••••••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmailPassword(prev => ({ ...prev, [row.id]: !prev[row.id] }))}
                      className="h-6 w-6 p-0"
                    >
                      {showEmailPassword[row.id] ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                )
              },
              { 
                key: 'bankPassword', 
                label: 'Bank Password',
                render: (value, row) => (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {showBankPassword[row.id] ? value : '••••••••'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBankPassword(prev => ({ ...prev, [row.id]: !prev[row.id] }))}
                      className="h-6 w-6 p-0"
                    >
                      {showBankPassword[row.id] ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                )
              },
              { key: 'device', label: 'Device' },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editAccount(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAccount(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={filteredAccounts}
            searchKeys={['bankName', 'accountHolderName', 'bankAccountNumber', 'email']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}