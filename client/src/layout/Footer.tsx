import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUserCircle,
  FaBox,
  FaHeart,
  FaCog,
} from "react-icons/fa";
import type React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { id: 1, name: "Shop", path: "/shop" },
    {
      id: 3,
      name: "Category",
      path:"/category"
    },
    { id: 7, name: "Journal", path: "/journal" },
    { id: 8, name: "About", path: "/about" },
  ];

  const accountLinks = [
    { id: 1, name: "My Profile", path: "/profile", icon: FaUserCircle },
    { id: 2, name: "Orders", path: "/orders", icon: FaBox },
    { id: 3, name: "Wishlist", path: "/wishlist", icon: FaHeart },
    { id: 4, name: "Addresses", path: "/addresses", icon: FaMapMarkerAlt },
    { id: 5, name: "Settings", path: "/settings", icon: FaCog },
  ];

  const socialLinks = [
    { id: 1, name: "Facebook", icon: FaFacebook, url: "https://facebook.com" },
    {
      id: 2,
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com",
    },
    { id: 3, name: "Twitter", icon: FaTwitter, url: "https://twitter.com" },
    { id: 4, name: "YouTube", icon: FaYoutube, url: "https://youtube.com" },
  ];

  const handleSubscribe = (e:React.SubmitEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed to newsletter");
  };

  return (
    <footer className="bg-app-green text-white/90 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="text-2xl font-bold inline-block">
                Village<span className="text-app-orange">Store</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Discover clean, stylish, and affordable fashion made for
                everyday life. Quality pieces designed for comfort and
                confidence.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-app-orange flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                 <Link className="flex items-center gap-2 text-white/70 hover:text-app-orange text-sm transition-colors duration-200"
                       to={link.path}>{link.name}</Link>
                ))}
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Account</h3>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.id}>
                      <Link
                        to={link.path}
                        className="flex items-center gap-2 text-white/70 hover:text-app-orange text-sm transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Stay Updated
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Subscribe to our newsletter for exclusive offers and new
                arrivals.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-app-orange transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-app-orange hover:bg-app-orange-dark flex items-center justify-center transition-colors duration-300"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-white/50">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </form>

              {/* Contact Info */}
              <div className="mt-6 space-y-2">
                <a
                  href="mailto:info@villagestore.com"
                  className="flex items-center gap-2 text-white/60 hover:text-app-orange text-sm transition-colors duration-200"
                >
                  <FaEnvelope className="w-4 h-4" />
                  info@villagestore.com
                </a>
                <a
                  href="tel:+233123456789"
                  className="flex items-center gap-2 text-white/60 hover:text-app-orange text-sm transition-colors duration-200"
                >
                  <FaPhone className="w-4 h-4" />
                  +233 241 52 9904
                </a>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <FaMapMarkerAlt className="w-4 h-4" />
                  Accra, Ghana
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {currentYear} VillageStore. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <Link
                to="/privacy"
                className="hover:text-app-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-app-orange transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-app-orange transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
