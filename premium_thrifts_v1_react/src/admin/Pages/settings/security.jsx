import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const RenderSecuritySettings = ({ twoFactorEnabled, setTwoFactorEnabled, loginNotifications, setLoginNotifications }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Security Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your store's security preferences
        </p>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Two-Factor Authentication */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all admin accounts
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => {
                  console.log("2FA Toggle Changed:", checked); // Debugging log
                  setTwoFactorEnabled(checked);
                }}
              />
            </div>

            <Separator />

            {/* Login Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </p>
              </div>
              <Switch
                checked={loginNotifications}
                onCheckedChange={(checked) => {
                  console.log("Login Notifications Changed:", checked); // Debugging log
                  setLoginNotifications(checked);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RenderSecuritySettings;
