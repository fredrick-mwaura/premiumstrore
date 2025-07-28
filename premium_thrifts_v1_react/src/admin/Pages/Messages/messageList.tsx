import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Message } from './types';

interface MessageListProps {
  onSelectThread: (thread: Message) => void;
  selectedThread: Message | null;
}

const messages: Message[] = [
  {
    id: "11",
    sender: "John Smith",
    preview: "I have a question about my recent order #12345",
    time: "10:30 AM",
    status: "open",
    unread: true,
    category: "customer",
    messages: [
      {
        id: "101",
        content: "Hello, I need help with my recent order #12345.",
        sender: "John Smith",
        timestamp: "10:30 AM",
        isAdmin: false,
      },
      {
        id: "102",
        content: "Sure, how can I assist you?",
        sender: "Admin",
        timestamp: "10:35 AM",
        isAdmin: true,
      },
    ],
  },
  {
    id: "21",
    sender: "Sarah Johnson",
    preview: "Product inventory update needed",
    time: "Yesterday",
    status: "pending",
    unread: false,
    category: "vendor",
    messages: [
      {
        id: "201",
        content: "Product inventory update needed.",
        sender: "Sarah Johnson",
        timestamp: "Yesterday",
        isAdmin: false,
      },
      {
        id: "202",
        content: "How can I help you?",
        sender: "Admin",
        timestamp: "Yesterday",
        isAdmin: true,
      },
    ],
  },
  {
    id: "41",
    sender: "John Bondman",
    preview: "I have a question about my last order #45",
    time: "10:30 AM",
    status: "open",
    unread: true,
    category: "customer",
    messages: [
      {
        id: "401",
        content: "Hello, I need help on ordering 1200 pairs of sneakers.",
        sender: "John Bondman",
        timestamp: "10:30 AM",
        isAdmin: false,
      },
      {
        id: "402",
        content: "Sure, how can I assist?",
        sender: "Admin",
        timestamp: "10:35 AM",
        isAdmin: true,
      },
    ],
  },
];

const MessageList: React.FC<MessageListProps> = ({ onSelectThread, selectedThread }) => {
  return (
    <div className="flex flex-col">
      {messages.map((thread) => (
        <button
        key={thread.id}
        onClick={() => onSelectThread(thread)}
        className={cn(
          "flex flex-col p-4 border-b text-left transition-colors duration-300",
          "hover:bg-gray-100 dark:hover:bg-gray-700", // Hover effect in both modes
          selectedThread?.id === thread.id
            ? "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
            : "text-gray-900 dark:text-gray-200",
          // thread.unread && "bg-gray-200 dark:bg-gray-800 dark:text-white"
        )}
      >
      
      
          <div className="flex justify-between items-start mb-1">
            <span className={cn("font-medium", thread.unread && "font-semibold")}>
              {thread.sender}
            </span>
            <span className="text-sm text-muted-foreground">{thread.time}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {thread.preview}
          </p>
          <div className="flex gap-2">
            <Badge 
              variant={thread.status === 'open' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {thread.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {thread.category}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MessageList;