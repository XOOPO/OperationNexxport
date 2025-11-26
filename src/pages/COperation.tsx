import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sampleCOperations, COperation as COperationType } from '@/lib/sampleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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

const AGENT_OPTIONS = ['M24SG', 'WBSG', 'OK188SG', 'OXSG', 'ABSG', 'FWSG'];
const TYPE_BANK_OPTIONS = ['Morning', 'Night', 'Atm', 'Back Up', 'Store Bank'];
const STATUS_OPTIONS = ['ACTIVE', 'Cooling Period', 'ISSUE'];

export function COperation() {
  const [operations, setOperations] = useState<COperationType[]>(sampleCOperations);
  const [form, setForm] = useState({
    bank: '',
    device: '',
    typeBank: 'Morning',
    agent: 'M24SG',
    status: 'ACTIVE'
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const stats = useMemo(() => {
    return {
      total: operations.length,
      active: operations.filter(o => o.status === 'ACTIVE').length,
      coolingPeriod: operations.filter(o => o.status === 'Cooling Period').length,
      issue: operations.filter(o => o.status === 'ISSUE').length,
    };
  }, [operations]);

  // Group operations by agent
  const operationsByAgent = useMemo(() => {
    const grouped: Record<string, COperationType[]> = {};
    AGENT_OPTIONS.forEach(agent => {
      grouped[agent] = operations.filter(op => op.agent === agent);
    });
    return grouped;
  }, [operations]);

  const resetForm = () => {
    setForm({
      bank: '',
      device: '',
      typeBank: 'Morning',
      agent: 'M24SG',
      status: 'ACTIVE'
    });
    setEditingId(null);
  };

  const addOperation = () => {
    if (!form.bank || !form.device) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setOperations(operations.map(o => o.id === editingId ? { ...o, ...form } : o));
      toast.success('Operation updated successfully');
    } else {
      const newOperation: COperationType = {
        id: Date.now(),
        ...form
      };
      setOperations([newOperation, ...operations]);
      toast.success('Operation added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editOperation = (operation: COperationType) => {
    setForm({
      bank: operation.bank,
      device: operation.device,
      typeBank: operation.typeBank,
      agent: operation.agent,
      status: operation.status
    });
    setEditingId(operation.id);
    setIsDialogOpen(true);
  };

  const deleteOperation = (id: number) => {
    setOperations(operations.filter(o => o.id !== id));
    toast.success('Operation deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Bank', 'Agent', 'Type Bank', 'Device', 'Status'];
    const csvData = [
      headers.join(','),
      ...operations.map(o => 
        [o.bank, o.agent, o.typeBank, o.device, o.status].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `c-operation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">C Operation</h1>
          <p className="text-muted-foreground mt-1">Manage bank operations by agent</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Bank
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Bank Operation' : 'Add New Bank'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the bank operation details.' : 'Add a new bank to operations.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bank">Bank *</Label>
                <Input
                  id="bank"
                  placeholder="LIQUIDPAY - 1234567890"
                  value={form.bank}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agent">Agent *</Label>
                <Select value={form.agent} onValueChange={(value) => setForm({ ...form, agent: value })}>
                  <SelectTrigger id="agent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AGENT_OPTIONS.map(agent => (
                      <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="typeBank">Type Bank *</Label>
                <Select value={form.typeBank} onValueChange={(value) => setForm({ ...form, typeBank: value })}>
                  <SelectTrigger id="typeBank">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_BANK_OPTIONS.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addOperation}>
                {editingId ? 'Update' : 'Add'} Bank
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Operations</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Cooling Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.coolingPeriod}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.issue}</div>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Operations by Agent */}
      <div className="space-y-6">
        {AGENT_OPTIONS.map(agent => {
          const agentOps = operationsByAgent[agent];
          if (agentOps.length === 0) return null;

          return (
            <Card key={agent}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{agent}</CardTitle>
                    <CardDescription>
                      {agentOps.length} bank{agentOps.length !== 1 ? 's' : ''} assigned
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-lg px-4 py-1">
                    {agentOps.filter(op => op.status === 'ACTIVE').length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agentOps.map((operation) => (
                    <div 
                      key={operation.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-lg">
                          {operation.bank} - {operation.agent} - {operation.typeBank} - {operation.device}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge 
                            variant={
                              operation.status === 'ACTIVE' ? 'default' : 
                              operation.status === 'ISSUE' ? 'destructive' : 
                              'secondary'
                            }
                          >
                            {operation.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Type: {operation.typeBank}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Device: {operation.device}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editOperation(operation)}
                          className="gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteOperation(operation.id)}
                          className="gap-1 text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}