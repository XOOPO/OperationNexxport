import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { enhancedBotDispatcher } from '@/lib/bot/enhancedBotDispatcher';
import { useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { extractFirstName } from '@/lib/bot/botUtils';
import botProfile from '@/assets/images/bot-profile.png';
import { QRCodeSVG } from 'qrcode.react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  qrCode?: string;
}

export function BotAssistant() {
  const { user, users, updateUserPassword, updateUserInfo } = useAuth();
  const userName = user ? extractFirstName(user.displayName) : 'there';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi ${userName}! 👋 Can I help you today? 😊`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [, navigate] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const data = useData();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const addMessage = (type: 'user' | 'bot', content: string, qrCode?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      qrCode
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsProcessing(true);

    try {
      // Create account management callbacks
      const accountCallbacks = {
        verifyUserEmail: (email: string): boolean => {
          return users.some(u => u.email.toLowerCase() === email.toLowerCase());
        },
        updateUserPassword: (email: string, newPassword: string): boolean => {
          try {
            updateUserPassword(email, newPassword);
            return true;
          } catch {
            return false;
          }
        },
        updateUserProfile: (email: string, username: string, displayName: string): boolean => {
          try {
            return updateUserInfo(email, username, displayName);
          } catch {
            return false;
          }
        }
      };

      const response = await enhancedBotDispatcher(
        userMessage, 
        {
          bankIssues: data.bankIssues,
          bankIssueFollowUps: data.bankIssueFollowUps,
          lastInOuts: data.lastInOuts,
          transactions: data.transactions,
          cOperations: data.cOperations,
          agents: data.agents,
          wealthListings: data.wealthListings,
          dailyReports: data.dailyReports,
          bankAccounts: data.bankAccounts,
          stockMails: data.stockMails
        },
        user ? {
          username: user.username,
          displayName: user.displayName,
          email: user.email
        } : undefined,
        accountCallbacks
      );
      
      addMessage('bot', response.message, response.qrCode);
      
      // Handle profile refresh if needed
      if (response.requiresRefresh) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      
      if (response.page && response.hasData) {
        let url = response.page;
        if (response.filter && Object.keys(response.filter).length > 0) {
          const params = new URLSearchParams();
          Object.entries(response.filter).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              params.append(key, value.toString());
            }
          });
          const queryString = params.toString();
          if (queryString) {
            url += `?${queryString}`;
          }
        }
        
        setTimeout(() => {
          navigate(url);
        }, 1500);
      }
    } catch (error) {
      addMessage('bot', '😅 Oops! Something went wrong on my end. Mind trying that again?');
      toast.error('Failed to process request');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[420px] h-[600px] shadow-2xl z-50 flex flex-col font-sans">
          <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
                <AvatarImage src={botProfile} alt="Bot Assistant" />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-base tracking-tight">
                  Lowtyde
                </h3>
                <p className="text-xs opacity-90 font-normal">Nicc Bot Assistant</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarImage src={botProfile} alt="Bot" />
                      <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed whitespace-pre-line font-normal">{message.content}</p>
                    
                    {message.qrCode && (
                      <div className="mt-3 p-3 bg-white rounded-lg flex justify-center">
                        <QRCodeSVG 
                          value={message.qrCode} 
                          size={180}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                    )}
                    
                    <span className="text-[11px] opacity-70 mt-1.5 block font-normal">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-2 justify-start">
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarImage src={botProfile} alt="Bot" />
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isProcessing}
                className="flex-1 text-[15px] font-normal"
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isProcessing}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}