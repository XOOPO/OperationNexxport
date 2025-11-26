import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleBankIssueFollowUps, BankIssueFollowUp as BankIssueFollowUpType } from '@/lib/sampleData';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, Upload } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

const OPERATOR_OPTIONS = ['DANIAL', 'YULITA'];

export function BankIssueFollowUp() {
  const [records, setRecords] = useState<BankIssueFollowUpType[]>(sampleBankIssueFollowUps);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    bankName: '',
    bankAccountHolderName: '',
    bankAccountNumber: '',
    device: '',
    operator: '',
    transferOutBalance: '',
    attachment: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const operatorKPI = useMemo(() => {
    const danialRecords = records.filter(r => r.operator === 'DANIAL');
    const yulitaRecords = records.filter(r => r.operator === 'YULITA');
    
    const calculateTotal = (records: BankIssueFollowUpType[]) => {
      return records.reduce((sum, r) => {
        const amount = parseFloat(r.transferOutBalance.replace(/[$,]/g, '')) || 0;
        return sum + amount;
      }, 0);
    };

    return {
      DANIAL: {
        count: danialRecords.length,
        total: calculateTotal(danialRecords)
      },
      YULITA: {
        count: yulitaRecords.length,
        total: calculateTotal(yulitaRecords)
      }
    };
  }, [records]);

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      bankName: '',
      bankAccountHolderName: '',
      bankAccountNumber: '',
      device: '',
      operator: '',
      transferOutBalance: '',
      attachment: ''
    });
    setEditingId(null);
  };

  const [attachmentUrls, setAttachmentUrls] = useState<{[key: number]: string}>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
        toast.error('Please upload JPG or PNG file only');
        return;
      }
      const url = URL.createObjectURL(file);
      setForm({ ...form, attachment: file.name });
      if (editingId) {
        setAttachmentUrls(prev => ({ ...prev, [editingId]: url }));
      }
      toast.success('File uploaded successfully');
    }
  };

  const handleViewAttachment = (record: BankIssueFollowUpType) => {
    const url = attachmentUrls[record.id];
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.info('No attachment available for preview');
    }
  };

  const addRecord = () => {
    if (!form.bankName || !form.bankAccountHolderName || !form.bankAccountNumber || !form.device || !form.transferOutBalance) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setRecords(records.map(r => r.id === editingId ? { ...r, ...form } : r));
      toast.success('Follow-up record updated successfully');
    } else {
      const newRecord: BankIssueFollowUpType = {
        id: Date.now(),
        ...form
      };
      setRecords([newRecord, ...records]);
      toast.success('Follow-up record added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editRecord = (record: BankIssueFollowUpType) => {
    setForm({ ...record });
    setEditingId(record.id);
    setIsDialogOpen(true);
  };

  const deleteRecord = (id: number) => {
    setRecords(records.filter(r => r.id !== id));
    toast.success('Follow-up record deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Bank Name', 'Account Holder', 'Account Number', 'Device', 'Operator', 'Transfer Out Balance', 'Attachment'];
    const csvData = [
      headers.join(','),
      ...records.map(r => 
        [r.date, r.time, r.bankName, r.bankAccountHolderName, r.bankAccountNumber, r.device, r.operator || 'N/A', r.transferOutBalance, r.attachment || 'N/A'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-issue-follow-up-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bank Account Issue Follow Up</h1>
          <p className="text-muted-foreground mt-1">Track and manage issue resolution progress</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Follow Up
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Follow Up' : 'Add New Follow Up'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the follow-up record details.' : 'Add a new follow-up record for bank issue.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
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
              <div className="grid gap-2">
                <Label htmlFor="bankAccountHolderName">Bank Account Holder Name *</Label>
                <Input
                  id="bankAccountHolderName"
                  placeholder="John Doe"
                  value={form.bankAccountHolderName}
                  onChange={(e) => setForm({ ...form, bankAccountHolderName: e.target.value })}
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
                <Label htmlFor="device">Device *</Label>
                <Input
                  id="device"
                  placeholder="iPhone-12"
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator">Operator (Optional)</Label>
                <Select value={form.operator} onValueChange={(value) => setForm({ ...form, operator: value })}>
                  <SelectTrigger id="operator">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERATOR_OPTIONS.map(op => (
                      <SelectItem key={op} value={op}>{op}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="transferOutBalance">Transfer Out Balance *</Label>
                <Input
                  id="transferOutBalance"
                  placeholder="$1,000"
                  value={form.transferOutBalance}
                  onChange={(e) => setForm({ ...form, transferOutBalance: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attachment">Attachment (JPG/PNG)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="attachment"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                  {form.attachment && (
                    <Badge variant="secondary" className="shrink-0">
                      {form.attachment}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addRecord}>
                {editingId ? 'Update' : 'Add'} Follow Up
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Operator KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>DANIAL - Performance</span>
              <Badge variant="default" className="text-lg px-3 py-1">
                {operatorKPI.DANIAL.count} Cases
              </Badge>
            </CardTitle>
            <CardDescription>Total transfer out balance handled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${operatorKPI.DANIAL.total.toLocaleString()}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Average: ${operatorKPI.DANIAL.count > 0 ? (operatorKPI.DANIAL.total / operatorKPI.DANIAL.count).toFixed(2) : '0'} per case
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>YULITA - Performance</span>
              <Badge variant="default" className="text-lg px-3 py-1">
                {operatorKPI.YULITA.count} Cases
              </Badge>
            </CardTitle>
            <CardDescription>Total transfer out balance handled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              ${operatorKPI.YULITA.total.toLocaleString()}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Average: ${operatorKPI.YULITA.count > 0 ? (operatorKPI.YULITA.total / operatorKPI.YULITA.count).toFixed(2) : '0'} per case
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Follow Up Records</CardTitle>
              <CardDescription>View and manage all issue follow-up activities</CardDescription>
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
              { key: 'date', label: 'Date' },
              { key: 'time', label: 'Time' },
              { key: 'bankName', label: 'Bank Name' },
              { key: 'bankAccountHolderName', label: 'Account Holder' },
              { key: 'bankAccountNumber', label: 'Account Number' },
              { key: 'device', label: 'Device' },
              { 
                key: 'operator', 
                label: 'Operator',
                render: (value) => value ? (
                  <Badge variant={value === 'DANIAL' ? 'default' : 'secondary'}>
                    {value}
                  </Badge>
                ) : '-'
              },
              { key: 'transferOutBalance', label: 'Transfer Out' },
              { 
                key: 'attachment', 
                label: 'Attachment',
                render: (value, row) => value ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewAttachment(row)}
                    className="gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    View
                  </Button>
                ) : '-'
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
            searchKeys={['bankName', 'bankAccountHolderName', 'bankAccountNumber', 'operator']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}