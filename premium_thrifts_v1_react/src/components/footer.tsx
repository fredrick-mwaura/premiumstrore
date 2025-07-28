import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Instagram, 
  Send 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white m-0 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Newsletter and App Download Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-gray-700">
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">PremiumHub</span>
              <span className="w-4 h-4 bg-purple-500 rounded-full ml-1 animate-pulse"></span>
            </div>
            <div className="text-sm mb-1 text-gray-300">NEW TO PremiumHub?</div>
            <div className="text-sm mb-4 text-gray-300">Subscribe to our newsletter to get updates on our latest offers!</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter E-mail Address" 
                className="flex-1 p-3 text-gray-800 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-r transition-colors flex items-center justify-center">
                <span className="mr-2 font-medium">Subscribe</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex mt-3 text-xs text-gray-400">
              <input type="checkbox" id="privacy-check" className="mt-1 mr-2" />
              <label htmlFor="privacy-check">
                I agree to PremiumHub's <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy and Cookie Policy</a>. 
                You can unsubscribe from newsletters at any time.
                <br />I accept the <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Legal Terms</a>
              </label>
            </div>
          </div>         
        </div>
        
        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          <div className="group">
            <h3 className="font-bold mb-4 text-gray-100 group-hover:text-purple-400 transition-colors">NEED HELP?</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Chat with us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Contact Us</a></li>
            </ul>
            
            <h3 className="font-bold mt-6 mb-4 text-gray-100 group-hover:text-purple-400 transition-colors">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Track Your Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Shipping and delivery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>How to Order?</a></li>
            </ul>
          </div>
          
          <div className="group">
            <h3 className="font-bold mb-4 text-gray-100 group-hover:text-purple-400 transition-colors">ABOUT PremiumHub</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>About us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Returns and Refunds Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>PremiumHub Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Privacy Notice</a></li>
            </ul>
          </div>
          
          <div className="group">
            <h3 className="font-bold mb-4 text-gray-100 group-hover:text-purple-400 transition-colors">MAKE MONEY WITH PremiumHub</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Sell on PremiumHub</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Vendor Hub</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors flex items-center">
                <span className="h-1 w-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Become a Sales Consultant</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Section */}
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-gray-100">JOIN US ON</h3>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-110">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all transform hover:scale-110">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all transform hover:scale-110">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Payment Section */}
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-gray-100">PAYMENT METHODS</h3>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <div className="bg-white text-black font-bold text-xs p-2 rounded-md w-20 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">Cash</div>
            <div className="bg-white text-blue-700 font-bold text-xs p-2 rounded-md w-20 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">Visa</div>
            <div className="bg-white text-blue-500 font-bold text-xs p-2 rounded-md w-20 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">PayPal</div>
            <div className="bg-white text-green-600 font-bold text-xs p-2 rounded-md w-20 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">M-Pesa</div>
          </div>
        </div>
        
        {/* Brands Section */}
        <div className="pt-6 border-t border-gray-700 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-2">Popular Brands</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Vans</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Adidas</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Denim</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-2">Electronics</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Samsung</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Canon</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Bruhm</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-2">Sportswear</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Nike</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Puma</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Reebok</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-2">Shoes</h4>
            <ul className="space-y-1">
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">New Balance</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Converse</li>
              <li className="text-xs text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">Clarks</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 text-center">
          <div className="inline-flex items-center">
            <span className="text-purple-400 font-bold">Premium</span>
            <span className="text-gray-300 font-bold">Hub</span>
            <span className="w-2 h-2 bg-purple-500 rounded-full ml-1"></span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} PremiumHub. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;