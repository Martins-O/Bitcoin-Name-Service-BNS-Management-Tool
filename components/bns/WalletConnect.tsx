'use client';

import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/Button';

export function WalletConnect() {
  const { address, isConnected, isLoading, connect, disconnect } = useWallet();

  if (isLoading) {
    return (
      <Button variant="secondary" disabled>
        Loading...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          <p className="text-sm font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <Button variant="outline" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={connect}>
      Connect Wallet
    </Button>
  );
}
