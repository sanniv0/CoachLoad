# Coach-Load

A React + Vite web application that displays real-time train coach occupancy data to help passengers identify less crowded coaches and make informed boarding decisions.

## 🚀 Live Demo & Deployment

The application is officially live! You can access it here:
🔗 **[Coach-Load Live App](https://coachload-683212038528.us-central1.run.app/)**

This project was brought to life using **Google Cloud**. I utilized the **Google Cloud Console** to manage the infrastructure and deploy the application via **Cloud Run**, ensuring it is accessible to users everywhere.

## Features

- **Live Density Indicators** - Visual color-coded display of coach load percentages with high-contrast status icons.
  - 🔴 Red (X): Full (80%+)
  - 🟡 Yellow (!): Standing Room (40-79%)
  - 🟢 Green (✓): Seats Available (<40%)
- **Platform Guidance** - Intelligent recommendations for optimal boarding position using a personalized guidance engine.
- **Gemini AI Smart Insights** - AI-powered suggestions integrated with **Vertex AI** concepts to provide predictive occupancy trends.
- **Google Maps Integration** - Visual platform map providing real-world context for user positioning.
- **Train Selection** - Switch between different trains (e.g., Shatabdi, Rajdhani) to view live occupancy.
- **Accessibility First** - Fully keyboard-navigable, WCAG compliant ARIA labels, and high-contrast visuals.

## Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS 4
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library
- **Deployment**: Google Cloud Run
- **Cloud Services**: Google Cloud Console, Google Maps (Static), Gemini AI (Simulated)

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

### Testing

Run the automated test suite (Unit & Component tests):

```bash
npm run test
```

### Build

```bash
npm run build
```

Production build output in `dist/` folder

## Project Structure

```
├── src/
│   ├── __tests__/     # Automated Test Suite (Vitest)
│   ├── utils/         # Core business logic & helpers
│   ├── App.jsx        # Main application component
│   ├── App.css        # Application styles
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
├── public/            # Public assets
├── index.html         # HTML template with Google Fonts
├── package.json       # Dependencies & Scripts
├── vitest.config.js   # Testing configuration
└── vite.config.js     # Vite configuration
```

## How It Works

1. **Coach Load Display** - Shows each coach with its current occupancy percentage, status markers, and accessible descriptions.
2. **User Position** - Interactive platform mapping that allows users to simulate their current position.
3. **Guidance Engine** - A logic layer that calculates the nearest available coach and provides directional walking distances.
4. **AI Insights** - Leverages historical travel patterns to suggest the best coach for the entire journey.

## Note

This is an MVP demo. In a production environment, coach occupancy would be live-fetched via official IRCTC/Railways APIs and user position would be determined via device GPS mapping to platform zones.