'use client';

import Link from 'next/link';
import { WalletConnect } from './WalletConnect';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              BNS Manager
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Search
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/marketplace"
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              Marketplace
            </Link>
          </nav>

          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
