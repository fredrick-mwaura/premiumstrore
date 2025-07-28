export interface Message {
    id: string;
    sender: string;
    preview: string;
    time: string;
    status: 'open' | 'resolved' | 'pending';
    unread: boolean;
    category: 'customer' | 'vendor' | 'internal';
    messages: {
      id: string ;
      content: string;
      sender: string;
      timestamp: string;
      isAdmin: boolean;
    }[];
  }