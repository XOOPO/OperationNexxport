import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface VoiceUser {
  id: string;
  name: string;
  isMuted: boolean;
  isSpeaking: boolean;
  audioLevel: number;
}

interface VoiceChatContextType {
  isConnected: boolean;
  isMuted: boolean;
  users: VoiceUser[];
  connect: () => Promise<void>;
  disconnect: () => void;
  toggleMute: () => void;
  audioStream: MediaStream | null;
}

const VoiceChatContext = createContext<VoiceChatContextType | undefined>(undefined);

export function VoiceChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [users, setUsers] = useState<VoiceUser[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  // Simulate other users in the voice chat (in real app, this would come from WebRTC signaling server)
  useEffect(() => {
    if (isConnected && user) {
      // Add current user
      const currentUser: VoiceUser = {
        id: user.id,
        name: user.displayName || user.username,
        isMuted,
        isSpeaking: false,
        audioLevel: 0,
      };

      // Simulate some team members in voice
      const simulatedUsers: VoiceUser[] = [
        currentUser,
        {
          id: 'user-1',
          name: 'PE_NICC',
          isMuted: false,
          isSpeaking: false,
          audioLevel: 0,
        },
        {
          id: 'user-5',
          name: 'M1_MATTHEW',
          isMuted: false,
          isSpeaking: false,
          audioLevel: 0,
        },
        {
          id: 'user-8',
          name: 'BM_DANIAL',
          isMuted: true,
          isSpeaking: false,
          audioLevel: 0,
        },
      ];

      setUsers(simulatedUsers);

      // Simulate random speaking activity for demo users
      const interval = setInterval(() => {
        setUsers((prev) =>
          prev.map((u) => {
            if (u.id === user.id || u.isMuted) return u;
            
            // Randomly make users speak
            const shouldSpeak = Math.random() > 0.7;
            return {
              ...u,
              isSpeaking: shouldSpeak,
              audioLevel: shouldSpeak ? 0.3 + Math.random() * 0.5 : 0,
            };
          })
        );
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setUsers([]);
    }
  }, [isConnected, user, isMuted]);

  // Detect speaking from audio level
  useEffect(() => {
    if (!analyser || !isConnected || isMuted) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationFrame: number;

    const detectSpeaking = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalizedLevel = average / 255;

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user?.id
            ? { ...u, isSpeaking: normalizedLevel > 0.1, audioLevel: normalizedLevel }
            : u
        )
      );

      animationFrame = requestAnimationFrame(detectSpeaking);
    };

    detectSpeaking();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [analyser, isConnected, isMuted, user?.id]);

  const connect = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      // Setup audio analysis
      const ctx = new AudioContext();
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 256;
      
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyserNode);
      
      setAudioContext(ctx);
      setAnalyser(analyserNode);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to access microphone:', error);
      throw error;
    }
  };

  const disconnect = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }
    setAnalyser(null);
    setIsConnected(false);
    setIsMuted(true);
  };

  const toggleMute = () => {
    if (audioStream) {
      audioStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  return (
    <VoiceChatContext.Provider
      value={{
        isConnected,
        isMuted,
        users,
        connect,
        disconnect,
        toggleMute,
        audioStream,
      }}
    >
      {children}
    </VoiceChatContext.Provider>
  );
}

export function useVoiceChat() {
  const context = useContext(VoiceChatContext);
  if (!context) {
    throw new Error('useVoiceChat must be used within VoiceChatProvider');
  }
  return context;
}