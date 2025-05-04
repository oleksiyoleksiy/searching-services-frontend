import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe, Users, MessageSquare, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About LocalFind</h1>
              <p className="text-xl text-gray-700">
                Connecting local service providers with customers in your community
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Platform</h2>
              <p className="text-lg text-gray-700 mb-6">
                LocalFind is a community-focused platform that brings together service providers and
                customers in your local area. We make it easy to discover, book, and manage services
                from trusted professionals in your neighborhood.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're looking for home maintenance, professional services, or personal care,
                LocalFind helps you connect with skilled providers who have been vetted and reviewed by your
                community. For service professionals, we provide the tools to showcase your expertise,
                manage bookings, and grow your business.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose LocalFind</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-localfind-100 text-localfind-600 mb-4">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Community</h3>
                <p className="text-gray-600">Support businesses in your neighborhood and strengthen your local economy.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-localfind-100 text-localfind-600 mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600">All service providers are thoroughly vetted with verified reviews.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-localfind-100 text-localfind-600 mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
                <p className="text-gray-600">Direct messaging with service providers for clear expectations.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-localfind-100 text-localfind-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growing Network</h3>
                <p className="text-gray-600">Join thousands of satisfied users finding and providing local services.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
              <div className="bg-gradient-to-r from-localfind-500 to-localfind-600 text-white p-8 rounded-lg">
                <p className="text-xl italic">
                  "To empower local communities by creating meaningful connections between skilled service
                  providers and the customers who need them, while promoting quality, transparency, and trust."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section (Placeholder) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
                <p className="text-localfind-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600">Passionate about connecting communities and supporting local businesses.</p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=150"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Johnson</h3>
                <p className="text-localfind-600 mb-3">CTO</p>
                <p className="text-gray-600">Tech enthusiast focused on creating intuitive user experiences.</p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Thompson</h3>
                <p className="text-localfind-600 mb-3">Head of Operations</p>
                <p className="text-gray-600">Expert in connecting service providers with the right customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-localfind-600 to-localfind-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of service providers and customers to experience the best way to connect with local services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/auth/register" className="inline-block px-6 py-3 bg-white text-localfind-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Sign up now
              </a>
              <a href="/categories" className="inline-block px-6 py-3 bg-localfind-500 text-white font-medium rounded-lg hover:bg-localfind-400 transition-colors">
                Browse services
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutPage;