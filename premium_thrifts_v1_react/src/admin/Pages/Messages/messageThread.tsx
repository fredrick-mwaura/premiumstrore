import React, { useEffect, useState } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Message } from './types.ts';

interface MessageThreadProps {
  thread: Message;
  onClose: () => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({ thread, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(thread.messages); 

  useEffect(() =>{
    setMessages(thread.messages || []);
  }, [thread]);

  const handleSend = (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendNewMessage();
    }
  };

  const sendNewMessage = () => {
    if (!newMessage.trim()) return; 

    const newMessageObj = {
      id: crypto.randomUUID(),
      content: newMessage.trim(),
      sender: 'Admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAdmin: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]); 
    setNewMessage(''); 
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold">{thread.sender}</h2>
            <Badge>{thread.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Order #12345</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col max-w-[80%] space-y-2",
                message.isAdmin ? "ml-auto items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg p-4",
                  message.isAdmin ? "bg-primary text-primary-foreground" : "bg-accent"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{message.sender}</span>
                <span>•</span>
                <span>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Reply Box */}
      <div className="border-t p-4 space-y-4">
        <Textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSend} 
          className="min-h-[100px]"
        />
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button onClick={sendNewMessage}>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;