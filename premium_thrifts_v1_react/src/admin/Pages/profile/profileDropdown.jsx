import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logoutUser } from '../../../reducers/actions/authActions';

const ProfileDrop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch;

  const handleNavigation = (route) => {
    navigate(route, { replace: true });
  };

  const logOut = () => {
    dispatch(logoutUser);
    navigate('/sign-in')
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="outline-none">
      <div className="flex items-center space-x-2 rounded-ful p-2 transition-colors cursor-pointer">
            <div className="relative">
                <Avatar className="h-8 w-8">
                <AvatarImage src="/profile.png" alt="Profile" />
                <AvatarFallback>New</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div className= {`${!isOpen ? 'block': 'hidden'}`}>
              <p className='ml-0 '>john mark</p>
              {/* <p> adminmark@admin.com</p> */}
            </div><br />
        </div>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation('/admin/profile')}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={() => handleNavigation('/admin/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer text-red-600"
          onClick={logOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDrop;