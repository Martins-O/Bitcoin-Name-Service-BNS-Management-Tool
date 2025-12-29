import { BNSDomain } from '@/types/bns';

export interface ExpiryAlert {
  domain: BNSDomain;
  daysUntilExpiry: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
}

export class ExpiryTracker {
  static CRITICAL_THRESHOLD = 7; // days
  static WARNING_THRESHOLD = 30; // days
  static INFO_THRESHOLD = 60; // days

  static checkExpiry(domain: BNSDomain): ExpiryAlert | null {
    if (!domain.expiresAt) return null;

    const now = Date.now();
    const expiryTime = domain.expiresAt;
    const daysUntilExpiry = Math.floor((expiryTime - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return {
        domain,
        daysUntilExpiry,
        severity: 'critical',
        message: `Domain expired ${Math.abs(daysUntilExpiry)} days ago`,
      };
    }

    if (daysUntilExpiry <= this.CRITICAL_THRESHOLD) {
      return {
        domain,
        daysUntilExpiry,
        severity: 'critical',
        message: `Domain expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
      };
    }

    if (daysUntilExpiry <= this.WARNING_THRESHOLD) {
      return {
        domain,
        daysUntilExpiry,
        severity: 'warning',
        message: `Domain expires in ${daysUntilExpiry} days`,
      };
    }

    if (daysUntilExpiry <= this.INFO_THRESHOLD) {
      return {
        domain,
        daysUntilExpiry,
        severity: 'info',
        message: `Domain expires in ${daysUntilExpiry} days`,
      };
    }

    return null;
  }

  static checkPortfolioExpiries(domains: BNSDomain[]): ExpiryAlert[] {
    const alerts: ExpiryAlert[] = [];

    for (const domain of domains) {
      const alert = this.checkExpiry(domain);
      if (alert) {
        alerts.push(alert);
      }
    }

    // Sort by severity and days until expiry
    return alerts.sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      return a.daysUntilExpiry - b.daysUntilExpiry;
    });
  }

  static shouldNotify(domain: BNSDomain, lastNotificationTime?: number): boolean {
    if (!domain.expiresAt) return false;

    const alert = this.checkExpiry(domain);
    if (!alert) return false;

    // Don't notify if we already notified recently
    if (lastNotificationTime) {
      const hoursSinceLastNotification = (Date.now() - lastNotificationTime) / (1000 * 60 * 60);

      // Critical: notify every 6 hours
      if (alert.severity === 'critical' && hoursSinceLastNotification < 6) return false;

      // Warning: notify once per day
      if (alert.severity === 'warning' && hoursSinceLastNotification < 24) return false;

      // Info: notify once per week
      if (alert.severity === 'info' && hoursSinceLastNotification < 168) return false;
    }

    return true;
  }
}
