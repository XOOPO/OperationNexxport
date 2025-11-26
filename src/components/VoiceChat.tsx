import { useState, useEffect, useRef } from 'react';
import { useVoiceChat } from '@/contexts/VoiceChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mic, MicOff, PhoneOff, Users, X, MessageSquare, Send, Trash2, ArrowLeft, Paperclip, File, Image as ImageIcon, FileArchive, Download } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface FileAttachment {
  name: string;
  type: string;
  url: string;
  size: number;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  file?: FileAttachment;
}

interface TeamMember {
  id: string;
  username: string;
  displayName: string;
  isOnline: boolean;
}

interface PersonalChatData {
  [memberId: string]: ChatMessage[];
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '1', username: 'PE_NICC', displayName: 'Nicc', isOnline: true },
  { id: '2', username: 'BM_YULITA', displayName: 'Yulita', isOnline: true },
  { id: '3', username: 'PE_YOHANA', displayName: 'Yohana', isOnline: false },
  { id: '4', username: 'PE_XANN', displayName: 'Xann', isOnline: true },
  { id: '5', username: 'M1_MATTHEW', displayName: 'Matthew', isOnline: true },
  { id: '6', username: 'WP_REBECCA', displayName: 'Rebecca', isOnline: false },
  { id: '7', username: 'WP_ERIC', displayName: 'Eric', isOnline: true },
  { id: '8', username: 'BM_DANIAL', displayName: 'Danial', isOnline: true },
  { id: '9', username: 'BM_JANET', displayName: 'Janet', isOnline: false },
  { id: '10', username: 'PE_MICHELLE', displayName: 'Michelle', isOnline: true },
];

const ROOM_CHAT_KEY = 'team_room_chat_messages';
const PERSONAL_CHAT_KEY = 'team_personal_chat_messages';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function VoiceChat() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [personalChats, setPersonalChats] = useState<PersonalChatData>({});
  const [newMessage, setNewMessage] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const roomFileInputRef = useRef<HTMLInputElement>(null);
  const personalFileInputRef = useRef<HTMLInputElement>(null);
  const { isConnected, isMuted, users, connect, disconnect, toggleMute } = useVoiceChat();

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedRoomMessages = localStorage.getItem(ROOM_CHAT_KEY);
    const savedPersonalMessages = localStorage.getItem(PERSONAL_CHAT_KEY);
    
    if (savedRoomMessages) {
      try {
        const parsed = JSON.parse(savedRoomMessages);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error('Error loading room chat:', e);
      }
    }
    
    if (savedPersonalMessages) {
      try {
        const parsed = JSON.parse(savedPersonalMessages);
        const restoredChats: PersonalChatData = {};
        Object.keys(parsed).forEach(key => {
          restoredChats[key] = parsed[key].map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
        });
        setPersonalChats(restoredChats);
      } catch (e) {
        console.error('Error loading personal chats:', e);
      }
    }
  }, []);

  // Save room messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(ROOM_CHAT_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Save personal messages to localStorage
  useEffect(() => {
    if (Object.keys(personalChats).length > 0) {
      localStorage.setItem(PERSONAL_CHAT_KEY, JSON.stringify(personalChats));
    }
  }, [personalChats]);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Connected to voice chat');
    } catch (error) {
      toast.error('Failed to access microphone. Please check your permissions.');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Disconnected from voice chat');
  };

  const handleFileUpload = async (file: File, isPersonal: boolean = false) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/zip', 'application/x-zip-compressed'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only PNG, JPG, PDF, and ZIP files are allowed');
      return;
    }

    try {
      // Capture current message text before clearing
      const messageText = newMessage.trim() || `Sent ${file.name}`;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData: FileAttachment = {
          name: file.name,
          type: file.type,
          url: e.target?.result as string,
          size: file.size,
        };

        const message: ChatMessage = {
          id: Date.now().toString(),
          userId: user?.id || '0',
          userName: user?.username || 'Unknown',
          message: messageText,
          timestamp: new Date(),
          file: fileData,
        };

        if (isPersonal && selectedMember) {
          setPersonalChats(prev => ({
            ...prev,
            [selectedMember.id]: [...(prev[selectedMember.id] || []), message]
          }));
          toast.success(`File sent to ${selectedMember.displayName}`);
        } else {
          setMessages(prev => [...prev, message]);
          toast.success('File sent');
        }
        
        // Clear input after file is successfully processed
        setNewMessage('');
      };
      
      reader.onerror = () => {
        toast.error('Failed to read file');
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload file');
    }
  };

  const handleRoomFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, false);
    }
    if (roomFileInputRef.current) {
      roomFileInputRef.current.value = '';
    }
  };

  const handlePersonalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, true);
    }
    if (personalFileInputRef.current) {
      personalFileInputRef.current.value = '';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: user?.id || '0',
        userName: user?.username || 'Unknown',
        message: newMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      toast.success('Message sent');
    }
  };

  const handleSendPersonalMessage = () => {
    if (newMessage.trim() && selectedMember) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: user?.id || '0',
        userName: user?.username || 'Unknown',
        message: newMessage,
        timestamp: new Date(),
      };
      
      setPersonalChats(prev => ({
        ...prev,
        [selectedMember.id]: [...(prev[selectedMember.id] || []), message]
      }));
      setNewMessage('');
      toast.success(`Message sent to ${selectedMember.displayName}`);
    }
  };

  const handleDeleteRoomMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast.success('Message deleted');
  };

  const handleDeletePersonalMessage = (messageId: string) => {
    if (selectedMember) {
      setPersonalChats(prev => ({
        ...prev,
        [selectedMember.id]: (prev[selectedMember.id] || []).filter(m => m.id !== messageId)
      }));
      toast.success('Message deleted');
    }
  };

  const openPersonalChat = (member: TeamMember) => {
    setSelectedMember(member);
    setShowPersonalChat(true);
  };

  const closePersonalChat = () => {
    setShowPersonalChat(false);
    setSelectedMember(null);
    setNewMessage('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type.includes('pdf')) return <File className="w-4 h-4" />;
    if (type.includes('zip')) return <FileArchive className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const renderFileAttachment = (file: FileAttachment) => {
    const isImage = file.type.startsWith('image/');
    
    return (
      <div className="mt-2">
        {isImage ? (
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="block">
            <img 
              src={file.url} 
              alt={file.name}
              className="max-w-full h-auto max-h-64 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
            />
          </a>
        ) : (
          <a
            href={file.url}
            download={file.name}
            className="flex items-center gap-2 p-3 bg-background border rounded-lg hover:bg-accent transition-colors"
          >
            {getFileIcon(file.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Download className="w-4 h-4 text-muted-foreground" />
          </a>
        )}
      </div>
    );
  };

  const onlineCount = TEAM_MEMBERS.filter(m => m.isOnline).length;
  const currentPersonalMessages = selectedMember ? (personalChats[selectedMember.id] || []) : [];

  return (
    <>
      {/* Voice Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl relative"
          variant={isConnected ? 'default' : 'secondary'}
        >
          <Users className="w-6 h-6" />
          {isConnected && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          )}
          <Badge className="absolute -top-2 -left-2 rounded-full px-1.5 py-0 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
            {onlineCount}
          </Badge>
        </Button>
      </motion.div>

      {/* Communication Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-card border-l shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Team Communication</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      {onlineCount} online
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mx-6 mt-4">
                  <TabsTrigger value="voice" className="gap-2">
                    <Mic className="w-4 h-4" />
                    Voice Chat
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Room Chat
                  </TabsTrigger>
                </TabsList>

                {/* Voice Tab */}
                <TabsContent value="voice" className="flex-1 flex flex-col mt-0">
                  <div className="p-6 border-b bg-muted/20">
                    {!isConnected ? (
                      <Button onClick={handleConnect} className="w-full gap-2 h-12 text-base">
                        <Mic className="w-5 h-5" />
                        Join Voice Chat
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        <Button
                          onClick={toggleMute}
                          variant={isMuted ? 'destructive' : 'default'}
                          className="flex-1 gap-2 h-12"
                        >
                          {isMuted ? (
                            <>
                              <MicOff className="w-5 h-5" />
                              Unmute
                            </>
                          ) : (
                            <>
                              <Mic className="w-5 h-5" />
                              Mute
                            </>
                          )}
                        </Button>
                        <Button onClick={handleDisconnect} variant="outline" size="icon" className="h-12 w-12">
                          <PhoneOff className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <ScrollArea className="flex-1 p-6">
                    {users.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          In Voice ({users.length})
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {users.map((voiceUser) => (
                            <motion.div
                              key={voiceUser.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`relative p-4 rounded-xl border-2 transition-all ${
                                voiceUser.isSpeaking
                                  ? 'border-green-500 bg-green-500/5 shadow-lg shadow-green-500/20'
                                  : 'border-border bg-card hover:bg-accent/50'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                  <Avatar className="w-16 h-16 border-2 border-background shadow-lg">
                                    <AvatarFallback className="text-lg font-bold">
                                      {getInitials(voiceUser.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div
                                    className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-background shadow-md ${
                                      voiceUser.isMuted
                                        ? 'bg-destructive'
                                        : voiceUser.isSpeaking
                                        ? 'bg-green-500'
                                        : 'bg-primary'
                                    }`}
                                  >
                                    {voiceUser.isMuted ? (
                                      <MicOff className="w-3.5 h-3.5 text-white" />
                                    ) : (
                                      <Mic className="w-3.5 h-3.5 text-white" />
                                    )}
                                  </div>
                                </div>
                                <div className="text-center w-full">
                                  <p className="font-semibold text-sm truncate">{voiceUser.name}</p>
                                  {voiceUser.isSpeaking && !voiceUser.isMuted && (
                                    <div className="flex justify-center gap-0.5 mt-2">
                                      {[...Array(5)].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          className="w-1 bg-green-500 rounded-full"
                                          animate={{
                                            height: voiceUser.audioLevel > i * 0.2 ? ['6px', '16px', '6px'] : '6px',
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                          }}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                          <Users className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No one in voice yet</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Connect to start talking with your team
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                {/* Chat Tab */}
                <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                  {/* Team Members */}
                  <div className="p-6 border-b bg-muted/20">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Team Members ({TEAM_MEMBERS.length})
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TEAM_MEMBERS.map((member) => (
                        <button
                          key={member.id}
                          onClick={() => openPersonalChat(member)}
                          className="flex items-center gap-2 p-2 rounded-lg bg-card border hover:bg-accent transition-colors"
                        >
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(member.displayName)}
                              </AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                                member.isOnline ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-medium truncate">{member.displayName}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{member.username}</p>
                          </div>
                          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Messages */}
                  <ScrollArea className="flex-1 p-6">
                    {messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div key={msg.id} className="flex gap-3 group">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {getInitials(msg.userName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold">{msg.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="flex-1">
                                  <p className="text-sm bg-muted p-3 rounded-lg">{msg.message}</p>
                                  {msg.file && renderFileAttachment(msg.file)}
                                </div>
                                {msg.userId === user?.id && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                                    onClick={() => handleDeleteRoomMessage(msg.id)}
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <MessageSquare className="w-12 h-12 text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-6 border-t bg-muted/20">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={roomFileInputRef}
                        onChange={handleRoomFileSelect}
                        accept=".png,.jpg,.jpeg,.pdf,.zip"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => roomFileInputRef.current?.click()}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Personal Chat Dialog */}
      <Dialog open={showPersonalChat} onOpenChange={setShowPersonalChat}>
        <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={closePersonalChat}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              {selectedMember && (
                <>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{getInitials(selectedMember.displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-lg">{selectedMember.displayName}</DialogTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedMember.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                      {selectedMember.username}
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            {currentPersonalMessages.length > 0 ? (
              <div className="space-y-4">
                {currentPersonalMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.userId === user?.id ? 'flex-row-reverse' : ''} group`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(msg.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-1 ${msg.userId === user?.id ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-semibold">{msg.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div className={`flex items-start gap-2 ${msg.userId === user?.id ? 'flex-row-reverse' : ''}`}>
                        <div className="flex-1">
                          <p className={`text-sm p-3 rounded-lg ${
                            msg.userId === user?.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            {msg.message}
                          </p>
                          {msg.file && renderFileAttachment(msg.file)}
                        </div>
                        {msg.userId === user?.id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                            onClick={() => handleDeletePersonalMessage(msg.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">
                  Start a conversation with {selectedMember?.displayName}
                </p>
              </div>
            )}
          </ScrollArea>

          <div className="p-6 border-t bg-muted/20">
            <div className="flex gap-2">
              <input
                type="file"
                ref={personalFileInputRef}
                onChange={handlePersonalFileSelect}
                accept=".png,.jpg,.jpeg,.pdf,.zip"
                className="hidden"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => personalFileInputRef.current?.click()}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendPersonalMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendPersonalMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}