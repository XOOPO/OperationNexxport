import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sampleTransactions, Transaction } from '@/lib/sampleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, Check, X } from 'lucide-react';
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

const LINE_OPTIONS = ['M24SG', 'ABSG', 'WBSG', 'OXSG', 'FWSG', 'OK188SG'];

export function TransactionSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    bankName: '',
    line: 'M24SG',
    inCount: 0,
    outCount: 0,
    inAmount: 0,
    outAmount: 0
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inlineEditId, setInlineEditId] = useState<number | null>(null);
  const [inlineEditForm, setInlineEditForm] = useState<Transaction | null>(null);

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().split('T')[0],
      bankName: '',
      line: 'M24SG',
      inCount: 0,
      outCount: 0,
      inAmount: 0,
      outAmount: 0
    });
    setEditingId(null);
  };

  const addTransaction = () => {
    if (!form.bankName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? { ...t, ...form } : t));
      toast.success('Transaction updated successfully');
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        ...form
      };
      setTransactions([newTransaction, ...transactions]);
      toast.success('Transaction added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const startInlineEdit = (transaction: Transaction) => {
    setInlineEditId(transaction.id);
    setInlineEditForm({ ...transaction });
  };

  const saveInlineEdit = () => {
    if (inlineEditForm && inlineEditId) {
      setTransactions(transactions.map(t => t.id === inlineEditId ? inlineEditForm : t));
      setInlineEditId(null);
      setInlineEditForm(null);
      toast.success('Transaction updated successfully');
    }
  };

  const cancelInlineEdit = () => {
    setInlineEditId(null);
    setInlineEditForm(null);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.success('Transaction deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Bank Name', 'Line', 'In Count', 'Out Count', 'In Amount', 'Out Amount'];
    const csvData = [
      headers.join(','),
      ...transactions.map(t => 
        [t.date, t.bankName, t.line, t.inCount, t.outCount, t.inAmount, t.outAmount].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaction-summary-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transaction Summary</h1>
          <p className="text-muted-foreground mt-1">Track daily transactions by line</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Add a new transaction summary record.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="LIQUIDPAY"
                  value={form.bankName}
                  onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="line">Line *</Label>
                <Select value={form.line} onValueChange={(value) => setForm({ ...form, line: value })}>
                  <SelectTrigger id="line">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LINE_OPTIONS.map(line => (
                      <SelectItem key={line} value={line}>{line}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="inCount">In Count</Label>
                  <Input
                    id="inCount"
                    type="number"
                    value={form.inCount}
                    onChange={(e) => setForm({ ...form, inCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="outCount">Out Count</Label>
                  <Input
                    id="outCount"
                    type="number"
                    value={form.outCount}
                    onChange={(e) => setForm({ ...form, outCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="inAmount">In Amount</Label>
                  <Input
                    id="inAmount"
                    type="number"
                    value={form.inAmount}
                    onChange={(e) => setForm({ ...form, inAmount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="outAmount">Out Amount</Label>
                  <Input
                    id="outAmount"
                    type="number"
                    value={form.outAmount}
                    onChange={(e) => setForm({ ...form, outAmount: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addTransaction}>
                Add Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction Records</CardTitle>
              <CardDescription>View and edit all transaction summaries</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bank Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Line</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">In Count</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Out Count</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">In Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Out Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => {
                      const isEditing = inlineEditId === transaction.id;
                      const editData = isEditing ? inlineEditForm! : transaction;

                      return (
                        <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                type="date"
                                value={editData.date}
                                onChange={(e) => setInlineEditForm({ ...editData, date: e.target.value })}
                                className="h-8"
                              />
                            ) : (
                              transaction.date
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                value={editData.bankName}
                                onChange={(e) => setInlineEditForm({ ...editData, bankName: e.target.value })}
                                className="h-8"
                              />
                            ) : (
                              transaction.bankName
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Select
                                value={editData.line}
                                onValueChange={(value) => setInlineEditForm({ ...editData, line: value })}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {LINE_OPTIONS.map(line => (
                                    <SelectItem key={line} value={line}>{line}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              transaction.line
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editData.inCount}
                                onChange={(e) => setInlineEditForm({ ...editData, inCount: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            ) : (
                              transaction.inCount
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editData.outCount}
                                onChange={(e) => setInlineEditForm({ ...editData, outCount: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            ) : (
                              transaction.outCount
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editData.inAmount}
                                onChange={(e) => setInlineEditForm({ ...editData, inAmount: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            ) : (
                              `$${transaction.inAmount.toLocaleString()}`
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editData.outAmount}
                                onChange={(e) => setInlineEditForm({ ...editData, outAmount: parseInt(e.target.value) || 0 })}
                                className="h-8"
                              />
                            ) : (
                              `$${transaction.outAmount.toLocaleString()}`
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isEditing ? (
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={saveInlineEdit}
                                  className="gap-1 text-green-600"
                                >
                                  <Check className="w-3 h-3" />
                                  Save
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={cancelInlineEdit}
                                  className="gap-1"
                                >
                                  <X className="w-3 h-3" />
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => startInlineEdit(transaction)}
                                  className="gap-1"
                                >
                                  <Edit className="w-3 h-3" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteTransaction(transaction.id)}
                                  className="gap-1 text-destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}