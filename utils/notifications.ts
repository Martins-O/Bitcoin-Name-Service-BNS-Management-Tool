export interface Notification {
  id: string;
  type: 'expiry' | 'renewal' | 'sale' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  domainId?: string;
  actionUrl?: string;
}

export class NotificationService {
  private static STORAGE_KEY = 'bns_notifications';

  static getNotifications(): Notification[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const notifications = this.getNotifications();
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false,
    };

    notifications.unshift(newNotification);

    // Keep only last 50 notifications
    const trimmed = notifications.slice(0, 50);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmed));
  }

  static markAsRead(notificationId: string): void {
    const notifications = this.getNotifications();
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  static markAllAsRead(): void {
    const notifications = this.getNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  static deleteNotification(notificationId: string): void {
    const notifications = this.getNotifications();
    const filtered = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getUnreadCount(): number {
    const notifications = this.getNotifications();
    return notifications.filter(n => !n.read).length;
  }
}
