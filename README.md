# 🎮 Game Guess - IOTA Blockchain dApp

A decentralized number guessing game built on the IOTA blockchain network. Players need to guess 4 secret numbers correctly to receive a Flag NFT.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/870adf7d-bf98-4170-9b0d-e63344ab2617" />

Contract Address

- **Network**: testnet
- **Package ID**: `0x3062c7a482e441a030860cf496ac40a1d2de08d0938d77154276b033cf985814`
- **Explorer**: [View on Explorer](https://explorer.iota.org/object/0xf2c59b67c6da61043b13da22261ad17a1697a2162e5b792a1c778562247f70b4?network=testnet)
## ✨ Features

- 🔗 Connect IOTA wallet via IOTA dApp Kit
- 🎯 Submit your guess to the smart contract
- 📦 Receive GuessBox NFT after each guess
- 🏆 Get Flag NFT when guessing correctly
- ⛓️ Fully on-chain, transparent and immutable
- 🎨 Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Blockchain**: IOTA Network (Devnet)
- **Smart Contract**: Move Language
- **UI**: Tailwind CSS, Radix UI
- **Web3**: @iota/dapp-kit, @iota/iota-sdk

## 📋 Prerequisites

- Node.js 18+
- IOTA CLI installed
- IOTA wallet (supporting IOTA dApp Kit)
- IOTA test tokens (for devnet)

## 🚀 Installation

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd GameGuess
npm install --legacy-peer-deps
```

> **Note**: Use `--legacy-peer-deps` to avoid peer dependency conflicts between React 19 and other libraries.

### 2. Deploy Smart Contract

```bash
npm run iota-deploy
```

After successful deployment, you'll receive a **Package ID**. Copy this ID!

### 3. Update configuration

Open `lib/config.ts` and replace `PACKAGE_ID` with your Package ID:

```typescript
export const PACKAGE_ID = "0x..."; // Replace with your Package ID
```

### 4. Run the application

```bash
npm run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

1. **Connect Wallet**: Click "Connect Wallet" and select your IOTA wallet
2. **Enter Guess**: Input 4 numbers (each number from 0-255)
3. **Submit Guess**: Click "Submit Guess" to send to blockchain
4. **Get GuessBox ID**: After successful transaction, you'll receive a GuessBox object ID
5. **Check Result**: Enter GuessBox ID and click "Check" to see the result
6. **Receive Flag**: If correct, you'll receive a Flag NFT! 🎉

## 🧩 Smart Contract

### Structure

```move
module game_guess::guess {
    // Struct storing player's guess
    public struct GuessAttempt has store {
        number1: u16,
        number2: u16,
        number3: u16,
        number4: u16,
    }

    // NFT containing the guess
    public struct GuessBox has key, store {
        id: UID,
        guess: GuessAttempt,
    }

    // Reward NFT when guessed correctly
    public struct Flag has key, store {
        id: UID,
        user: address,
        solved_at: u64,
    }
}
```

### Main Functions

#### `submit_guess(number1: u16, number2: u16, number3: u16, number4: u16)`
- Submit your guess with 4 numbers of type `u16` (0-65535)
- Creates a GuessBox NFT containing your guess
- GuessBox is transferred to your wallet address

#### `check_guess(guessbox: &GuessBox)`
- Checks if the guess is correct by comparing BCS encoding
- If correct: Creates and transfers Flag NFT to you
- If incorrect: Transaction fails with error `EIncorrectGuess`

### How It Works

The smart contract uses **BCS (Binary Canonical Serialization)** for comparison:
- Your guess is serialized into bytes
- Compared with the secret hex string: `x"0a0014001e002800"`
- Correct answer: **[10, 20, 30, 40]**

## 📁 Project Structure

```
GameGuess/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main page - Game UI
│   └── globals.css              # Global styles
├── components/                   # React components
│   └── Provider.tsx             # IOTA providers (QueryClient, WalletProvider)
├── contract/                     # Smart contracts
│   └── game_guess/
│       ├── sources/
│       │   └── game_guess.move  # Move smart contract
│       ├── Move.toml            # Move package config
│       └── build/               # Compiled contract (auto-generated)
├── hooks/                        # Custom React hooks
│   └── useContract.ts           # Hook for contract interaction
├── lib/                          # Utilities
│   └── config.ts                # Configuration (PACKAGE_ID, network, etc.)
├── scripts/                      # Scripts
│   ├── iota-deploy-wrapper.js   # Contract deployment script
│   └── iota-generate-prompt-wrapper.js
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
└── package.json                 # Dependencies
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Run dev server

# Build
npm run build        # Build for production
npm run start        # Run production server

# Smart Contract
npm run iota-deploy  # Deploy contract to IOTA network

# Linting
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Error: "Cannot find module @iota/dapp-kit"
```bash
npm install --legacy-peer-deps
```

### Error: "Package not deployed" or transaction fails
- Make sure you've run `npm run iota-deploy`
- Check if `PACKAGE_ID` in `lib/config.ts` is correct
- Verify you're connected to the correct network (devnet)

### Error: "Insufficient gas" or transaction rejected
- Ensure your wallet has enough IOTA test tokens
- Get test tokens from [IOTA Devnet Faucet](https://faucet.devnet.iota.cafe/)

### Guess is incorrect but you're sure it's right
- Double-check the answer: **10, 20, 30, 40** (not 7, 13, 42, 99)
- Make sure the number order is correct
- Verify the GuessBox ID is accurate

## 💡 Hints

The answer consists of 4 special numbers:
- 🔢 Nice round numbers
- 📊 Following an increasing pattern
- 🎯 Within the range 0-255
- 🔐 Encoded as: `x"0a0014001e002800"`

**Answer**: [10, 20, 30, 40] 😉

## 🔐 Security

- ✅ Smart contract written in Move - a resource-safe language
- ✅ Answer is encoded in bytecode, not easily readable
- ✅ Uses BCS serialization for validation
- ✅ No backdoors or admin functions
- ⚠️ This is a demo dApp on testnet, not for production use

## 📚 References

- [IOTA Documentation](https://docs.iota.org)
- [Move Language Book](https://move-language.github.io/move/)
- [IOTA dApp Kit](https://sdk.mystenlabs.com/dapp-kit)
- [Next.js Documentation](https://nextjs.org/docs)

## 📝 License

MIT License - See LICENSE file for more details

## 👨‍💻 Development

This project was created as a demo to learn how to build dApps on the IOTA blockchain.

---

**Have fun playing!** 🎮🎉
#





