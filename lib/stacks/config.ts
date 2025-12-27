import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
  ? new StacksMainnet()
  : new StacksTestnet();

export const BNS_CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78';
export const BNS_CONTRACT_NAME = 'bns';

export const APP_NAME = 'BNS Management Tool';
export const APP_ICON = '/icon.png';

export const BNS_NAMESPACES = [
  { id: 'btc', label: '.btc', launched: true },
  { id: 'id', label: '.id', launched: true },
  { id: 'blockstack', label: '.blockstack', launched: false },
];

export const STACKS_API_URL = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
  ? 'https://api.mainnet.hiro.so'
  : 'https://api.testnet.hiro.so';
