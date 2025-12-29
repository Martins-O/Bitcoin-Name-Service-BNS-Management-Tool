# Bitcoin Name Service (BNS) Management Tool

A comprehensive web application for managing Bitcoin Name Service (BNS) domains on the Stacks blockchain. Search, register, track, and manage your .btc and .id domains with ease.

## Features

### 🔍 Domain Search & Registration
- Search for available BNS names across multiple namespaces (.btc, .id)
- Real-time availability checking
- Live pricing from Stacks blockchain
- Instant domain registration
- Domain suggestions based on search queries

### 📦 Bulk Registration
- Register multiple domains at once
- Line-by-line domain input
- Real-time processing status
- Success/failure reporting for each domain
- Time-saving batch operations

### 💼 Portfolio Management
- View all owned domains in one dashboard
- Portfolio statistics (total domains, expiring soon, estimated value)
- Real-time domain data from Stacks blockchain
- Domain metadata and registration details
- Quick domain management actions

### 🛒 Marketplace
- Browse available domains for sale
- Advanced filtering system:
  - Search by domain name
  - Filter by namespace
  - Filter by name length (min/max)
  - Filter by price range
  - Sort by multiple criteria
- Responsive grid layout
- Domain pricing and metadata display

### 🔔 Expiry Tracking & Notifications
- Automatic expiry monitoring for all domains
- Smart notification system with severity levels:
  - **Critical**: 7 days or less until expiry
  - **Warning**: 30 days or less until expiry
  - **Info**: 60 days or less until expiry
- Visual expiry alerts in portfolio
- Notification center with bell icon
- Unread notification counter
- Customizable notification frequency

### 🔐 Wallet Integration
- Seamless Stacks wallet connection
- Wallet address display
- One-click connect/disconnect
- Secure authentication via Stacks Connect

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stacks blockchain integration
- **Wallet**: Stacks Connect (@stacks/connect)
- **API**: Stacks Blockchain API (@stacks/blockchain-api-client)
- **Transactions**: @stacks/transactions
- **Network**: @stacks/network

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Stacks wallet (Hiro Wallet, Xverse, etc.)
- Git

### Installation

1. Clone the repository:
```bash
git clone git@github.com:Martins-O/Bitcoin-Name-Service-BNS-Management-Tool.git
cd Bitcoin-Name-Service-BNS-Management-Tool
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
echo "NEXT_PUBLIC_NETWORK=testnet" > .env.local
```

For mainnet, use:
```bash
echo "NEXT_PUBLIC_NETWORK=mainnet" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page (domain search)
│   ├── portfolio/           # Portfolio dashboard
│   ├── marketplace/         # Domain marketplace
│   └── bulk-register/       # Bulk registration
├── components/
│   ├── bns/                 # BNS-specific components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── WalletConnect.tsx
│   │   ├── DomainSearch.tsx
│   │   ├── NotificationBell.tsx
│   │   ├── ExpiryTracker.tsx
│   │   └── BulkRegistration.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       └── Card.tsx
├── hooks/                   # Custom React hooks
│   ├── useWallet.ts        # Wallet connection logic
│   ├── useBNS.ts           # BNS operations
│   └── useNotifications.ts # Notification management
├── lib/
│   └── stacks/             # Stacks blockchain integration
│       ├── config.ts       # Network and contract config
│       ├── client.ts       # Wallet client
│       └── bns-service.ts  # BNS API service
├── types/                  # TypeScript type definitions
│   └── bns.ts
├── utils/                  # Utility functions
│   ├── notifications.ts    # Notification service
│   └── expiry.ts          # Expiry tracking logic
└── public/                # Static assets
```

## Configuration

### Network Configuration

The app supports both testnet and mainnet. Configure via `.env.local`:

- **Testnet**: `NEXT_PUBLIC_NETWORK=testnet`
- **Mainnet**: `NEXT_PUBLIC_NETWORK=mainnet`

### BNS Contract Details

- **Contract Address**: `SP000000000000000000002Q6VF78`
- **Contract Name**: `bns`

### Supported Namespaces

- `.btc` - Bitcoin namespace
- `.id` - Identity namespace

## Features in Detail

### Notification System

The notification system uses browser localStorage to persist notifications across sessions:

- **Types**: expiry, renewal, sale, info
- **Storage**: Local browser storage (persists across sessions)
- **Limits**: 50 most recent notifications
- **Actions**: Mark as read, delete, clear all

### Expiry Tracking

Smart expiry monitoring with configurable thresholds:

```typescript
CRITICAL_THRESHOLD = 7 days
WARNING_THRESHOLD = 30 days
INFO_THRESHOLD = 60 days
```

Notification frequency:
- Critical alerts: Every 6 hours
- Warning alerts: Once per day
- Info alerts: Once per week

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Code Style

- TypeScript strict mode enabled
- ESLint configured with Next.js recommended rules
- Tailwind CSS for styling
- Component-based architecture

## API Integration

The app integrates with the Stacks Blockchain API:

- **Testnet**: `https://api.testnet.hiro.so`
- **Mainnet**: `https://api.mainnet.hiro.so`

### Key Endpoints

- `/v1/names/{name}.{namespace}` - Get name information
- `/v1/addresses/stacks/{address}` - Get names by address
- `/v2/prices/names/{name}.{namespace}` - Get name price
- `/v2/prices/namespaces/{namespace}` - Get namespace price

## Roadmap

- [ ] Actual domain registration transactions
- [ ] Domain transfer functionality
- [ ] Domain trading/marketplace with smart contracts
- [ ] Email/SMS notifications for expiry alerts
- [ ] Domain analytics and valuation tools
- [ ] Historical price data and charts
- [ ] Advanced search with regex support
- [ ] Mobile app (React Native)
- [ ] Integration with additional namespaces

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Built on the Stacks blockchain
- Powered by Bitcoin Name Service (BNS)
- UI inspired by modern web3 applications
- Community feedback and contributions

---

**Note**: This is a development tool. Always verify transactions on the blockchain and use testnet for testing before interacting with mainnet.
