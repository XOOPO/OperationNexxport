import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleAgents, Agent, sampleDownlines, Downline } from '@/lib/sampleData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Download, Trash2, Edit, Plus, Users } from 'lucide-react';
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

const CONTACT_OPTIONS = ['Telegram', 'WhatsApp'];

export function AgentListing() {
  const [, setLocation] = useLocation();
  const [agents, setAgents] = useState<Agent[]>(sampleAgents);
  const [form, setForm] = useState({
    agentName: '',
    agentId: '',
    joinDate: new Date().toISOString().split('T')[0],
    totalCommission: 0,
    totalBank: 0,
    totalDownline: 0,
    agentContact: 'Telegram'
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const stats = useMemo(() => {
    return {
      total: agents.length,
      totalCommission: agents.reduce((sum, a) => sum + a.totalCommission, 0),
      totalBanks: agents.reduce((sum, a) => sum + a.totalBank, 0),
      totalDownlines: agents.reduce((sum, a) => sum + a.totalDownline, 0),
    };
  }, [agents]);

  const resetForm = () => {
    setForm({
      agentName: '',
      agentId: '',
      joinDate: new Date().toISOString().split('T')[0],
      totalCommission: 0,
      totalBank: 0,
      totalDownline: 0,
      agentContact: 'Telegram'
    });
    setEditingId(null);
  };

  const addAgent = () => {
    if (!form.agentName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setAgents(agents.map(a => a.id === editingId ? { ...a, ...form } : a));
      toast.success('Agent updated successfully');
    } else {
      const newAgent: Agent = {
        id: Date.now(),
        ...form
      };
      setAgents([newAgent, ...agents]);
      toast.success('Agent added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editAgent = (agent: Agent) => {
    setForm({
      agentName: agent.agentName,
      agentId: agent.agentId || '',
      joinDate: agent.joinDate,
      totalCommission: agent.totalCommission,
      totalBank: agent.totalBank,
      totalDownline: agent.totalDownline,
      agentContact: agent.agentContact || 'Telegram'
    });
    setEditingId(agent.id);
    setIsDialogOpen(true);
  };

  const deleteAgent = (id: number) => {
    setAgents(agents.filter(a => a.id !== id));
    toast.success('Agent deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Agent Name', 'Join Date', 'Total Commission', 'Total Bank', 'Total Downline'];
    const csvData = [
      headers.join(','),
      ...agents.map(a => 
        [a.agentName, a.joinDate, a.totalCommission, a.totalBank, a.totalDownline].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-listing-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Listing</h1>
          <p className="text-muted-foreground mt-1">Manage agents and their performance</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setLocation('/agent-downlines')}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            View Downlines
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Agent' : 'Add New Agent'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update the agent details.' : 'Add a new agent to the system.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="agentName">Agent Name *</Label>
                  <Input
                    id="agentName"
                    placeholder="M24SG"
                    value={form.agentName}
                    onChange={(e) => setForm({ ...form, agentName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agentId">ID / Number (Optional)</Label>
                  <Input
                    id="agentId"
                    placeholder="Enter agent ID or number"
                    value={form.agentId}
                    onChange={(e) => setForm({ ...form, agentId: e.target.value })}
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
                  <Label htmlFor="totalCommission">Total Commission</Label>
                  <Input
                    id="totalCommission"
                    type="number"
                    value={form.totalCommission}
                    onChange={(e) => setForm({ ...form, totalCommission: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="totalBank">Total Bank</Label>
                    <Input
                      id="totalBank"
                      type="number"
                      value={form.totalBank}
                      onChange={(e) => setForm({ ...form, totalBank: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="totalDownline">Total Downline</Label>
                    <Input
                      id="totalDownline"
                      type="number"
                      value={form.totalDownline}
                      onChange={(e) => setForm({ ...form, totalDownline: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agentContact">Agent Contact *</Label>
                  <Select value={form.agentContact} onValueChange={(value) => setForm({ ...form, agentContact: value })}>
                    <SelectTrigger id="agentContact">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_OPTIONS.map(contact => (
                        <SelectItem key={contact} value={contact}>{contact}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addAgent}>
                  {editingId ? 'Update' : 'Add'} Agent
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${stats.totalCommission.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Banks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalBanks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Downlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalDownlines}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agents</CardTitle>
              <CardDescription>View and manage all agents</CardDescription>
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
              { key: 'agentName', label: 'Agent Name' },
              { key: 'joinDate', label: 'Join Date' },
              { 
                key: 'agentContact', 
                label: 'Agent Contact',
                render: (value) => value || 'Telegram'
              },
              { 
                key: 'totalCommission', 
                label: 'Total Commission',
                render: (value) => `$${value.toLocaleString()}`
              },
              { key: 'totalBank', label: 'Total Bank' },
              { key: 'totalDownline', label: 'Total Downline' },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLocation(`/agent-downlines?agent=${row.id}`)}
                      className="gap-1"
                    >
                      <Users className="w-3 h-3" />
                      Downlines
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editAgent(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAgent(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={agents}
            searchKeys={['agentName']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}