import React from 'react';
import ProfileLayout from './Layout';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from '../../container/footer';

const ProfileNewsletterPreferences = () => {
  return (
    <>
      <ProfileLayout title="Newsletter Preferences">
        <div className="max-w-2xl">
          <h2 className="text-lg font-medium mb-6">Define your preferences</h2>
          
          <div className="space-y-6">
            <RadioGroup defaultValue="daily">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" className="text-purple-500 border-purple-500" />
                <Label htmlFor="daily">I want to receive daily newsletters</Label>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <RadioGroupItem value="no-daily" id="no-daily" />
                <Label htmlFor="no-daily">I don't want to receive daily newsletters</Label>
              </div>
            </RadioGroup>
            
            <div className="space-y-2 pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="privacy" className="mt-1 text-purple-500 border-purple-500" />
                <Label htmlFor="privacy" className="text-sm leading-tight">
                  I agree to Jumia's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.
                  <br />
                  <span className="text-purple-500">I accept the Legal Terms</span>
                </Label>
              </div>
            </div>
            
            <Button className="w-full py-6 bg-purple-500 hover:bg-purple-600">Save</Button>
          </div>
        </div>
      </ProfileLayout>
      <Footer />
    </>
  );
};

export default ProfileNewsletterPreferences;