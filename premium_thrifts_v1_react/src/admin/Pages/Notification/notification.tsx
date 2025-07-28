import * as React from "react";
import { Bell, Package, ShieldAlert, Users, Tag, AlertTriangle, Check, Trash2, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type NotificationType = 'order' | 'inventory' | 'system' | 'user' ;

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  priority: 'urgent' | 'warning' | 'info';
  onMarkAsRead: (id: string) => void;
  isLatest?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "inventory",
    title: "Low Stock Alert",
    message: "Product 'shoe' has only 5 units left",
    timestamp: "2024-02-20T10:30:00",
    priority: "urgent",
    isRead: false,
    onMarkAsRead: function (id: string): void {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: "2",
    type: "order",
    title: "New Order Received",
    message: "Order #1234 rejected by John Doe ($. 2,250)",
    timestamp: "2024-02-20T09:45:00",
    priority: "info",
    isRead: false,
    onMarkAsRead: function (id: string): void {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    message: "Payment gateway maintenance scheduled",
    timestamp: "2024-02-20T08:15:00",
    priority: "warning",
    isRead: true,
    onMarkAsRead: function (id: string): void {
      throw new Error("Function not implemented.");
    }
  }
];


const getNotificationIcon = (type: NotificationType) => {
  const iconProps = { className: "h-5 w-5" };
  switch (type) {
    case 'order':
      return <Package {...iconProps} />;
    case 'inventory':
      return <AlertTriangle {...iconProps} />;
      return <Users {...iconProps} />;
    case 'system':
      return <ShieldAlert {...iconProps} />;
    case 'user':
      return <Bell {...iconProps} />;
      return <Tag {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
};

const getPriorityStyles = (priority: Notification['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'info':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  priority: 'urgent' | 'warning' | 'info';
  isRead: boolean;
  isLatest?: boolean;
}
const NotificationItems = ({ 
  notification, 
  onMarkAsRead,
  onDelete, 
  isLatest = false // Fixed: Added default value for isLatest
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  isLatest?: boolean; // Fixed: Added optional parameter
}) => (
  // ... rest of the code
//   notification: Notification;
//   onMarkAsRead: (id: string) => void;
//   onDelete: (id: string) => void;
// }) => (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg transition-colors",
        notification.isRead
          ? "bg-gray-100 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900"
      )}
    >

    <div className={cn(
      "rounded-full p-2",
      getPriorityStyles(notification.priority)
    )}>
      {getNotificationIcon(notification.type)}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">{notification.title}</h4>
        <Badge variant="outline" className={getPriorityStyles(notification.priority)}>
          {notification.priority}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          {new Date(notification.timestamp).toLocaleString()}
        </span>
        <div className="flex gap-2">
          {!notification.isRead && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkAsRead(notification.id)}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark as read
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export const NotificationItem = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const filteredNotifications = React.useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "unread") return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === activeFilter);
  }, [notifications, activeFilter]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <Card className="w-full mx-auto">
      
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="outline" onClick={handleDeleteAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear all
          </Button>
          <Button variant="outline">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value={activeFilter} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationItems
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No notifications found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;