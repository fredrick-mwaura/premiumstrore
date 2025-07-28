import React, { useState } from 'react';
import { Search, MessageSquare, Filter, Mail, Menu } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageThread from './messageThread';
import MessageList from './messageList';
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Tooltip from '@mui/material/Tooltip';

const Message = () => {
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectThread = (id: number) => {
    if (selectedThread !== id) {
      setSelectedThread(id);
      setIsSidebarOpen(false);
    }
  };

  return (
    <Card className="flex h-screen max-h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden">
        <Tooltip title="Toggle Sidebar" placement="bottom">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <Sidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSelectThread={handleSelectThread}
                selectedThread={selectedThread}
              />
            </SheetContent>
          </Sheet>
        </Tooltip>
      </div>

      {/* Sidebar (Visible on larger screens) */}
      <div className="hidden md:flex md:w-[30%] border-r flex-col bg-card">
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSelectThread={handleSelectThread}
          selectedThread={selectedThread}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedThread ? (
          <MessageThread thread={selectedThread} onClose={() => setSelectedThread(null)} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-4">
            <MessageSquare className="h-12 w-12 mb-4" />
            <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
            <p className="max-w-sm">
              Choose a message thread from the sidebar to view the conversation.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

const Sidebar = ({ searchQuery, setSearchQuery, handleSelectThread, selectedThread }) => (
  <>
    <div className="p-4 border-b">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5" />
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
    {/* <div className="flex items-center gap-2 p-2 border-b">
      <Button variant="ghost" size="sm" className="text-muted-foreground">
        <Filter className="h-4 w-4 mr-1" />
        Filter
      </Button>
      <Badge variant="secondary">Open</Badge>
      <Badge variant="outline">Resolved</Badge>
    </div> */}
    <ScrollArea className="flex-1 hover:bg-transparent">
      <MessageList onSelectThread={handleSelectThread} selectedThread={selectedThread} />
    </ScrollArea>
  </>
);

export default Message;
