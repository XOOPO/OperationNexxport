import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePicture() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    localStorage.getItem('profilePicture')
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewImage) {
      localStorage.setItem('profilePicture', previewImage);
      setProfilePicture(previewImage);
      toast.success('Profile picture updated successfully');
      setIsOpen(false);
      setPreviewImage(null);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('profilePicture');
    setProfilePicture(null);
    setPreviewImage(null);
    toast.success('Profile picture removed');
    setIsOpen(false);
  };

  const getInitials = () => {
    const name = user?.displayName || user?.username || 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer"
      >
        <Avatar className="h-9 w-9 border-2 border-border hover:border-primary transition-colors">
          <AvatarImage src={profilePicture || undefined} alt="Profile" />
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Picture</DialogTitle>
            <DialogDescription>
              Upload a profile picture or remove the current one.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-4">
            <Avatar className="h-32 w-32 border-4 border-border">
              <AvatarImage
                src={previewImage || profilePicture || undefined}
                alt="Profile preview"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex gap-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>

              {(profilePicture || previewImage) && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemove}
                  size="icon"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Recommended: Square image, at least 200x200px. Max size: 5MB
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setPreviewImage(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!previewImage}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}