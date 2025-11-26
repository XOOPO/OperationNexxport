import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LogIn, Eye, EyeOff, Shield, QrCode, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { QRCodeSVG } from 'qrcode.react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as OTPAuth from 'otpauth';

export function Login() {
  const { login, users } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'qr'>('password');
  
  // QR Login states
  const [qrLoginUri, setQrLoginUri] = useState('');
  const [qrLoginSecret, setQrLoginSecret] = useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [qrOtpCode, setQrOtpCode] = useState('');

  // Generate QR code for login when switching to QR tab
  useEffect(() => {
    if (loginMethod === 'qr' && !qrLoginUri) {
      generateQRLogin();
    }
  }, [loginMethod]);

  const generateQRLogin = () => {
    // Generate a temporary secret for this login session
    const totp = new OTPAuth.TOTP({
      issuer: 'NEXXPORT',
      label: 'Quick Login',
      algorithm: 'SHA1',
      digits: 6,
      period: 30
    });
    
    const secret = totp.secret.base32;
    const uri = totp.toString();
    
    setQrLoginSecret(secret);
    setQrLoginUri(uri);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requires2FA && totpCode.length !== 6) {
      toast.error('Please enter the 6-digit code from your authenticator app');
      return;
    }

    const result = await login(email, password, requires2FA ? totpCode : undefined);
    
    if (result.success) {
      toast.success('Login successful');
      setLocation('/');
    } else if (result.requires2FA) {
      setRequires2FA(true);
      toast.info('Please enter your 2FA code');
    } else {
      toast.error(requires2FA ? 'Invalid verification code' : 'Invalid email or password');
      if (requires2FA) {
        setTotpCode('');
      }
    }
  };

  const handleQRLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserEmail) {
      toast.error('Please select your account');
      return;
    }

    if (qrOtpCode.length !== 6) {
      toast.error('Please enter the 6-digit code from your authenticator app');
      return;
    }

    // Verify the OTP code matches the generated secret
    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'NEXXPORT',
        label: 'Quick Login',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: qrLoginSecret
      });

      const delta = totp.validate({ token: qrOtpCode, window: 1 });
      
      if (delta === null) {
        toast.error('Invalid verification code');
        setQrOtpCode('');
        return;
      }

      // Find user and login
      const user = users.find(u => u.email === selectedUserEmail);
      if (!user) {
        toast.error('User not found');
        return;
      }

      // Login with user credentials (bypassing password since OTP verified)
      const result = await login(user.email, user.password);
      
      if (result.success) {
        toast.success('Login successful');
        setLocation('/');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('QR Login error:', error);
      toast.error('Login failed');
    }
  };

  const handleBack = () => {
    setRequires2FA(false);
    setTotpCode('');
  };

  const handleRefreshQR = () => {
    generateQRLogin();
    setQrOtpCode('');
    toast.info('QR code refreshed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            {requires2FA ? (
              <Shield className="w-8 h-8 text-primary" />
            ) : loginMethod === 'qr' ? (
              <QrCode className="w-8 h-8 text-primary" />
            ) : (
              <LogIn className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            NEXXPORT
          </CardTitle>
          <CardDescription className="text-base">
            {requires2FA ? 'Two-Factor Authentication' : 'Operations Dashboard Login'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!requires2FA ? (
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'password' | 'qr')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-muted/50 border rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <Smartphone className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">Quick Login with Authenticator</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Scan this QR code with Google Authenticator to get a login code
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border">
                    {qrLoginUri ? (
                      <QRCodeSVG 
                        value={qrLoginUri} 
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    ) : (
                      <div className="w-[200px] h-[200px] flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleRefreshQR}
                  >
                    Refresh QR Code
                  </Button>

                  <form onSubmit={handleQRLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-select">Select Your Account</Label>
                      <select
                        id="user-select"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium tracking-tight ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                        value={selectedUserEmail}
                        onChange={(e) => setSelectedUserEmail(e.target.value)}
                        required
                      >
                        <option value="" className="font-medium">Choose your account...</option>
                        {users.map((u) => (
                          <option key={u.email} value={u.email} className="font-medium py-2">
                            {u.displayName} ({u.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-center block">Enter Code from Authenticator App</Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={qrOtpCode}
                          onChange={(value) => setQrOtpCode(value)}
                        >
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                            <InputOTPSlot index={1} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                            <InputOTPSlot index={2} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                            <InputOTPSlot index={3} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                            <InputOTPSlot index={4} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                            <InputOTPSlot index={5} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Login with QR Code
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handlePasswordLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={totpCode}
                    onChange={(value) => setTotpCode(value)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                      <InputOTPSlot index={1} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                      <InputOTPSlot index={2} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                      <InputOTPSlot index={3} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                      <InputOTPSlot index={4} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                      <InputOTPSlot index={5} className="w-11 h-14 text-xl font-bold border-2 border-primary" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <div className="space-y-2">
                <Button type="submit" className="w-full" size="lg">
                  Verify & Sign In
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Operational Dashboard V.2.0 Lowtyde</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}