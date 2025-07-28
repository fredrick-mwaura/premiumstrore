import React, { useState } from 'react';
import { MessagesSquare } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Using the same message type from MessageList
interface Message {
  id: number;
  sender: string;
  preview: string;
  time: string;
  status: 'open' | 'resolved' | 'pending';
  unread: boolean;
  category: 'customer' | 'vendor' | 'internal';
}

// Sample messages - in a real app, this would come from your backend
const recentMessages: Message[] = [
  {
    id: 1,
    sender: "John Smith",
    preview: "I have a question about my recent order #12345",
    time: "10:30 AM",
    status: "open",
    unread: true,
    category: "customer"
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    preview: "Product inventory update needed",
    time: "Yesterday",
    status: "pending",
    unread: false,
    category: "vendor"
  },
  {
    id: 3,
    sender: "Tech Support Team",
    preview: "New feature deployment schedule",
    time: "2 days ago",
    status: "resolved",
    unread: false,
    category: "internal"
  },
];

export const MessageBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const unreadCount = recentMessages.filter(msg => msg.unread).length;

  const handleMessageClick = (messageId: number) => {
    navigate('/admin/messages');
    setIsOpen(false);
  };

  const handleViewAll = () => {
    navigate('/admin/messages');
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-primary/10 cursor-pointer"
        >
          <MessagesSquare className="h-5 w-5 text-primary" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
          
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0">
        <div className="px-4 py-2 border-b">
          <h3 className="font-medium">Recent Messages</h3>
        </div>
        <div className="divide-y">
          {recentMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => handleMessageClick(message.id)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-accent transition-colors",
                message.unread && "bg-primary/5"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {message.preview}
              </p>
            </button>
          ))}
        </div>
        <div className="p-2 border-t">
          <Button
          variant='ghost'
          className="relative hover:bg-primary/10 cursor-pointer w-full text-lg text-blue-600"
          onClick={handleViewAll}
          >
            View all messages
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};