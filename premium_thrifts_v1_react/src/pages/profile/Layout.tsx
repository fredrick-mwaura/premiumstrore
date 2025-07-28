import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Mail, Star, Ticket, Heart, Store, Clock, Settings, LogOut } from 'lucide-react';

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  active?: boolean;
}

const ProfileSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems: SidebarItem[] = [
    { 
      title: 'My Account', 
      path: '/profile', 
      icon: <User className="w-5 h-5" />,
      active: currentPath === '/profile'
    },
    { 
      title: 'Orders', 
      path: '/orders', 
      icon: <ShoppingBag className="w-5 h-5" />,
      active: currentPath === '/orders'
    },
    { 
      title: 'Inbox', 
      path: '/profile/inbox', 
      icon: <Mail className="w-5 h-5" />,
      active: currentPath === '/profile/inbox'
    },
    { 
      title: 'Vouchers', 
      path: '/profile/vouchers', 
      icon: <Ticket className="w-5 h-5" />,
      active: currentPath === '/profile/vouchers'
    },
    { 
      title: 'Wishlist', 
      path: '/profile/wishlist', 
      icon: <Heart className="w-5 h-5" />,
      active: currentPath === '/profile/wishlist'
    },
    { 
      title: 'Followed Sellers', 
      path: '/profile/sellers', 
      icon: <Store className="w-5 h-5" />,
      active: currentPath === '/profile/sellers'
    },
    { 
      title: 'Recently Viewed', 
      path: '/prod', 
      icon: <Clock className="w-5 h-5" />,
      active: currentPath === '/prod'
    },
  ];

  const accountSettings: SidebarItem[] = [
    { 
      title: 'Account Management', 
      path: '/profile/account-management', 
      icon: <Settings className="w-5 h-5" />,
      active: currentPath === '/profile/account-management'
    },
    { 
      title: 'Payment Settings', 
      path: '/profile/payment-settings', 
      icon: <Settings className="w-5 h-5" />,
      active: currentPath === '/profile/payment-settings'
    },
    { 
      title: 'Address Book', 
      path: '/profile/address-book', 
      icon: <Settings className="w-5 h-5" />,
      active: currentPath === '/profile/address-book'
    },
    { 
      title: 'Newsletter Preferences', 
      path: '/profile/newsletter-preferences', 
      icon: <Settings className="w-5 h-5" />,
      active: currentPath === '/profile/newsletter-preferences'
    },
  ];

  return (
    <div className="w-60 bg-gray-50 border-r">
      {sidebarItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center px-4 py-3 gap-3 transition-colors ${
            item.active 
            ? 'bg-gray-200 text-gray-900' 
            : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
      
      <div className="border-t border-gray-200 mt-2"></div>
      
      {accountSettings.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center px-4 py-3 gap-3 transition-colors ${
            item.active 
            ? 'bg-gray-200 text-gray-900' 
            : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
      
      <div className="border-t border-gray-200 mt-2"></div>
      
      <Link
        to="/sign-in"
        className="flex items-center px-4 py-3 gap-3 text-purple-500 hover:bg-gray-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </Link>
    </div>
  );
};

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col md:12">
      <main className="flex-grow">
        <div className="flex">
          <section className='hidden md:flex'>            
            <ProfileSidebar />
          </section>
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;