export interface BNSName {
  name: string;
  namespace: string;
  address: string;
  registered_at?: number;
  expire_block?: number;
  zonefile_hash?: string;
  status: 'available' | 'registered' | 'expired';
}

export interface BNSDomain {
  id: string;
  fullName: string; // name.namespace
  name: string;
  namespace: string;
  owner: string;
  registeredAt: number;
  expiresAt?: number;
  price?: number;
  forSale: boolean;
  metadata?: {
    description?: string;
    twitter?: string;
    website?: string;
  };
}

export interface DomainFilters {
  minLength?: number;
  maxLength?: number;
  minPrice?: number;
  maxPrice?: number;
  namespace?: string;
  forSale?: boolean;
  searchQuery?: string;
  sortBy?: 'name' | 'price' | 'registered' | 'expiry';
  sortOrder?: 'asc' | 'desc';
}

export interface Portfolio {
  totalDomains: number;
  totalValue: number;
  domains: BNSDomain[];
  expiringDomains: BNSDomain[];
}

export interface RegistrationParams {
  name: string;
  namespace: string;
  zonefile?: string;
}

export interface BulkRegistrationParams {
  names: string[];
  namespace: string;
}
