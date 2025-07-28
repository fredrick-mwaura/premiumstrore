import React from 'react';
import { ArrowLeft } from "lucide-react";
import { sections } from './data';

const PrivacyPolicy = () => {


  return (
    <div className="w-full m-auto p-6 bg-background rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-center text-white light:text-gray-800">Privacy Policy</h1>
          <p className="text-gray-500 mt-1">Last updated: February 28, 2025</p>
        </div>
        <a 
          href="/admin/dashboard" 
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </a>
      </div>

      {/* Introduction */}
      <div className="bg-background rounded-lg p-4 mb-8 border-l-4 border-blue-500">
        <p className="text-blue-800">
          This Privacy Policy describes how we collect, use, process, and disclose your information,
          including personal information, in conjunction with your access to and use of our platform.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <div className="bg-background p-2 rounded-lg mr-3">
                <section.icon className="h-5 w-5 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <div className="text-gray-600 whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="mt-10 bg-background p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li>By email: privacy@premiumthrift.com</li>
          <li>By phone: +254 (789) 123-4567</li>
          <li>By mail: 23 Privacy Nairobi, 45, Kenya</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;