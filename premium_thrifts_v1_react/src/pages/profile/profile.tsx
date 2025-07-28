import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

const Profile = () => {
  // State to track if sections are being edited
  const [editingAccount, setEditingAccount] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  // State for notifications
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const endpoint = import.meta.env.SERVER_API_ENDPOINT
  
  // Initial user data
  const initialUser = {
    first_name: "Joe",
    last_name: "Biden",
    email: "joe@gmail.com",
    address: {
      postal_code: "P.O Box 75-10200",
      street: "Nairobi, Nairobi",
      town: "Nairobi Town, Nairobi",
      county: "Nairobi county",
      phone: "+254 110292020 / +254 110292020"
    },
    storeCredit: 0,
    newsletterSubscribed: true
  };
  
  // State for user data
  const [user, setUser] = useState(initialUser);
  
  // State for form data (editable copies)
  const [accountForm, setAccountForm] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  
  const [addressForm, setAddressForm] = useState({...user.address});
  
  // Handle input changes for account details
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm({
      ...accountForm,
      [name]: value
    });
  };
  
  // Handle input changes for address
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
  };
  
  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  // Save account changes
  const saveAccountChanges = async (id) => {
    try {
      await axios.post(`endpoint/user/${id}`,{ 
        headers: {
          'Content-type': 'application/json',
        },
        body: accountForm

      })
      
      // Update local state
      setUser({
        ...user,
        first_name: accountForm.first_name,
        last_name: accountForm.last_name,
        email: accountForm.email
      });
      
      setEditingAccount(false);
      showNotification("Your account details have been updated successfully.");
    } catch (error) {
      showNotification("There was an error updating your account. Please try again.", "error");
    }
  };
  
  // Save address changes
  const saveAddressChanges = async (id) => {
    try {
      // In a real app, this would be an API call
      await axios.post(`endpoint/api/adresses/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: addressForm
      });
      
      // Update local state
      setUser({
        ...user,
        address: addressForm
      });
      
      setEditingAddress(false);
      showNotification("Your address has been updated successfully.");
    } catch (error) {
      showNotification("There was an error updating your address. Please try again.", "error");
    }
  };
  
  // Toggle newsletter subscription
  const toggleNewsletter = async (id) => {
    try {
      const newStatus = !user.newsletterSubscribed;
      
      // In a real app, this would be an API call
      await axios.post(`endpoint/api/users/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        is_subscribed: newStatus
      });
      
      // Update local state
      setUser({
        ...user,
        newsletterSubscribed: newStatus
      });
      
      showNotification(newStatus 
        ? "You have subscribed to our newsletter." 
        : "You have unsubscribed from our newsletter.");
    } catch (error) {
      showNotification("There was an error updating your newsletter preferences. Please try again.", "error");
    }
  };
  
  // Cancel editing
  const cancelAccountEdit = () => {
    setAccountForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
    setEditingAccount(false);
  };
  
  const cancelAddressEdit = () => {
    setAddressForm({...user.address});
    setEditingAddress(false);
  };
  
  // Update form data when user changes
  useEffect(() => {
    setAccountForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
    setAddressForm({...user.address});
  }, [user]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Overview</h1>
        
        {/* Notification */}
        {notification.show && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {notification.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Details */}
          <Card>
            <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">ACCOUNT DETAILS</CardTitle>
              {!editingAccount ? (
                <Button variant="ghost" size="sm" className="text-purple-500" onClick={() => setEditingAccount(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={cancelAccountEdit}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button variant="ghost" size="sm" className="text-green-500" onClick={saveAccountChanges}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              {!editingAccount ? (
                <div className="space-y-2">
                  <p className="font-semibold">{user.first_name + ' ' + user.last_name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Name</Label>
                    <Input 
                      id="first_name" 
                      name="first_name" 
                      value={accountForm.first_name} 
                      onChange={handleAccountChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={accountForm.email} 
                      onChange={handleAccountChange} 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Book */}
          <Card>
            <CardHeader className="bg-gray-50 border-b flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">ADDRESS BOOK</CardTitle>
              {!editingAddress ? (
                <Button variant="ghost" size="sm" className="text-purple-500" onClick={() => setEditingAddress(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={cancelAddressEdit}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button variant="ghost" size="sm" className="text-green-500" onClick={saveAddressChanges}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              {!editingAddress ? (
                <div className="space-y-1">
                  <p className="font-semibold">Your default shipping address:</p>
                  <p>{user.address.postal_code}</p>
                  <p>{user.address.street}</p>
                  <p>{user.address.town}</p>
                  <p>{user.address.county}</p>
                  <p>{user.address.phone}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="postal_code">P.O. Box</Label>
                    <Input 
                      id="postal_code" 
                      name="postal_code" 
                      value={addressForm.postal_code} 
                      onChange={handleAddressChange} 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="street">street</Label>
                    <Input 
                      id="street" 
                      name="street" 
                      value={addressForm.street} 
                      onChange={handleAddressChange} 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="town">Town</Label>
                    <Input 
                      id="town" 
                      name="town" 
                      value={addressForm.town} 
                      onChange={handleAddressChange} 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="county">county</Label>
                    <Input 
                      id="county" 
                      name="county" 
                      value={addressForm.county} 
                      onChange={handleAddressChange} 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={addressForm.phone} 
                      onChange={handleAddressChange} 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Store Credit */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg font-semibold">PREMIUMHUB STORE CREDIT</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white p-1 rounded-lg">
                  PT
                </div>
                <p>PremiumHub store credit balance: KSh {user.storeCredit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Preferences */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg font-semibold">NEWSLETTER PREFERENCES</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p>Manage your email communications to stay updated with the latest news and offers.</p>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="is_subscribed" 
                    name="is_subscribed" 
                    checked={user.newsletterSubscribed} 
                    onChange={toggleNewsletter}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" 
                  />
                  <Label htmlFor="is_subscribed">Subscribe to newsletter</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;