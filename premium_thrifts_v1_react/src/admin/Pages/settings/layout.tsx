import React from 'react';
import { ArrowLeft, Settings2, Shield, WalletCards } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeSection: 'general' | 'security' | 'paymentMethods';
  onSectionChange: (section: 'general' | 'security' | 'paymentMethods') => void;
}

interface SettingsNavItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ icon: Icon, label, isActive, onClick }) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-2 transition-all duration-200",
      isActive && "bg-accent"
    )}
    onClick={onClick}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Button>
);

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const handleSave = () => {
    toast.success("Settings saved successfully😇");
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-settings-appear">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className='justify-between flex m-auto'>
          <h1 className="text-3xl font-semibold text-settings-header">Settings</h1>

          <a 
          href="/admin/dashboard" 
          className="flex items-center text-sm font-large text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </a>
          </div>
          <p className="mt-2 text-muted-foreground">
            Manage your store preferences and settings
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <nav className="col-span-12 md:col-span-3 space-y-1">
            <SettingsNavItem
              icon={Settings2}
              label="General"
              isActive={activeSection === 'general'}
              onClick={() => onSectionChange('general')}
            />
            <SettingsNavItem
              icon={Shield}
              label="Security"
              isActive={activeSection === 'security'}
              onClick={() => onSectionChange('security')}
            />
            <SettingsNavItem
              icon={WalletCards}
              label="paymentMethods"
              isActive={activeSection === 'paymentMethods'}
              onClick={() => onSectionChange('paymentMethods')}
            />
          </nav>

          <div className="col-span-12 md:col-span-9">
            <div className="rounded-lg border border-settings-border bg-card p-6">
              {children}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;