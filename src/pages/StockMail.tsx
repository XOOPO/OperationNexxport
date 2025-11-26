import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { StockMail as StockMailType } from '@/lib/sampleData';
import { useData } from '@/contexts/DataContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';
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

const HANDLER_OPTIONS = ['YULITA', 'ERIC', 'REBECCA', 'Nicholas', 'Xan', 'Danial', 'Matthew', 'Yohana', 'Michelle', 'Sohail'];
const STATUS_OPTIONS = ['NEW', 'USING', 'NEED VERIFY', 'INACTIVE'];
const STOCK_MAIL_PIN = 'AAaa1234';

export function StockMail() {
  const { stockMails: mails, setStockMails: setMails } = useData();
  const [form, setForm] = useState({ email: '', password: '', device: '', status: 'NEW', handler: '', assign: 'INTERNAL' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterAssign, setFilterAssign] = useState<string>('all');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);

  const stats = useMemo(() => {
    return {
      total: mails.length,
      new: mails.filter(m => m.status === 'NEW').length,
      using: mails.filter(m => m.status === 'USING').length,
      needVerify: mails.filter(m => m.status === 'NEED VERIFY').length,
      internal: mails.filter(m => m.assign === 'INTERNAL').length,
      external: mails.filter(m => m.assign === 'EXTERNAL').length,
    };
  }, [mails]);

  const filteredMails = useMemo(() => {
    let filtered = [...mails];
    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }
    if (filterAssign !== 'all') {
      filtered = filtered.filter(m => m.assign === filterAssign);
    }
    return filtered;
  }, [mails, filterStatus, filterAssign]);

  const resetForm = () => {
    setForm({ email: '', password: '', device: '', status: 'NEW', handler: '', assign: 'INTERNAL' });
    setEditingId(null);
  };

  const addMail = () => {
    if (!form.email || !form.password || !form.device) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setMails(mails.map(m => m.id === editingId ? { ...m, ...form } : m));
      toast.success('Mail updated successfully');
    } else {
      const newMail: StockMailType = {
        id: Date.now(),
        email: form.email,
        password: form.password,
        device: form.device,
        status: form.status,
        handler: form.handler,
        assign: form.assign
      };
      setMails([newMail, ...mails]);
      toast.success('Mail added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editMail = (mail: StockMailType) => {
    setForm({
      email: mail.email,
      password: mail.password,
      device: mail.device,
      status: mail.status,
      handler: mail.handler,
      assign: mail.assign
    });
    setEditingId(mail.id);
    setIsDialogOpen(true);
  };

  const deleteMail = (id: number) => {
    setMails(mails.filter(m => m.id !== id));
    toast.success('Mail deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Password', 'Device', 'Status', 'Handler', 'Assign'];
    const csvData = [
      headers.join(','),
      ...filteredMails.map(m => 
        [m.email, m.password, m.device, m.status, m.handler || 'N/A', m.assign].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stock-mail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const handleUnlock = () => {
    if (pinInput === STOCK_MAIL_PIN) {
      setIsUnlocked(true);
      setPinInput('');
      toast.success('Access granted to Stock Mail');
    } else {
      toast.error('Incorrect PIN');
      setPinInput('');
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
            <CardTitle className="text-2xl">Stock Mail Access</CardTitle>
            <CardDescription>Enter security PIN to access stock mail data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unlock-pin">Security PIN</Label>
              <div className="relative">
                <Input
                  id="unlock-pin"
                  type={showPin ? 'text' : 'password'}
                  placeholder="Enter PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
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
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? (
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
          <h1 className="text-3xl font-bold">Stock Mail</h1>
          <p className="text-muted-foreground mt-1">Manage email accounts and devices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Mail
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Mail' : 'Add New Mail'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the mail account details below.' : 'Add a new mail account to your stock.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="device">Device *</Label>
                <Input
                  id="device"
                  placeholder="iPhone-12, Android-5"
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
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
                  <Label htmlFor="assign">Assignment</Label>
                  <Select value={form.assign} onValueChange={(value) => setForm({ ...form, assign: value })}>
                    <SelectTrigger id="assign">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                      <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="handler">Handler (Optional)</Label>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addMail}>
                {editingId ? 'Update' : 'Add'} Mail
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Mails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Using</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.using}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Need Verify</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.needVerify}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Internal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.internal}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">External</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.external}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mail Accounts</CardTitle>
              <CardDescription>View and manage all stock mail accounts</CardDescription>
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
            <Select value={filterAssign} onValueChange={setFilterAssign}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Assignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignments</SelectItem>
                <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
              </SelectContent>
            </Select>
            {(filterStatus !== 'all' || filterAssign !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setFilterStatus('all'); setFilterAssign('all'); }}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Filters
              </Button>
            )}
          </div>

          <EnhancedDataTable
            columns={[
              { key: 'email', label: 'Email' },
              { key: 'device', label: 'Device' },
              { key: 'password', label: 'Password' },
              { 
                key: 'status', 
                label: 'Status',
                render: (value) => (
                  <Badge variant={value === 'USING' ? 'default' : value === 'NEED VERIFY' ? 'outline' : 'secondary'}>
                    {value}
                  </Badge>
                )
              },
              { key: 'handler', label: 'Handler' },
              { 
                key: 'assign', 
                label: 'Assignment',
                render: (value) => (
                  <Badge variant={value === 'INTERNAL' ? 'default' : 'secondary'}>
                    {value}
                  </Badge>
                )
              },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editMail(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMail(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={filteredMails}
            searchKeys={['email', 'device', 'handler', 'assign']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}