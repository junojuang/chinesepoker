# 扑克牌游戏 - Poker Card Game

A mobile-friendly Vue.js web application for the poker card game where players draw 5 cards and receive rewards based on their total points.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Game Rules

- Draw 5 random cards from a deck
- J = 11 points, Q = 12 points, K = 13 points
- Total points determine the reward (yuan)
- Tap cards one by one to reveal them
- Rewards are based on the payout table (6-64 points)

## Technologies

- Vue 3 (Composition API)
- Vite
- Firebase Firestore (for leaderboard)
- CSS3 (Mobile-responsive design)

## Firebase Setup

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions on setting up Firebase for the leaderboard feature.

## Deployment

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for instructions on deploying to Vercel.

