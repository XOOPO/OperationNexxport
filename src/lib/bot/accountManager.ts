import * as OTPAuth from 'otpauth';

export interface AccountAction {
  type: 'password_reset' | 'edit_profile' | 'verify_2fa' | null;
  requiresQR?: boolean;
  qrUri?: string;
  qrSecret?: string;
  message?: string;
  nextStep?: string;
}

export function detectAccountAction(message: string): AccountAction {
  const msg = message.toLowerCase();
  
  // Detect password reset request
  if (
    msg.includes('forgot password') || 
    msg.includes('reset password') || 
    msg.includes('change my password') ||
    msg.includes('lost password') ||
    msg.includes('cannot login') ||
    msg.includes('can\'t login')
  ) {
    return {
      type: 'password_reset',
      message: '🔐 **Password Reset Initiated**\n\nI can help you reset your password! For security, I need to verify your identity.\n\n**Please provide your email address.**',
      nextStep: 'awaiting_email'
    };
  }
  
  // Detect profile edit request
  if (
    msg.includes('change my name') || 
    msg.includes('update my name') || 
    msg.includes('edit my name') ||
    msg.includes('change my display name') ||
    msg.includes('update my profile')
  ) {
    return {
      type: 'edit_profile',
      message: '✏️ **Profile Update**\n\nI can help you update your profile! What would you like to change?\n\n• Username\n• Display Name\n\nPlease tell me what you\'d like your new name to be.',
      nextStep: 'awaiting_name'
    };
  }
  
  return { type: null };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function extractEmailFromMessage(message: string): string | null {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const match = message.match(emailRegex);
  return match ? match[0] : null;
}

export function generate2FAForPasswordReset(email: string): { uri: string; secret: string } {
  const totp = new OTPAuth.TOTP({
    issuer: 'NEXXPORT Password Reset',
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30
  });
  
  return {
    uri: totp.toString(),
    secret: totp.secret.base32
  };
}

export function verify2FACode(secret: string, code: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: 'NEXXPORT',
      label: 'Verification',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: secret
    });

    const delta = totp.validate({ token: code, window: 1 });
    return delta !== null;
  } catch (error) {
    console.error('2FA verification error:', error);
    return false;
  }
}

export function generateRandomPassword(): string {
  const length = 12;
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function extractNameFromMessage(message: string): { username?: string; displayName?: string } | null {
  const msg = message.toLowerCase();
  
  // Pattern: "change my name to [name]"
  let match = message.match(/(?:change|update|set)\s+(?:my\s+)?(?:user)?name\s+to\s+(.+)/i);
  if (match) {
    const name = match[1].trim();
    return { username: name, displayName: name };
  }
  
  // Pattern: "change display name to [name]"
  match = message.match(/(?:change|update|set)\s+(?:my\s+)?display\s*name\s+to\s+(.+)/i);
  if (match) {
    const name = match[1].trim();
    return { displayName: name };
  }
  
  // Pattern: "change username to [name]"
  match = message.match(/(?:change|update|set)\s+(?:my\s+)?username\s+to\s+(.+)/i);
  if (match) {
    const name = match[1].trim();
    return { username: name };
  }
  
  // If message looks like just a name (no other words), treat it as the new name
  if (message.trim().split(/\s+/).length <= 3 && !msg.includes('please') && !msg.includes('can you')) {
    const name = message.trim();
    return { username: name, displayName: name };
  }
  
  return null;
}

export function extract2FACode(message: string): string | null {
  // Look for 6-digit code
  const match = message.match(/\b(\d{6})\b/);
  return match ? match[1] : null;
}