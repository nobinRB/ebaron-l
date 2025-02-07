import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const menuLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Shop', href: '/shop' },
  { name: 'Contact Us', href: '/contact' },
];

const categories = [
  { name: 'Curry Mud Pots', href: '/shop?category=curry-mud-pots' },
  { name: 'Water Dispensers', href: '/shop?category=water-dispensers' },
  { name: 'Planters', href: '/shop?category=planters' },
  { name: 'Mud Stoves', href: '/shop?category=mud-stoves' },
  { name: 'Decorative Pots', href: '/shop?category=decorative-pots' },
  { name: 'Serving Pots', href: '/shop?category=serving-pots' },
];

const usefulLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
  { name: 'Refund Policy', href: '/refund' },
  { name: 'FAQ', href: '/faq' },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: FaFacebookF,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: FaInstagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedinIn,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: FaXTwitter,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: FaYoutube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Side - Logo & Description */}
          <div className="col-span-12 md:col-span-4">
            <Link href="/" className="text-xl font-bold text-gray-900 mb-4 block">
              Clay Craft
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Discover our authentic collection of handcrafted clay cookware, 
              bringing traditional craftsmanship to modern kitchens. Each piece 
              is carefully made to enhance the flavors of your cooking while 
              preserving our cultural heritage.
            </p>
          </div>

          {/* Right Side - 3 Columns */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Menu Links */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Menu</h3>
                <ul className="space-y-2">
                  {menuLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link 
                        href={category.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Useful Links */}
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  {usefulLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Social Media - Reduced height */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center text-sm">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Clay Craft. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 