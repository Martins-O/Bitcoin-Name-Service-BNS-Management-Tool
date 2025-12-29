'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/bns/Header';
import { useWallet } from '@/hooks/useWallet';
import { useBNS } from '@/hooks/useBNS';
import { BNSDomain } from '@/types/bns';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExpiryTrackerComponent } from '@/components/bns/ExpiryTracker';

export default function PortfolioPage() {
  const { address, isConnected } = useWallet();
  const { getPortfolio, isLoading } = useBNS();
  const [domains, setDomains] = useState<BNSDomain[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    totalValue: 0,
  });

  useEffect(() => {
    if (isConnected && address) {
      loadPortfolio();
    }
  }, [isConnected, address]);

  const loadPortfolio = async () => {
    if (!address) return;

    const portfolioDomains = await getPortfolio(address);
    setDomains(portfolioDomains);

    // Calculate stats
    const expiringSoon = portfolioDomains.filter(d => {
      if (!d.expiresAt) return false;
      const daysUntilExpiry = (d.expiresAt - Date.now()) / (1000 * 60 * 60 * 24);
      return daysUntilExpiry <= 30;
    }).length;

    const totalValue = portfolioDomains.reduce((sum, d) => sum + (d.price || 0), 0);

    setStats({
      total: portfolioDomains.length,
      expiringSoon,
      totalValue,
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardBody className="text-center py-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-4">
                Connect your Stacks wallet to view your BNS portfolio
              </p>
            </CardBody>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Manage and track all your BNS domains</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Domains</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.expiringSoon}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estimated Value</p>
                  <p className="text-3xl font-bold text-green-600">
                    {(stats.totalValue / 1000000).toFixed(2)} STX
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {domains.length > 0 && (
          <div className="mb-8">
            <ExpiryTrackerComponent domains={domains} onRefresh={loadPortfolio} />
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Domains</h2>
              <Button size="sm" onClick={loadPortfolio} isLoading={isLoading}>
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your domains...</p>
              </div>
            ) : domains.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No domains found</h3>
                <p className="text-gray-600 mb-4">
                  You don't own any BNS domains yet
                </p>
                <Button onClick={() => window.location.href = '/'}>
                  Search Domains
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {domains.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{domain.fullName}</h3>
                      <div className="flex gap-4 mt-1">
                        <p className="text-sm text-gray-600">
                          Registered: {new Date(domain.registeredAt).toLocaleDateString()}
                        </p>
                        {domain.expiresAt && (
                          <p className="text-sm text-gray-600">
                            Expires: {new Date(domain.expiresAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {domain.forSale && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          For Sale
                        </span>
                      )}
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
