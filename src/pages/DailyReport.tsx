import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleDailyReports, DailyReport as DailyReportType } from '@/lib/sampleData';
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
import { Textarea } from "@/components/ui/textarea";

export function DailyReport() {
  const [reports, setReports] = useState<DailyReportType[]>(sampleDailyReports);
  const [form, setForm] = useState({
    staffName: '',
    note: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setForm({
      staffName: '',
      note: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
  };

  const addReport = () => {
    if (!form.staffName || !form.note) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setReports(reports.map(r => r.id === editingId ? { ...r, ...form } : r));
      toast.success('Report updated successfully');
    } else {
      const newReport: DailyReportType = {
        id: Date.now(),
        ...form
      };
      setReports([newReport, ...reports]);
      toast.success('Report added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const editReport = (report: DailyReportType) => {
    setForm({
      staffName: report.staffName,
      note: report.note,
      date: report.date
    });
    setEditingId(report.id);
    setIsDialogOpen(true);
  };

  const deleteReport = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
    toast.success('Report deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Staff Name', 'Note', 'Date'];
    const csvData = [
      headers.join(','),
      ...reports.map(r => 
        [r.staffName, `"${r.note}"`, r.date].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Daily Report</h1>
          <p className="text-muted-foreground mt-1">Track daily activities and notes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Report' : 'Add New Report'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the daily report.' : 'Add a new daily report.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="staffName">Staff Name *</Label>
                <Input
                  id="staffName"
                  placeholder="Nicholas"
                  value={form.staffName}
                  onChange={(e) => setForm({ ...form, staffName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Note *</Label>
                <Textarea
                  id="note"
                  placeholder="Enter daily notes..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addReport}>
                {editingId ? 'Update' : 'Add'} Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Reports</CardTitle>
              <CardDescription>View and manage all daily reports</CardDescription>
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
              { key: 'staffName', label: 'Staff Name' },
              { 
                key: 'note', 
                label: 'Note',
                render: (value) => (
                  <div className="max-w-md truncate" title={value}>
                    {value}
                  </div>
                )
              },
              { key: 'date', label: 'Date' },
              { 
                key: 'id', 
                label: 'Actions',
                render: (_, row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editReport(row)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteReport(row.id)}
                      className="gap-1 text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                )
              }
            ]}
            data={reports}
            searchKeys={['staffName', 'note', 'date']}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}