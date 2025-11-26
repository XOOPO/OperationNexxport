import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleLastInOuts, LastInOut as LastInOutType } from '@/lib/sampleData';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export function LastInOut() {
  const [records, setRecords] = useState<LastInOutType[]>(sampleLastInOuts);
  const [form, setForm] = useState({
    dateIssued: new Date().toISOString().split('T')[0],
    bankName: '',
    bankAccountHolderName: '',
    bankAccountNumber: '',
    bankBalance: '',
    issues: ISSUE_OPTIONS[0],
    lastIn1Time: '',
    lastIn1Name: '',
    lastIn1Amount: '',
    lastIn2Time: '',
    lastIn2Name: '',
    lastIn2Amount: '',
    lastIn3Time: '',
    lastIn3Name: '',
    lastIn3Amount: '',
    lastOut1Time: '',
    lastOut1Name: '',
    lastOut1Amount: '',
    lastOut2Time: '',
    lastOut2Name: '',
    lastOut2Amount: '',
    lastOut3Time: '',
    lastOut3Name: '',
    lastOut3Amount: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setForm({
      dateIssued: new Date().toISOString().split('T')[0],
      bankName: '',
      bankAccountHolderName: '',
      bankAccountNumber: '',
      bankBalance: '',
      issues: ISSUE_OPTIONS[0],
      lastIn1Time: '',
      lastIn1Name: '',
      lastIn1Amount: '',
      lastIn2Time: '',
      lastIn2Name: '',
      lastIn2Amount: '',
      lastIn3Time: '',
      lastIn3Name: '',
      lastIn3Amount: '',
      lastOut1Time: '',
      lastOut1Name: '',
      lastOut1Amount: '',
      lastOut2Time: '',
      lastOut2Name: '',
      lastOut2Amount: '',
      lastOut3Time: '',
      lastOut3Name: '',
      lastOut3Amount: ''
    });
    setEditingId(null);
  };

  const addRecord = () => {
    if (!form.bankName || !form.bankAccountHolderName || !form.bankAccountNumber || !form.bankBalance) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? { ...r, ...form } : r));
      toast.success('Record updated successfully');
    } else {
      const newRecord: LastInOutType = {
        id: Date.now(),
        ...form
      };
      setRecords([newRecord, ...records]);
      toast.success('Record added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editRecord = (record: LastInOutType) => {
    setForm({ ...record });
    setEditingId(record.id);
    setIsDialogOpen(true);
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter(r => r.id !== id));
    toast.success('Record deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Date Issued', 'Bank Name', 'Account Holder', 'Account Number', 'Balance', 'Issues', 'Last In 1 Time', 'Last In 1 Name', 'Last In 1 Amount', 'Last In 2 Time', 'Last In 2 Name', 'Last In 2 Amount', 'Last In 3 Time', 'Last In 3 Name', 'Last In 3 Amount', 'Last Out 1 Time', 'Last Out 1 Name', 'Last Out 1 Amount', 'Last Out 2 Time', 'Last Out 2 Name', 'Last Out 2 Amount', 'Last Out 3 Time', 'Last Out 3 Name', 'Last Out 3 Amount'];
    const csvData = [
      headers.join(','),
      ...records.map(r => 
        [r.dateIssued, r.bankName, r.bankAccountHolderName, r.bankAccountNumber, r.bankBalance, r.issues, r.lastIn1Time, r.lastIn1Name, r.lastIn1Amount, r.lastIn2Time, r.lastIn2Name, r.lastIn2Amount, r.lastIn3Time, r.lastIn3Name, r.lastIn3Amount, r.lastOut1Time, r.lastOut1Name, r.lastOut1Amount, r.lastOut2Time, r.lastOut2Name, r.lastOut2Amount, r.lastOut3Time, r.lastOut3Name, r.lastOut3Amount].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `last-in-out-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Last In Out</h1>
          <p className="text-muted-foreground mt-1">Track last transaction details for bank issues</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Record' : 'Add New Record'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the last in/out record details.' : 'Add a new last in/out record.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dateIssued">Date Issued *</Label>
                  <Input
                    id="dateIssued"
                    type="date"
                    value={form.dateIssued}
                    onChange={(e) => setForm({ ...form, dateIssued: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    placeholder="LIQUIDPAY"
                    value={form.bankName}
                    onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bankAccountHolderName">Bank Account Holder Name *</Label>
                <Input
                  id="bankAccountHolderName"
                  placeholder="John Doe"
                  value={form.bankAccountHolderName}
                  onChange={(e) => setForm({ ...form, bankAccountHolderName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="bankBalance">Bank Balance *</Label>
                  <Input
                    id="bankBalance"
                    placeholder="$5,000"
                    value={form.bankBalance}
                    onChange={(e) => setForm({ ...form, bankBalance: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issues">Issues *</Label>
                <Select value={form.issues} onValueChange={(value) => setForm({ ...form, issues: value })}>
                  <SelectTrigger id="issues">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ISSUE_OPTIONS.map(issue => (
                      <SelectItem key={issue} value={issue}>{issue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last In (1)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn1Time">Time</Label>
                    <Input
                      id="lastIn1Time"
                      placeholder="10:30 AM"
                      value={form.lastIn1Time}
                      onChange={(e) => setForm({ ...form, lastIn1Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn1Name">Name</Label>
                    <Input
                      id="lastIn1Name"
                      placeholder="Alice"
                      value={form.lastIn1Name}
                      onChange={(e) => setForm({ ...form, lastIn1Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn1Amount">Amount</Label>
                    <Input
                      id="lastIn1Amount"
                      placeholder="$500"
                      value={form.lastIn1Amount}
                      onChange={(e) => setForm({ ...form, lastIn1Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last In (2)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn2Time">Time</Label>
                    <Input
                      id="lastIn2Time"
                      placeholder="09:15 AM"
                      value={form.lastIn2Time}
                      onChange={(e) => setForm({ ...form, lastIn2Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn2Name">Name</Label>
                    <Input
                      id="lastIn2Name"
                      placeholder="Bob"
                      value={form.lastIn2Name}
                      onChange={(e) => setForm({ ...form, lastIn2Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn2Amount">Amount</Label>
                    <Input
                      id="lastIn2Amount"
                      placeholder="$300"
                      value={form.lastIn2Amount}
                      onChange={(e) => setForm({ ...form, lastIn2Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last In (3)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn3Time">Time</Label>
                    <Input
                      id="lastIn3Time"
                      placeholder="08:00 AM"
                      value={form.lastIn3Time}
                      onChange={(e) => setForm({ ...form, lastIn3Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn3Name">Name</Label>
                    <Input
                      id="lastIn3Name"
                      placeholder="Eve"
                      value={form.lastIn3Name}
                      onChange={(e) => setForm({ ...form, lastIn3Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastIn3Amount">Amount</Label>
                    <Input
                      id="lastIn3Amount"
                      placeholder="$200"
                      value={form.lastIn3Amount}
                      onChange={(e) => setForm({ ...form, lastIn3Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last Out (1)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut1Time">Time</Label>
                    <Input
                      id="lastOut1Time"
                      placeholder="11:00 AM"
                      value={form.lastOut1Time}
                      onChange={(e) => setForm({ ...form, lastOut1Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut1Name">Name</Label>
                    <Input
                      id="lastOut1Name"
                      placeholder="Charlie"
                      value={form.lastOut1Name}
                      onChange={(e) => setForm({ ...form, lastOut1Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut1Amount">Amount</Label>
                    <Input
                      id="lastOut1Amount"
                      placeholder="$600"
                      value={form.lastOut1Amount}
                      onChange={(e) => setForm({ ...form, lastOut1Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last Out (2)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut2Time">Time</Label>
                    <Input
                      id="lastOut2Time"
                      placeholder="10:45 AM"
                      value={form.lastOut2Time}
                      onChange={(e) => setForm({ ...form, lastOut2Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut2Name">Name</Label>
                    <Input
                      id="lastOut2Name"
                      placeholder="David"
                      value={form.lastOut2Name}
                      onChange={(e) => setForm({ ...form, lastOut2Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut2Amount">Amount</Label>
                    <Input
                      id="lastOut2Amount"
                      placeholder="$400"
                      value={form.lastOut2Amount}
                      onChange={(e) => setForm({ ...form, lastOut2Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Last Out (3)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut3Time">Time</Label>
                    <Input
                      id="lastOut3Time"
                      placeholder="09:30 AM"
                      value={form.lastOut3Time}
                      onChange={(e) => setForm({ ...form, lastOut3Time: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut3Name">Name</Label>
                    <Input
                      id="lastOut3Name"
                      placeholder="Frank"
                      value={form.lastOut3Name}
                      onChange={(e) => setForm({ ...form, lastOut3Name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastOut3Amount">Amount</Label>
                    <Input
                      id="lastOut3Amount"
                      placeholder="$350"
                      value={form.lastOut3Amount}
                      onChange={(e) => setForm({ ...form, lastOut3Amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addRecord}>
                {editingId ? 'Update' : 'Add'} Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Last In Out Records</CardTitle>
              <CardDescription>View and manage transaction records for bank issues</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EnhancedDataTable
            columns={[
              { key: 'dateIssued', label: 'Date Issued' },
              { key: 'bankName', label: 'Bank Name' },
              { key: 'bankAccountHolderName', label: 'Account Holder' },
              { key: 'bankAccountNumber', label: 'Account Number' },
              { key: 'bankBalance', label: 'Balance' },
              { key: 'issues', label: 'Issues' },
              { 
                key: 'lastIn1Time', 
                label: 'Last In (1)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastIn1Time}</div>
                    <div className="text-muted-foreground">{row.lastIn1Name} - {row.lastIn1Amount}</div>
                  </div>
                )
              },
              { 
                key: 'lastIn2Time', 
                label: 'Last In (2)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastIn2Time}</div>
                    <div className="text-muted-foreground">{row.lastIn2Name} - {row.lastIn2Amount}</div>
                  </div>
                )
              },
              { 
                key: 'lastIn3Time', 
                label: 'Last In (3)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastIn3Time}</div>
                    <div className="text-muted-foreground">{row.lastIn3Name} - {row.lastIn3Amount}</div>
                  </div>
                )
              },
              { 
                key: 'lastOut1Time', 
                label: 'Last Out (1)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastOut1Time}</div>
                    <div className="text-muted-foreground">{row.lastOut1Name} - {row.lastOut1Amount}</div>
                  </div>
                )
              },
              { 
                key: 'lastOut2Time', 
                label: 'Last Out (2)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastOut2Time}</div>
                    <div className="text-muted-foreground">{row.lastOut2Name} - {row.lastOut2Amount}</div>
                  </div>
                )
              },
              { 
                key: 'lastOut3Time', 
                label: 'Last Out (3)',
                render: (_, row) => (
                  <div className="text-xs">
                    <div>{row.lastOut3Time}</div>
                    <div className="text-muted-foreground">{row.lastOut3Name} - {row.lastOut3Amount}</div>
                  </div>
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
                      onClick={() => editRecord(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRecord(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={records}
            searchKeys={['bankName', 'bankAccountHolderName', 'bankAccountNumber', 'issues']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}