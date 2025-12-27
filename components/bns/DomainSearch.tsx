'use client';

import { useState } from 'react';
import { useBNS } from '@/hooks/useBNS';
import { BNSName } from '@/types/bns';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export function DomainSearch() {
  const [query, setQuery] = useState('');
  const [namespace, setNamespace] = useState('btc');
  const [results, setResults] = useState<BNSName[]>([]);
  const { searchNames, isLoading, getNamePrice } = useBNS();
  const [prices, setPrices] = useState<Record<string, number>>({});

  const handleSearch = async () => {
    if (!query.trim()) return;

    const searchResults = await searchNames(query.toLowerCase(), namespace);
    setResults(searchResults);

    // Fetch prices for results
    const pricePromises = searchResults.map(async (result) => {
      const price = await getNamePrice(result.name, result.namespace);
      return { name: result.name, price };
    });

    const priceResults = await Promise.all(pricePromises);
    const priceMap = priceResults.reduce((acc, { name, price }) => {
      acc[name] = price;
      return acc;
    }, {} as Record<string, number>);

    setPrices(priceMap);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <h2 className="text-2xl font-bold mb-4">Search BNS Names</h2>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter domain name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <select
              value={namespace}
              onChange={(e) => setNamespace(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="btc">.btc</option>
              <option value="id">.id</option>
            </select>

            <Button
              onClick={handleSearch}
              isLoading={isLoading}
              className="px-8"
            >
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>

            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lg">
                      {result.name}.{result.namespace}
                    </p>
                    <p className="text-sm text-gray-500">
                      {prices[result.name]
                        ? `${(prices[result.name] / 1000000).toFixed(2)} STX`
                        : 'Loading price...'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {result.status === 'available' ? (
                      <>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Available
                        </span>
                        <Button size="sm">
                          Register
                        </Button>
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Registered
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
