import React, { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Book, Mail, Phone, PhoneCall } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by going to 'My Account' > 'Orders' and clicking on the 'Track Order' button next to your order. Alternatively, you can use the order tracking tool on our website by entering your order number and email address."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Some products like electronics may have specific return conditions. Please check our full return policy for more details."
  },
  {
    question: "How can I cancel my order?",
    answer: "If your order hasn't been shipped yet, you can cancel it by contacting our customer service team. Once an order has been shipped, you'll need to wait for delivery and then follow our return process."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to many countries worldwide. Shipping rates and delivery times vary by location. You can see available shipping options during checkout."
  },
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking on the 'Sign Up' button in the top right corner of our website. You'll need to provide your name, email address, and create a password."
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = searchQuery 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to frequently asked questions or contact our support team for assistance.
        </p>
        
        <div className="relative max-w-xl mx-auto mt-8">
          <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for help topics..."
            className="pl-10 w-full mb-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-4 flex justify-center">
            <MessageCircle className="h-10 w-10 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Chat with our support team for immediate assistance.</p>
          <Button variant="outline" className="w-full">Start Chat</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-4 flex justify-center">
            <Book className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
          <p className="text-gray-600 mb-4">Browse our comprehensive guides and articles.</p>
          <Button variant="outline" className="w-full">View Guides</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-4 flex justify-center">
            <Mail className="h-10 w-10 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours.</p>
          <Button variant="outline" className="w-full">Contact Us</Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-4 flex justify-center">
            <Phone className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 mb-4">Speak directly with our customer service team.</p>
          <Button variant="outline" className="w-full" asChild>
            <a href="tel:+1234567890">Call Now</a>
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mb-4 flex justify-center">
            <MessageCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
          <p className="text-gray-600 mb-4">Message us on WhatsApp for quick responses.</p>
          <Button variant="outline" className="w-full" asChild>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
          </Button>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No results found for "{searchQuery}". Try a different search term.
            </div>
          )}
        </Accordion>
        
        {searchQuery && filteredFaqs.length > 0 && (
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="mb-6">Our customer support team is available to assist you</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email Us
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
          <Button variant="secondary">
            <Phone className="mr-2 h-4 w-4" />
            Call Us
          </Button>
          <Button variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200">
            <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
