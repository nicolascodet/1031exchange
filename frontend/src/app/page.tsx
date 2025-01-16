'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#FAFAFA]/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight">PropExchange</div>
          <div className="flex items-center gap-8">
            <Link href="/properties" className="text-gray-600 hover:text-gray-900">Properties</Link>
            <Link href="/exchanges" className="text-gray-600 hover:text-gray-900">Exchanges</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Sign in</Link>
            <Link href="/auth/register" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-semibold leading-tight mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Streamline your 1031 exchange with intelligent automation
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-[65ch]">
              Find and match like-kind properties effortlessly. Complete your exchanges with confidence using our modern platform.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/auth/register" 
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center text-lg font-medium transition-all">
                Start exchanging
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/demo" 
                className="px-8 py-4 border border-gray-200 hover:bg-gray-50 rounded-lg text-lg font-medium transition-all">
                View demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Active Exchanges */}
            <Link href="/exchanges" className="group">
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
                <div className="aspect-[4/3] bg-[#F5F5F5] rounded-xl mb-8 flex items-center justify-center">
                  <svg className="h-14 w-14 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 flex items-center group-hover:text-blue-600">
                  Active Exchanges
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  View and manage your current 1031 exchanges
                </p>
              </div>
            </Link>

            {/* Properties */}
            <Link href="/properties" className="group">
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
                <div className="aspect-[4/3] bg-[#F5F5F5] rounded-xl mb-8 flex items-center justify-center">
                  <svg className="h-14 w-14 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 flex items-center group-hover:text-blue-600">
                  Properties
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Browse available properties for exchange
                </p>
              </div>
            </Link>

            {/* Start Exchange */}
            <Link href="/exchanges/new" className="group">
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
                <div className="aspect-[4/3] bg-[#F5F5F5] rounded-xl mb-8 flex items-center justify-center">
                  <svg className="h-14 w-14 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3 flex items-center group-hover:text-blue-600">
                  Start Exchange
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Begin a new 1031 exchange process
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-5xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">$2.4B+</div>
              <div className="text-gray-600 text-lg">Exchange Volume</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">12,000+</div>
              <div className="text-gray-600 text-lg">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">99%</div>
              <div className="text-gray-600 text-lg">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-8">
              Ready to modernize your exchange process?
            </h2>
            <p className="text-gray-400 mb-10 text-xl">
              Join thousands of investors who trust PropExchange for their 1031 exchanges.
            </p>
            <Link href="/auth/register" 
              className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-lg flex items-center mx-auto w-fit text-lg font-medium transition-all">
              Get started now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 PropExchange. All rights reserved.
            </div>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
