import React from 'react'
import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-localfind-600">
              LocalFind
            </h3>
            <p className="text-gray-600 mb-4">
              Find trusted local service providers in your area. Book
              appointments, read reviews, and get connected.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-localfind-600 transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-localfind-600 transition-colors"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-localfind-600 transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-localfind-600 transition-colors"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-800">
              For Customers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/categories"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Find Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Safety Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-800">
              For Providers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Join as Provider
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Business Resources
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Provider Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-800">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-localfind-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} LocalFind. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-gray-600 hover:text-localfind-600 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-localfind-600 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-localfind-600 text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
