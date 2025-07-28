import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Edit, Shield, AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '05/26', status: 'active' },
    { id: 2, type: 'PayPal', email: 'store@premium-thrifts.com', status: 'active' },
    { id: 3, type: 'M-Pesa', phone: '254712345678', status: 'active' },
    { id: 4, type: 'Airtel Money', phone: '254737654321', status: 'inactive' }
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const confirmDelete = (id) => {
    setMethodToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== methodToDelete));
    setShowDeleteConfirm(false);
    setMethodToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setMethodToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-900 text-emerald-400';
      case 'inactive': return 'bg-gray-800 text-gray-400';
      default: return 'bg-blue-900 text-blue-400';
    }
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'Visa':
        return <CreditCard className="h-6 w-6 text-gray-300" />;
      case 'PayPal':
        return <div className="text-gray-300 font-bold text-lg">P</div>;
      case 'M-Pesa':
        return <div className="text-gray-300 font-bold text-lg">M</div>;
      case 'Airtel Money':
        return <div className="text-gray-300 font-bold text-lg">A</div>;
      default:
        return <CreditCard className="h-6 w-6 text-gray-300" />;
    }
  };

  const getPaymentInfo = (method) => {
    if (method.type === 'Visa') {
      return (
        <>
          <div className="font-medium">{method.type} •••• {method.last4}</div>
          <div className="text-sm text-gray-400">Expires {method.expiry}</div>
        </>
      );
    } else if (method.type === 'PayPal') {
      return (
        <>
          <div className="font-medium">{method.type}</div>
          <div className="text-sm text-gray-400">{method.email}</div>
        </>
      );
    } else if (method.type === 'M-Pesa' || method.type === 'Airtel Money') {
      return (
        <>
          <div className="font-medium">{method.type}</div>
          <div className="text-sm text-gray-400">{method.phone}</div>
        </>
      );
    }
  };

  const handleAddMethod = () => {
    let newMethod;

    switch (selectedPaymentType) {
      case 'Visa':
        newMethod = {
          id: Date.now(),
          type: 'Visa',
          last4: cardNumber.slice(-4),
          expiry: expiry,
          status: 'active',
        };
        break;
      case 'PayPal':
        newMethod = {
          id: Date.now(),
          type: 'PayPal',
          email: paypalEmail,
          status: 'active',
        };
        break;
      case 'M-Pesa':
      case 'Airtel Money':
        newMethod = {
          id: Date.now(),
          type: selectedPaymentType,
          phone: phoneNumber,
          status: 'active',
        };
        break;
      default:
        return;
    }

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddModal(false);
    // Reset form fields
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setPaypalEmail('');
    setPhoneNumber('');
    setSelectedPaymentType('');
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg mt-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Methods Settings</h2>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-5 w-5" />
            <span>Add Method</span>
          </button>
        </div>
        
        <p className="text-gray-400 mb-6">Configure your store's payment method preferences</p>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-700 p-2 rounded-md flex items-center justify-center w-10 h-10">
                    {getPaymentIcon(method.type)}
                  </div>
                  <div>
                    {getPaymentInfo(method)}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(method.status)}`}>
                    {method.status.charAt(0).toUpperCase() + method.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-white p-1">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-400 p-1"
                    onClick={() => confirmDelete(method.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {paymentMethods.length === 0 && (
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <div className="flex flex-col items-center">
                <CreditCard className="h-12 w-12 text-gray-500 mb-3" />
                <p className="text-gray-300 font-medium">No payment methods configured</p>
                <p className="text-gray-500 text-sm mt-1">Add a payment method to start accepting payments</p>
              </div>
            </div>
          )}
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-900 p-2 rounded-md">
                <Shield className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <div className="font-medium">Payment Security</div>
                <p className="text-sm text-gray-400 mt-1">
                  All payment methods are encrypted and securely stored. Your store supports Visa, PayPal, M-Pesa, and Airtel Money for secure transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="mt-6 flex justify-end">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-colors" onClick={saveChanges}>
            Save Changes
          </button>
        </div> */}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-medium">Remove Payment Method</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Are you sure you want to remove this payment method? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-lg font-medium mb-4">Add Payment Method</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Payment Method Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Visa', 'PayPal', 'M-Pesa', 'Airtel Money'].map((type) => (
                  <div 
                    key={type}
                    className={`border rounded-md p-3 cursor-pointer flex items-center space-x-3 ${
                      selectedPaymentType === type 
                        ? 'border-purple-500 bg-gray-700' 
                        : 'border-gray-600 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedPaymentType(type)}
                  >
                    <div className="bg-gray-600 p-2 rounded-md flex items-center justify-center w-8 h-8">
                      {getPaymentIcon({ type })}
                    </div>
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedPaymentType === 'Visa' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Card Number
                  </label>
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                    placeholder="•••• •••• •••• ••••"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Expiry Date
                    </label>
                    <input 
                      type="text" 
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      CVC
                    </label>
                    <input 
                      type="text" 
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                      placeholder="•••"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedPaymentType === 'PayPal' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  PayPal Email
                </label>
                <input 
                  type="email" 
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                  placeholder="email@example.com"
                />
              </div>
            )}
            
            {(selectedPaymentType === 'M-Pesa' || selectedPaymentType === 'Airtel Money') && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                  placeholder="e.g. 254712345678"
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedPaymentType('');
                  setCardNumber('');
                  setExpiry('');
                  setCvc('');
                  setPaypalEmail('');
                  setPhoneNumber('');
                }}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                onClick={handleAddMethod}
              >
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;