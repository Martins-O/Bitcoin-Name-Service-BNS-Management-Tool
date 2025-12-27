'use client';

import { useState, useEffect } from 'react';
import { userSession, connectWallet, disconnectWallet, getAddress } from '@/lib/stacks/client';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (userSession.isUserSignedIn()) {
        setIsConnected(true);
        setAddress(getAddress());
      } else {
        setIsConnected(false);
        setAddress(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const connect = () => {
    connectWallet({
      onFinish: () => {
        setIsConnected(true);
        setAddress(getAddress());
      },
    });
  };

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    setAddress(null);
  };

  return {
    address,
    isConnected,
    isLoading,
    connect,
    disconnect,
  };
}
