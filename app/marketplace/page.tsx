'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/bns/Header';
import { BNSDomain, DomainFilters } from '@/types/bns';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function MarketplacePage() {
  const [domains, setDomains] = useState<BNSDomain[]>([]);
  const [filteredDomains, setFilteredDomains] = useState<BNSDomain[]>([]);
  const [filters, setFilters] = useState<DomainFilters>({
    minLength: undefined,
    maxLength: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    namespace: 'all',
    forSale: true,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    // Mock data - in production, fetch from API or indexer
    const mockDomains: BNSDomain[] = [
      {
        id: '1',
        fullName: 'satoshi.btc',
        name: 'satoshi',
        namespace: 'btc',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 30,
        expiresAt: Date.now() + 86400000 * 335,
        price: 10000000000, // 10,000 STX
        forSale: true,
      },
      {
        id: '2',
        fullName: 'bitcoin.btc',
        name: 'bitcoin',
        namespace: 'btc',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 60,
        expiresAt: Date.now() + 86400000 * 305,
        price: 50000000000, // 50,000 STX
        forSale: true,
      },
      {
        id: '3',
        fullName: 'crypto.btc',
        name: 'crypto',
        namespace: 'btc',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 45,
        expiresAt: Date.now() + 86400000 * 320,
        price: 5000000000, // 5,000 STX
        forSale: true,
      },
      {
        id: '4',
        fullName: 'dev.id',
        name: 'dev',
        namespace: 'id',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 20,
        expiresAt: Date.now() + 86400000 * 345,
        price: 1000000000, // 1,000 STX
        forSale: true,
      },
      {
        id: '5',
        fullName: 'web3.btc',
        name: 'web3',
        namespace: 'btc',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 15,
        expiresAt: Date.now() + 86400000 * 350,
        price: 8000000000, // 8,000 STX
        forSale: true,
      },
      {
        id: '6',
        fullName: 'defi.btc',
        name: 'defi',
        namespace: 'btc',
        owner: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        registeredAt: Date.now() - 86400000 * 50,
        expiresAt: Date.now() + 86400000 * 315,
        price: 6000000000, // 6,000 STX
        forSale: true,
      },
    ];

    setDomains(mockDomains);
    setFilteredDomains(mockDomains);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, domains]);

  const applyFilters = () => {
    let filtered = [...domains];

    // Search query
    if (filters.searchQuery) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    // Namespace
    if (filters.namespace && filters.namespace !== 'all') {
      filtered = filtered.filter(d => d.namespace === filters.namespace);
    }

    // Length
    if (filters.minLength) {
      filtered = filtered.filter(d => d.name.length >= filters.minLength!);
    }
    if (filters.maxLength) {
      filtered = filtered.filter(d => d.name.length <= filters.maxLength!);
    }

    // Price
    if (filters.minPrice) {
      filtered = filtered.filter(d => (d.price || 0) >= filters.minPrice! * 1000000);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(d => (d.price || 0) <= filters.maxPrice! * 1000000);
    }

    // For sale
    if (filters.forSale !== undefined) {
      filtered = filtered.filter(d => d.forSale === filters.forSale);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case 'registered':
          comparison = a.registeredAt - b.registeredAt;
          break;
        case 'expiry':
          comparison = (a.expiresAt || 0) - (b.expiresAt || 0);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredDomains(filtered);
  };

  const updateFilter = (key: keyof DomainFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      minLength: undefined,
      maxLength: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      namespace: 'all',
      forSale: true,
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Domain Marketplace</h1>
          <p className="text-gray-600">Browse and purchase BNS domains from other users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Clear
                  </button>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => updateFilter('searchQuery', e.target.value)}
                    placeholder="Search domains..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Namespace */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Namespace
                  </label>
                  <select
                    value={filters.namespace}
                    onChange={(e) => updateFilter('namespace', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Namespaces</option>
                    <option value="btc">.btc</option>
                    <option value="id">.id</option>
                  </select>
                </div>

                {/* Name Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name Length
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.minLength || ''}
                      onChange={(e) => updateFilter('minLength', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={filters.maxLength || ''}
                      onChange={(e) => updateFilter('maxLength', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (STX)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.minPrice || ''}
                      onChange={(e) => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="number"
                      value={filters.maxPrice || ''}
                      onChange={(e) => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="registered">Registered Date</option>
                    <option value="expiry">Expiry Date</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => updateFilter('sortOrder', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Domains Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredDomains.length} domain{filteredDomains.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDomains.map((domain) => (
                <Card key={domain.id}>
                  <CardBody>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {domain.fullName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {domain.name.length} characters
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                        .{domain.namespace}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-gray-900">
                          {((domain.price || 0) / 1000000).toLocaleString()} STX
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Registered:</span>
                        <span className="text-gray-900">
                          {new Date(domain.registeredAt).toLocaleDateString()}
                        </span>
                      </div>
                      {domain.expiresAt && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Expires:</span>
                          <span className="text-gray-900">
                            {new Date(domain.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full">
                      Buy Now
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>

            {filteredDomains.length === 0 && (
              <Card>
                <CardBody className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No domains found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
