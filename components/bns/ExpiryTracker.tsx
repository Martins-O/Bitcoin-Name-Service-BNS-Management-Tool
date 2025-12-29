'use client';

import { useEffect, useState } from 'react';
import { BNSDomain } from '@/types/bns';
import { ExpiryTracker, ExpiryAlert } from '@/utils/expiry';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ExpiryTrackerProps {
  domains: BNSDomain[];
  onRefresh?: () => void;
}

export function ExpiryTrackerComponent({ domains, onRefresh }: ExpiryTrackerProps) {
  const [alerts, setAlerts] = useState<ExpiryAlert[]>([]);

  useEffect(() => {
    const expiryAlerts = ExpiryTracker.checkPortfolioExpiries(domains);
    setAlerts(expiryAlerts);
  }, [domains]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardBody className="text-center py-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">All domains are healthy</h3>
          <p className="text-gray-600">No domains expiring soon</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Domain Expiry Alerts</h2>
            <p className="text-sm text-gray-600 mt-1">
              {alerts.length} domain{alerts.length !== 1 ? 's' : ''} require attention
            </p>
          </div>
          {onRefresh && (
            <Button size="sm" variant="outline" onClick={onRefresh}>
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.domain.id}
              className={`p-4 border-l-4 rounded-lg ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {alert.domain.fullName}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {alert.message}
                  </p>
                  {alert.domain.expiresAt && (
                    <p className="text-xs text-gray-600 mt-1">
                      Expiry date: {new Date(alert.domain.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button size="sm" variant="primary">
                  Renew
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
