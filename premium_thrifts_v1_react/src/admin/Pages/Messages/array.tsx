interface Message {
  id: number;
  content: string;
  sender: string;
  avatar: string;
  timestamp: string;
  isAdmin: boolean;
}

export const messages: Message[] = [
  {
    id: 1,
    content: "Hello, I have a question about my recent order #12345. The tracking number isn't working.",
    sender: "John Smith",
    avatar: "/profile.png",
    timestamp: "10:30 AM",
    isAdmin: false,
  },
  {
    id: 2,
    content: "Hi John, I'd be happy to help you with that. Could you please provide me with your order confirmation email?",
    sender: "Support Team",
    avatar:"/user-placeholder.png",
    timestamp: "10:35 AM",
    isAdmin: true,
  },
  {
    id: 3,
    content: "Sure, I've attached the confirmation email.",
    sender: "John Smith",
    avatar: "/uaer2.png",
    timestamp: "10:40 AM",
    isAdmin: false,
  },
];