import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import SettingsLayout from './layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import RenderSecuritySettings from './security'; 
import PaymentMethods from './payment';

interface SettingsPageProps {
  defaultSection?: 'general' | 'security' | 'paymentMethods';
}

const Settings = ({ defaultSection = 'general' }: SettingsPageProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(defaultSection);

  // State for general settings
  const [storeName, setStoreName] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [currency, setCurrency] = useState('USD');

  // State for preferences
  const [inventoryAlerts, setInventoryAlerts] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState('10');
  const [automaticReorder, setAutomaticReorder] = useState(false);

  // State for security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(false);

  useEffect(() => {
    setActiveSection(defaultSection);
  }, [defaultSection]);

  const handleSectionChange = (section: 'general' | 'security') => {
    setActiveSection(section);
    navigate(section === 'general' ? '/admin/settings/' : `/admin/settings/${section}`);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">General Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your store's general settings and preferences
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    placeholder="Enter your store name"
                    className="max-w-md"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    placeholder="store@example.com"
                    className="max-w-md"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input
                    id="currency"
                    placeholder="USD"
                    className="max-w-md"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Inventory Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when products are low in stock
                      </p>
                    </div>
                    <Switch 
                      checked={inventoryAlerts}
                      onCheckedChange={setInventoryAlerts}
                    />
                  </div>
                  
                  {inventoryAlerts && (
                    <div className="space-y-2 pl-4 border-l-2 border-settings-border">
                      <div className="space-y-2">
                        <Label htmlFor="threshold">Low Stock Threshold</Label>
                        <Input
                          id="threshold"
                          type="number"
                          className="max-w-[150px]"
                          value={lowStockThreshold}
                          onChange={(e) => setLowStockThreshold(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Reorder</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create purchase orders for low stock items
                      </p>
                    </div>
                    <Switch 
                      checked={automaticReorder}
                      onCheckedChange={setAutomaticReorder}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <SettingsLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
  {activeSection === "general" ? (
    renderGeneralSettings()
  ) : activeSection === "security" ? (
    <RenderSecuritySettings 
      twoFactorEnabled={twoFactorEnabled} 
      setTwoFactorEnabled={setTwoFactorEnabled} 
      loginNotifications={loginNotifications} 
      setLoginNotifications={setLoginNotifications} 
    />
  ) : (
    <PaymentMethods />
  )}
</SettingsLayout>

  );
};

export default Settings;