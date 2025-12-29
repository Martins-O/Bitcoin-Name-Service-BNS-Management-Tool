'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function BulkRegistration() {
  const [names, setNames] = useState('');
  const [namespace, setNamespace] = useState('btc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ name: string; status: 'success' | 'error'; message: string }>>([]);

  const handleBulkRegister = async () => {
    const nameList = names.split('\n').filter(n => n.trim());

    if (nameList.length === 0) {
      alert('Please enter at least one domain name');
      return;
    }

    setIsProcessing(true);
    const processResults: Array<{ name: string; status: 'success' | 'error'; message: string }> = [];

    for (const name of nameList) {
      const trimmedName = name.trim();

      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock result
      const success = Math.random() > 0.3;
      processResults.push({
        name: trimmedName,
        status: success ? 'success' : 'error',
        message: success ? 'Successfully registered' : 'Name already taken or invalid',
      });
    }

    setResults(processResults);
    setIsProcessing(false);
  };

  const clearForm = () => {
    setNames('');
    setResults([]);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Bulk Domain Registration</h2>
        <p className="text-sm text-gray-600 mt-1">
          Register multiple domains at once (one per line)
        </p>
      </CardHeader>
      <CardBody className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Namespace
          </label>
          <select
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isProcessing}
          >
            <option value="btc">.btc</option>
            <option value="id">.id</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain Names (one per line)
          </label>
          <textarea
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="satoshi&#10;bitcoin&#10;crypto&#10;web3"
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
            disabled={isProcessing}
          />
          <p className="text-sm text-gray-500 mt-1">
            {names.split('\n').filter(n => n.trim()).length} domain(s) entered
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleBulkRegister}
            isLoading={isProcessing}
            disabled={!names.trim()}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Register All'}
          </Button>
          <Button
            onClick={clearForm}
            variant="outline"
            disabled={isProcessing}
          >
            Clear
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Registration Results:</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.status === 'success'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {result.name}.{namespace}
                    </span>
                    <span
                      className={`text-sm ${
                        result.status === 'success' ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {result.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
