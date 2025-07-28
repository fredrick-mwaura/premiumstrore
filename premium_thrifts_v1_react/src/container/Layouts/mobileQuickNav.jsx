import { useNavigate } from 'react-router-dom';
import { Home, NotebookText, ShoppingCart, Heart, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

const navItems = [
    { icon: Home, path: '/', name: 'Home' },
    { icon: NotebookText, path: '/orders', name: 'NotebookText' },
    { icon: ShoppingCart, path: '/cart', name: 'ShoppingCart' },
    { icon: Heart, path: '/wishlist', name: 'Heart' },
    { icon: User, path: '/profile', name: 'User' },
  ];
  
  const MobileQuickNav = () => {
    const navigate = useNavigate();
  
    return (
      <Card className='flex md:hidden justify-between border-r-0 p-4 fixed bottom-0 w-full'>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Icon
              key={item.name}
              size={24}
              onClick={() => navigate(item.path)}
              className="cursor-pointer hover:text-blue-500"
            />
          );
        })}
      </Card>
    );
  };

export default MobileQuickNav;