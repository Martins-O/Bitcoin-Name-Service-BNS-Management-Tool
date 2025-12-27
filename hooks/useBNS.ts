'use client';

import { useState } from 'react';
import { BNSService } from '@/lib/stacks/bns-service';
import { BNSName, BNSDomain } from '@/types/bns';

export function useBNS() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNames = async (query: string, namespace: string): Promise<BNSName[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await BNSService.searchNames(query, namespace);
      return results;
    } catch (err) {
      setError('Failed to search names');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const checkAvailability = async (name: string, namespace: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      return await BNSService.isNameAvailable(name, namespace);
    } catch (err) {
      setError('Failed to check availability');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getNameInfo = async (name: string, namespace: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await BNSService.getNameInfo(name, namespace);
    } catch (err) {
      setError('Failed to fetch name info');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getPortfolio = async (address: string): Promise<BNSDomain[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await BNSService.getNamesByAddress(address);
    } catch (err) {
      setError('Failed to fetch portfolio');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getNamePrice = async (name: string, namespace: string): Promise<number> => {
    setIsLoading(true);
    setError(null);
    try {
      return await BNSService.getNamePrice(name, namespace);
    } catch (err) {
      setError('Failed to fetch price');
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    searchNames,
    checkAvailability,
    getNameInfo,
    getPortfolio,
    getNamePrice,
  };
}
