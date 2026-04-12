# Coach-Load

A React + Vite web application that displays real-time train coach occupancy data to help passengers identify less crowded coaches and make informed boarding decisions.

## Features

- **Live Density Indicators** - Visual color-coded display of coach load percentages
  - 🔴 Red: Full (80%+)
  - 🟡 Yellow: Standing Room (40-79%)
  - 🟢 Green: Seats Available (<40%)
- **Platform Guidance** - Intelligent recommendations for optimal boarding position
- **Train Selection** - Switch between different trains to view coach loads
- **Dark Mode Support** - Automatic theme adaptation

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`

### Build

```bash
npm run build
```

Production build output in `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── src/
│   ├── App.jsx        # Main application component
│   ├── App.css        # Application styles
│   ├── index.css      # Global styles
│   ├── main.jsx       # Entry point
│   └── assets/        # Static assets
├── public/            # Public assets
├── dist/              # Production build
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── postcss.config.js  # PostCSS configuration
```

## How It Works

1. **Coach Load Display** - Shows each coach with its current occupancy percentage and status
2. **User Position** - Mock GPS position to simulate user's location on the platform
3. **Guidance Engine** - Calculates the nearest coach with available seats and provides walking directions

## Note

This is an MVP demo with mock data. In production, coach occupancy would be live-fetched via IRCTC APIs and user position would be determined via device GPS mapping to platform zones.