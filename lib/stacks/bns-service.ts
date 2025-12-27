import {
  callReadOnlyFunction,
  cvToJSON,
  stringAsciiCV,
  tupleCV,
  principalCV,
  bufferCV,
} from '@stacks/transactions';
import { NETWORK, BNS_CONTRACT_ADDRESS, BNS_CONTRACT_NAME, STACKS_API_URL } from './config';
import { BNSName, BNSDomain, RegistrationParams } from '@/types/bns';

export class BNSService {
  /**
   * Check if a BNS name is available
   */
  static async isNameAvailable(name: string, namespace: string): Promise<boolean> {
    try {
      const result = await callReadOnlyFunction({
        network: NETWORK,
        contractAddress: BNS_CONTRACT_ADDRESS,
        contractName: BNS_CONTRACT_NAME,
        functionName: 'name-resolve',
        functionArgs: [
          bufferCV(Buffer.from(namespace)),
          bufferCV(Buffer.from(name)),
        ],
        senderAddress: BNS_CONTRACT_ADDRESS,
      });

      const jsonResult = cvToJSON(result);
      return jsonResult.success === false;
    } catch (error) {
      console.error('Error checking name availability:', error);
      return false;
    }
  }

  /**
   * Get name information from BNS
   */
  static async getNameInfo(name: string, namespace: string): Promise<BNSName | null> {
    try {
      const response = await fetch(
        `${STACKS_API_URL}/v1/names/${name}.${namespace}`
      );

      if (!response.ok) return null;

      const data = await response.json();

      return {
        name: data.name,
        namespace: data.namespace,
        address: data.address,
        registered_at: data.registered_at,
        expire_block: data.expire_block,
        zonefile_hash: data.zonefile_hash,
        status: 'registered',
      };
    } catch (error) {
      console.error('Error fetching name info:', error);
      return null;
    }
  }

  /**
   * Get all names owned by an address
   */
  static async getNamesByAddress(address: string): Promise<BNSDomain[]> {
    try {
      const response = await fetch(
        `${STACKS_API_URL}/v1/addresses/stacks/${address}`
      );

      if (!response.ok) return [];

      const data = await response.json();
      const names = data.names || [];

      return names.map((fullName: string, index: number) => {
        const [name, namespace] = fullName.split('.');
        return {
          id: `${fullName}-${index}`,
          fullName,
          name,
          namespace,
          owner: address,
          registeredAt: Date.now(),
          forSale: false,
        };
      });
    } catch (error) {
      console.error('Error fetching names by address:', error);
      return [];
    }
  }

  /**
   * Search for available names
   */
  static async searchNames(query: string, namespace: string): Promise<BNSName[]> {
    const results: BNSName[] = [];

    // Check exact match
    const isAvailable = await this.isNameAvailable(query, namespace);
    results.push({
      name: query,
      namespace,
      address: '',
      status: isAvailable ? 'available' : 'registered',
    });

    // Generate suggestions
    const suggestions = [
      query,
      `${query}1`,
      `${query}2`,
      `${query}3`,
      `the${query}`,
      `${query}io`,
      `${query}app`,
    ];

    for (const suggestion of suggestions) {
      if (suggestion === query) continue;
      const available = await this.isNameAvailable(suggestion, namespace);
      results.push({
        name: suggestion,
        namespace,
        address: '',
        status: available ? 'available' : 'registered',
      });
    }

    return results;
  }

  /**
   * Get namespace information
   */
  static async getNamespacePrice(namespace: string): Promise<number> {
    try {
      const response = await fetch(
        `${STACKS_API_URL}/v2/prices/namespaces/${namespace}`
      );

      if (!response.ok) return 0;

      const data = await response.json();
      return data.amount || 0;
    } catch (error) {
      console.error('Error fetching namespace price:', error);
      return 0;
    }
  }

  /**
   * Get price for a specific name
   */
  static async getNamePrice(name: string, namespace: string): Promise<number> {
    try {
      const response = await fetch(
        `${STACKS_API_URL}/v2/prices/names/${name}.${namespace}`
      );

      if (!response.ok) return 0;

      const data = await response.json();
      return data.amount || 0;
    } catch (error) {
      console.error('Error fetching name price:', error);
      return 0;
    }
  }
}
