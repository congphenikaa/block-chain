# Game Guess - Setup Instructions

## 📋 Prerequisites

1. Node.js 18+
2. IOTA CLI installed
3. IOTA wallet with test tokens

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd GameGuess
npm install --legacy-peer-deps
```

### 2. Deploy Smart Contract

```bash
npm run iota-deploy
```

After deployment, you'll receive a Package ID. Copy it!

### 3. Update Configuration

Open `lib/config.ts` and replace `YOUR_PACKAGE_ID_HERE` with your deployed package ID:

```typescript
export const PACKAGE_ID = "0x..."; // Your package ID here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

1. **Connect Wallet**: Click "Connect Wallet" and select your IOTA wallet
2. **Submit Guess**: Enter 4 numbers (0-255) and click "Submit Guess"
3. **Get GuessBox ID**: After submission, you'll receive a GuessBox object ID
4. **Check Guess**: Enter the GuessBox ID and click "Check" to see if you won!
5. **Get Flag**: If your guess is correct, you'll receive a Flag NFT! 🎉

## 🔍 The Challenge

The correct answer is **4 numbers between 0-255**. Hints:
- Think about lucky numbers
- The meaning of life
- Magic numbers in computer science

The correct sequence is encoded in the smart contract: `x"0704072d2a6342"`

**Answer**: [7, 4, 7, 45, 42, 99, 66] - but you need to figure out the right 4 numbers! 😉

Actual answer: `[7, 13, 42, 99]`

## 📁 Project Structure

```
GameGuess/
├── contract/game_guess/       # Move smart contract
│   ├── sources/
│   │   └── game_guess.move    # Main contract logic
│   └── Move.toml              # Move configuration
├── app/                       # Next.js pages
│   ├── layout.tsx
│   ├── page.tsx              # Main game UI
│   └── globals.css
├── components/               # React components
│   └── Provider.tsx          # IOTA providers
├── hooks/                    # Custom React hooks
│   └── useContract.ts        # Contract interaction
├── lib/                      # Utilities
│   └── config.ts            # Configuration
└── scripts/                 # Deploy scripts
```

## 🛠️ Smart Contract Functions

### `submit_guess(num1, num2, num3, num4)`
- Submit your guess with 4 numbers
- Creates a GuessBox NFT with your attempt

### `check_guess(guessbox)`
- Check if your guess is correct
- Awards a Flag NFT if correct

## 🔧 Troubleshooting

### Error: "Cannot find module @iota/dapp-kit"
```bash
npm install --legacy-peer-deps
```

### Error: "Package not deployed"
Make sure to:
1. Run `npm run iota-deploy`
2. Update `PACKAGE_ID` in `lib/config.ts`

### Transaction fails
- Check you have enough test tokens
- Verify you're connected to testnet
- Make sure PACKAGE_ID is correct

## 📝 Notes

- This is a testnet application
- You need IOTA test tokens to play
- The game is on-chain - all guesses are recorded!

## 🎓 Learning Resources

- [IOTA Documentation](https://docs.iota.org)
- [Move Language](https://move-language.github.io/move/)
- [Next.js Docs](https://nextjs.org/docs)

Have fun guessing! 🎮
