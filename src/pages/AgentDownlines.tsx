import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleDownlines, Downline } from '@/lib/sampleData';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, ArrowLeft } from 'lucide-react';
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
import { useLocation } from 'wouter';

export function AgentDownlines() {
  const [, setLocation] = useLocation();
  const [downlines, setDownlines] = useState<Downline[]>(sampleDownlines);
  const [form, setForm] = useState({
    agentId: 1,
    nameDownline: '',
    joinDate: new Date().toISOString().split('T')[0],
    commission: 0,
    bank: '',
    downlineContact: '',
    address: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setForm({
      agentId: 1,
      nameDownline: '',
      joinDate: new Date().toISOString().split('T')[0],
      commission: 0,
      bank: '',
      downlineContact: '',
      address: ''
    });
    setEditingId(null);
  };

  const addDownline = () => {
    if (!form.nameDownline || !form.bank || !form.downlineContact) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setDownlines(downlines.map(d => d.id === editingId ? { ...d, ...form } : d));
      toast.success('Downline updated successfully');
    } else {
      const newDownline: Downline = {
        id: Date.now(),
        ...form
      };
      setDownlines([newDownline, ...downlines]);
      toast.success('Downline added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editDownline = (downline: Downline) => {
    setForm({
      agentId: downline.agentId,
      nameDownline: downline.nameDownline,
      joinDate: downline.joinDate,
      commission: downline.commission,
      bank: downline.bank,
      downlineContact: downline.downlineContact,
      address: downline.address
    });
    setEditingId(downline.id);
    setIsDialogOpen(true);
  };

  const deleteDownline = (id: number) => {
    setDownlines(downlines.filter(d => d.id !== id));
    toast.success('Downline deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Join Date', 'Commission', 'Bank', 'Contact', 'Address'];
    const csvData = [
      headers.join(','),
      ...downlines.map(d => 
        [d.nameDownline, d.joinDate, d.commission, d.bank, d.downlineContact, d.address].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `downlines-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/agent-listing')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Agent Downlines</h1>
            <p className="text-muted-foreground mt-1">Manage downline network</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Downline
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Downline' : 'Add New Downline'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the downline details.' : 'Add a new downline to the network.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="nameDownline">Name Downline *</Label>
                <Input
                  id="nameDownline"
                  placeholder="Alice Wong"
                  value={form.nameDownline}
                  onChange={(e) => setForm({ ...form, nameDownline: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="joinDate">Join Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={form.joinDate}
                  onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="commission">Commission</Label>
                <Input
                  id="commission"
                  type="number"
                  placeholder="3000"
                  value={form.commission}
                  onChange={(e) => setForm({ ...form, commission: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bank">Bank *</Label>
                <Input
                  id="bank"
                  placeholder="LIQUIDPAY"
                  value={form.bank}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="downlineContact">Downline Contact *</Label>
                <Input
                  id="downlineContact"
                  placeholder="+65 9123 4567"
                  value={form.downlineContact}
                  onChange={(e) => setForm({ ...form, downlineContact: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Orchard Road, Singapore"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addDownline}>
                {editingId ? 'Update' : 'Add'} Downline
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Downlines</CardTitle>
              <CardDescription>View and manage all downlines</CardDescription>
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
              { key: 'nameDownline', label: 'Name' },
              { key: 'joinDate', label: 'Join Date' },
              { 
                key: 'commission', 
                label: 'Commission',
                render: (value) => `$${value.toLocaleString()}`
              },
              { key: 'bank', label: 'Bank' },
              { key: 'downlineContact', label: 'Contact' },
              { key: 'address', label: 'Address' },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editDownline(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteDownline(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={downlines}
            searchKeys={['nameDownline', 'bank', 'downlineContact', 'address']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}