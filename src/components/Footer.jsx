import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          
          {/* Column 1: Church Info & Contact */}
          <div className="col-span-1">
            <h4 className="font-bold text-white mb-4 text-lg">Victory Church Masajja</h4>
            <p className="text-sm mb-4">
              A community of faith, hope, and love, committed to serving God and humanity in Kampala and beyond.
            </p>
            <div className="space-y-2 text-sm">
                <p><i className="fas fa-map-marker-alt w-6 text-center mr-2"></i>Masajja, off Entebbe Highway</p>
                <p><i className="fas fa-phone w-6 text-center mr-2"></i>+256 784 290 507</p>
                <p><i className="fas fa-envelope w-6 text-center mr-2"></i>victorychurchmasajja1@gmail.com</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/im-new" className="hover:text-white transition-colors">I'm New</Link></li>
              {/* <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li> */}
              <li><Link to="/sermons" className="hover:text-white transition-colors">Sermons</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/giving" className="hover:text-white transition-colors">Give</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Connected */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Get Connected</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/pray" className="hover:text-white transition-colors">Request Prayer</Link></li>
              <li><Link to="/ministries" className="hover:text-white transition-colors">Join a Ministry</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Stay Updated</h4>
            <p className="text-sm mb-3">Subscribe to our newsletter for weekly encouragement and updates.</p>
            {/* FEATURE: Newsletter Signup Form */}
            <form className="flex mb-6">
              <input type="email" placeholder="Your Email" className="bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"/>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-r-md transition-colors">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
            
            {/* CHANGE: Social media links updated and open in a new tab */}
            <div className="flex space-x-5 text-2xl">
              <a href="https://www.facebook.com/p/Victory-Church-Masajja-100064391665772/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/friendsofvictorychurchmasajja?igsh=cnRldjdqdTlobGJ6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="https://www.tiktok.com/@victorychurchmasajja?_t=ZM-8xcJEBXO2oa&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><i className="fab fa-tiktok"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-center text-sm">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Victory Church Masajja. All Rights Reserved.</p>
          {/* CHANGE: Your custom credit line with heart icon */}
          <p>
            Designed with <i className="fas fa-heart text-red-500"></i> by Kirabo Isaac Buyondo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;