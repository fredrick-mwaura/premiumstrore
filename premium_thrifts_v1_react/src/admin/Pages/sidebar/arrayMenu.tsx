import { 
    Home, ShoppingBag, CirclePlus, Package, Tags, Box, 
    Users, UserPlus, UserX, BarChart2, LineChart, DollarSign, 
    PieChart, Activity, CreditCard, MessageSquare, Megaphone, 
    Settings, ShieldCheck, HelpCircle 
  } from "lucide-react";
  import { MenuItem } from "./sidebar";
  
  export const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { 
      id: 'products', 
      label: 'Products', 
      icon: ShoppingBag, 
      subMenus: [
        { id: 'add-product', label: 'Add Products', icon: CirclePlus },
        { id: 'product-list', label: 'All Products', icon: Package },
        { id: 'category', label: 'category', icon: Tags },
        { id: 'inventory', label: 'Inventory', icon: Box }
      ]
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      subMenus: [
        { id: 'add-users', label: 'Add New User', icon: UserPlus },
        { id: 'all-users', label: 'All Users', icon: Users },
        { id: 'admin-list', label: 'Admin Users', icon: UserPlus },
        { id: 'edit-user', label: 'Edit User', icon: Tags },
        { id: 'roles', label: 'Roles & Permissions', icon: Box },
        { id: 'banned-users', label: 'Banned Users', icon: UserX }
      ]
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart2, 
      subMenus: [
        { id: 'sales', label: 'Sales Analytics', icon: LineChart },
        { id: 'revenue', label: 'Revenue', icon: DollarSign },
        { id: 'customer', label: 'Customer Analytics', icon: PieChart },
        { id: 'performance', label: 'Performance', icon: Activity }
      ]
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: CreditCard, 
      subMenus: [
        { id: 'Orders', label: 'Orders', icon: CreditCard },
        { id: 'Order_details', label: 'Order Details', icon: Package }
      ]
    },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '1' }
  ];
  
  export const bottomMenuItems: MenuItem[] = [
    { id: 'announcement', label: "Announcement", icon: Megaphone, href: "/admin/announcement" },
    { id: 'settings', label: "Settings", icon: Settings, href: "/admin/settings" },
    { id: 'privacy-policy', label: "Privacy policy", icon: ShieldCheck, href: "/admin/privacy-policy" },
    { id: 'help', label: "Help Center", icon: HelpCircle, href: "/admin/help" }
  ];