import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Key, Eye, EyeOff, User, Shield, UserPlus, Trash2, ShieldAlert, UserCircle, Lock, Copy, Check, Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRCodeSVG } from 'qrcode.react';

export function Settings() {
  const { user, users, updateUserPassword, updateUserInfo, addUser, deleteUser, isAdmin, toggleTwoFactor } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserDisplayName, setNewUserDisplayName] = useState('');
  const [newUserIsAdmin, setNewUserIsAdmin] = useState(false);

  const [show2FADialog, setShow2FADialog] = useState(false);
  const [qrSecret, setQrSecret] = useState('');
  const [qrUri, setQrUri] = useState('');
  const [copied, setCopied] = useState(false);

  const [isEditInfoDialogOpen, setIsEditInfoDialogOpen] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editDisplayName, setEditDisplayName] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not found');
      return;
    }

    if (currentPassword !== user.password) {
      toast.error('Current password is incorrect');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    updateUserPassword(user.email, newPassword);
    toast.success('Password updated successfully');
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEditInfo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('User not found');
      return;
    }

    if (!editUsername.trim() || !editDisplayName.trim()) {
      toast.error('Username and display name are required');
      return;
    }

    const success = updateUserInfo(user.email, editUsername, editDisplayName);
    if (success) {
      toast.success('Profile updated successfully');
      setIsEditInfoDialogOpen(false);
    } else {
      toast.error('Failed to update profile');
    }
  };

  const handleOpenEditDialog = () => {
    if (user) {
      setEditUsername(user.username);
      setEditDisplayName(user.displayName);
      setIsEditInfoDialogOpen(true);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUserPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    const success = addUser({
      username: newUserUsername,
      email: newUserEmail,
      password: newUserPassword,
      displayName: newUserDisplayName,
      isAdmin: newUserIsAdmin
    });

    if (success) {
      const message = newUserIsAdmin ? 'User added successfully with admin privileges' : 'User added successfully';
      toast.success(message);
      setNewUserUsername('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserDisplayName('');
      setNewUserIsAdmin(false);
      setIsAddUserDialogOpen(false);
    } else {
      toast.error('Failed to add user. User may already exist.');
    }
  };

  const handleDeleteUser = (email: string) => {
    const success = deleteUser(email);
    if (success) {
      toast.success('User deleted successfully');
    } else {
      toast.error('Failed to delete user');
    }
  };

  const handleToggle2FA = () => {
    if (!user) return;
    
    const result = toggleTwoFactor(user.email);
    if (result.enabled) {
      setQrSecret(result.secret || '');
      setQrUri(result.uri || '');
      setShow2FADialog(true);
      toast.success('Two-Factor Authentication enabled');
    } else {
      toast.success('Two-Factor Authentication disabled');
    }
  };

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(qrSecret);
      setCopied(true);
      toast.success('Secret copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy secret');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operational Management</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            Profile Setting
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Password and Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleOpenEditDialog}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Username</Label>
                <p className="text-sm font-medium mt-1">{user?.username}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="text-sm font-medium mt-1">{user?.email}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-xs text-muted-foreground">Role</Label>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-medium">Operations Manager</p>
                  {isAdmin && <Badge variant="secondary">Admin</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs text-muted-foreground">Name :</Label>
                  <p className="text-sm mt-1">{user?.displayName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Last Login IP :</Label>
                  <p className="text-sm mt-1">{user?.lastLoginIP || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email :</Label>
                  <p className="text-sm mt-1">{user?.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Created Date :</Label>
                  <p className="text-sm mt-1">{formatDate(user?.createdDate)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Last Login At :</Label>
                  <p className="text-sm mt-1">{formatDate(user?.lastLoginAt)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Updated Date :</Label>
                  <p className="text-sm mt-1">{formatDate(user?.updatedDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      User Management
                    </CardTitle>
                    <CardDescription>Manage system users and their access</CardDescription>
                  </div>
                  <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account with access to the system</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-username">Username *</Label>
                          <Input
                            id="new-username"
                            placeholder="Enter username"
                            value={newUserUsername}
                            onChange={(e) => setNewUserUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-display-name">Display Name *</Label>
                          <Input
                            id="new-display-name"
                            placeholder="Enter display name"
                            value={newUserDisplayName}
                            onChange={(e) => setNewUserDisplayName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-email">Email *</Label>
                          <Input
                            id="new-email"
                            type="email"
                            placeholder="Enter email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-user-password">Password *</Label>
                          <Input
                            id="new-user-password"
                            type="password"
                            placeholder="Enter password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border bg-muted/30">
                          <Checkbox
                            id="admin-privileges"
                            checked={newUserIsAdmin}
                            onCheckedChange={(checked) => setNewUserIsAdmin(checked as boolean)}
                          />
                          <div className="flex flex-col">
                            <Label htmlFor="admin-privileges" className="cursor-pointer font-medium">
                              Grant Admin Privileges
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Admin users can manage other users and have full system access
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">Add User</Button>
                          <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.email}>
                        <TableCell className="font-medium">{u.displayName}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.username}</TableCell>
                        <TableCell>
                          {u.isAdmin ? (
                            <Badge variant="default">Admin</Badge>
                          ) : (
                            <Badge variant="secondary">Staff</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {u.email !== 'Claudionicholas12@gmail.com' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {u.displayName}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteUser(u.email)} className="bg-destructive hover:bg-destructive/90">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5" />
                    <h3 className="font-semibold">Password</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Update your account password to keep your account secure. Make sure your new password is strong and unique.
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="ml-4 shrink-0">
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>Update your password to keep your account secure</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password *</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password *</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password *</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Update Password
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-5 h-5" />
                    <h3 className="font-semibold">Two-Factor Authentication</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use an Authenticator App as your two-factor authentication. You'll be asked to enter the security code provided by your Authenticator App.
                  </p>
                </div>
                <Button 
                  variant={user?.twoFactorEnabled ? "destructive" : "outline"}
                  className="ml-4 shrink-0"
                  onClick={handleToggle2FA}
                >
                  {user?.twoFactorEnabled ? (
                    <>
                      <ShieldAlert className="w-4 h-4 mr-2" />
                      Disable Two-Factor Authentication
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Enable Two-Factor Authentication
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditInfoDialogOpen} onOpenChange={setIsEditInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account Information</DialogTitle>
            <DialogDescription>Update your username and display name</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditInfo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username *</Label>
              <Input
                id="edit-username"
                placeholder="Enter username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-display-name">Display Name *</Label>
              <Input
                id="edit-display-name"
                placeholder="Enter display name"
                value={editDisplayName}
                onChange={(e) => setEditDisplayName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditInfoDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Two-Factor Authentication Setup</DialogTitle>
            <DialogDescription>
              Scan this QR code with Google Authenticator or any TOTP app
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border">
              {qrUri && (
                <QRCodeSVG 
                  value={qrUri} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              )}
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <Label className="text-xs text-muted-foreground">Secret Key</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopySecret}
                  className="h-6"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="font-mono text-sm mt-1 break-all">{qrSecret}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Download Google Authenticator or any TOTP app</li>
                <li>Scan the QR code or enter the secret key manually</li>
                <li>Enter the 6-digit code when logging in</li>
              </ol>
            </div>
            <Button onClick={() => setShow2FADialog(false)} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}