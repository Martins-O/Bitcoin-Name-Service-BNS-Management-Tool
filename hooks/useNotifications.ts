'use client';

import { useState, useEffect } from 'react';
import { Notification, NotificationService } from '@/utils/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = () => {
    const allNotifications = NotificationService.getNotifications();
    setNotifications(allNotifications);
    setUnreadCount(NotificationService.getUnreadCount());
  };

  useEffect(() => {
    loadNotifications();

    // Listen for storage changes (notifications from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bns_notifications') {
        loadNotifications();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    NotificationService.addNotification(notification);
    loadNotifications();
  };

  const markAsRead = (notificationId: string) => {
    NotificationService.markAsRead(notificationId);
    loadNotifications();
  };

  const markAllAsRead = () => {
    NotificationService.markAllAsRead();
    loadNotifications();
  };

  const deleteNotification = (notificationId: string) => {
    NotificationService.deleteNotification(notificationId);
    loadNotifications();
  };

  const clearAll = () => {
    NotificationService.clearAll();
    loadNotifications();
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    refresh: loadNotifications,
  };
}
