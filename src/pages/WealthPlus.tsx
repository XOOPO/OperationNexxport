import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EnhancedDataTable } from '@/components/EnhancedDataTable';
import { sampleWealthListings, WealthListing } from '@/lib/sampleData';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ACCOUNT_STATUS_OPTIONS = ['ACTIVE', 'ISSUING', 'SUSPENDED', 'ENDED'];

export function WealthPlus() {
  const [listings, setListings] = useState<WealthListing[]>(sampleWealthListings);
  const [form, setForm] = useState({
    ownerCode: '',
    bankName: '',
    accountHolderName: '',
    ownerContact: '',
    agentContact: '',
    rentAmount: 0,
    commission: 0,
    salesCommission: 0,
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    client: '',
    sellingPrice: 0,
    contractStart: new Date().toISOString().split('T')[0],
    contractEnd: new Date().toISOString().split('T')[0],
    contractMonth: 0,
    accountStatus: 'ACTIVE'
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inlineEditId, setInlineEditId] = useState<number | null>(null);
  const [inlineEditForm, setInlineEditForm] = useState<WealthListing | null>(null);

  const resetForm = () => {
    setForm({
      ownerCode: '',
      bankName: '',
      accountHolderName: '',
      ownerContact: '',
      agentContact: '',
      rentAmount: 0,
      commission: 0,
      salesCommission: 0,
      paymentMethod: '',
      paymentDate: new Date().toISOString().split('T')[0],
      client: '',
      sellingPrice: 0,
      contractStart: new Date().toISOString().split('T')[0],
      contractEnd: new Date().toISOString().split('T')[0],
      contractMonth: 0,
      accountStatus: 'ACTIVE'
    });
    setEditingId(null);
  };

  const addListing = () => {
    if (!form.ownerCode || !form.bankName || !form.accountHolderName) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingId) {
      setListings(listings.map(l => l.id === editingId ? { ...l, ...form } : l));
      toast.success('Listing updated successfully');
    } else {
      const newListing: WealthListing = {
        id: Date.now(),
        ...form
      };
      setListings([newListing, ...listings]);
      toast.success('Listing added successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const startInlineEdit = (listing: WealthListing) => {
    setInlineEditId(listing.id);
    setInlineEditForm({ ...listing });
  };

  const saveInlineEdit = () => {
    if (inlineEditForm && inlineEditId) {
      setListings(listings.map(l => l.id === inlineEditId ? inlineEditForm : l));
      setInlineEditId(null);
      setInlineEditForm(null);
      toast.success('Listing updated successfully');
    }
  };

  const cancelInlineEdit = () => {
    setInlineEditId(null);
    setInlineEditForm(null);
  };

  const deleteListing = (id: number) => {
    setListings(listings.filter(l => l.id !== id));
    toast.success('Listing deleted successfully');
  };

  const exportToCSV = () => {
    const headers = ['Owner Code', 'Bank Name', 'Account Holder', 'Rent Amount', 'Commission', 'Sales Commission', 'Client', 'Selling Price', 'Contract Month', 'Status'];
    const csvData = [
      headers.join(','),
      ...listings.map(l => 
        [l.ownerCode, l.bankName, l.accountHolderName, l.rentAmount, l.commission, l.salesCommission, l.client, l.sellingPrice, l.contractMonth, l.accountStatus].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wealth-plus-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wealth+</h1>
          <p className="text-muted-foreground mt-1">Manage wealth account listings</p>
        </div>
      </div>

      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="add">Add New Listing</TabsTrigger>
          <TabsTrigger value="listings">Result Listing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Listing</CardTitle>
              <CardDescription>Create a new wealth account listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ownerCode">Owner Code *</Label>
                    <Input
                      id="ownerCode"
                      placeholder="OWN001"
                      value={form.ownerCode}
                      onChange={(e) => setForm({ ...form, ownerCode: e.target.value })}
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
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="John Doe"
                    value={form.accountHolderName}
                    onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ownerContact">Owner Contact</Label>
                    <Input
                      id="ownerContact"
                      placeholder="+65 9111 1111"
                      value={form.ownerContact}
                      onChange={(e) => setForm({ ...form, ownerContact: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="agentContact">Agent Contact</Label>
                    <Input
                      id="agentContact"
                      placeholder="+65 9222 2222"
                      value={form.agentContact}
                      onChange={(e) => setForm({ ...form, agentContact: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="rentAmount">Rent Amount</Label>
                    <Input
                      id="rentAmount"
                      type="number"
                      value={form.rentAmount}
                      onChange={(e) => setForm({ ...form, rentAmount: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="commission">Commission</Label>
                    <Input
                      id="commission"
                      type="number"
                      value={form.commission}
                      onChange={(e) => setForm({ ...form, commission: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="salesCommission">Sales Commission</Label>
                    <Input
                      id="salesCommission"
                      type="number"
                      value={form.salesCommission}
                      onChange={(e) => setForm({ ...form, salesCommission: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Input
                      id="paymentMethod"
                      placeholder="Bank Transfer"
                      value={form.paymentMethod}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="paymentDate">Payment Date</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      value={form.paymentDate}
                      onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      placeholder="ABC Corp"
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sellingPrice">Selling Price</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      value={form.sellingPrice}
                      onChange={(e) => setForm({ ...form, sellingPrice: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contractStart">Contract Start</Label>
                    <Input
                      id="contractStart"
                      type="date"
                      value={form.contractStart}
                      onChange={(e) => setForm({ ...form, contractStart: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contractEnd">Contract End</Label>
                    <Input
                      id="contractEnd"
                      type="date"
                      value={form.contractEnd}
                      onChange={(e) => setForm({ ...form, contractEnd: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contractMonth">Contract Month</Label>
                    <Input
                      id="contractMonth"
                      type="number"
                      value={form.contractMonth}
                      onChange={(e) => setForm({ ...form, contractMonth: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountStatus">Account Status</Label>
                  <Select value={form.accountStatus} onValueChange={(value) => setForm({ ...form, accountStatus: value })}>
                    <SelectTrigger id="accountStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOUNT_STATUS_OPTIONS.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={addListing} size="lg" className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Wealth Listings</CardTitle>
                  <CardDescription>View and edit all wealth account listings</CardDescription>
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
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Owner Code</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Bank</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Account Holder</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Rent</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Commission</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Client</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Price</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {listings.map((listing) => {
                        const isEditing = inlineEditId === listing.id;
                        const editData = isEditing ? inlineEditForm! : listing;

                        return (
                          <tr key={listing.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  value={editData.ownerCode}
                                  onChange={(e) => setInlineEditForm({ ...editData, ownerCode: e.target.value })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                listing.ownerCode
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  value={editData.bankName}
                                  onChange={(e) => setInlineEditForm({ ...editData, bankName: e.target.value })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                listing.bankName
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  value={editData.accountHolderName}
                                  onChange={(e) => setInlineEditForm({ ...editData, accountHolderName: e.target.value })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                listing.accountHolderName
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editData.rentAmount}
                                  onChange={(e) => setInlineEditForm({ ...editData, rentAmount: parseInt(e.target.value) || 0 })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                `$${listing.rentAmount}`
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editData.commission}
                                  onChange={(e) => setInlineEditForm({ ...editData, commission: parseInt(e.target.value) || 0 })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                `$${listing.commission}`
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  value={editData.client}
                                  onChange={(e) => setInlineEditForm({ ...editData, client: e.target.value })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                listing.client
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editData.sellingPrice}
                                  onChange={(e) => setInlineEditForm({ ...editData, sellingPrice: parseInt(e.target.value) || 0 })}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                `$${listing.sellingPrice}`
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <Select
                                  value={editData.accountStatus}
                                  onValueChange={(value) => setInlineEditForm({ ...editData, accountStatus: value })}
                                >
                                  <SelectTrigger className="h-8 text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ACCOUNT_STATUS_OPTIONS.map(status => (
                                      <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                listing.accountStatus
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {isEditing ? (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={saveInlineEdit}
                                    className="gap-1 text-green-600 h-8 px-2"
                                  >
                                    <Check className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={cancelInlineEdit}
                                    className="gap-1 h-8 px-2"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startInlineEdit(listing)}
                                    className="gap-1 h-8 px-2"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteListing(listing.id)}
                                    className="gap-1 text-destructive h-8 px-2"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}