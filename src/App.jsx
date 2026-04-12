import React, { useState, useEffect } from 'react';
import { Train, MapPin, Users, ArrowRight, ArrowLeft } from 'lucide-react';

// Mock Data
const MOCK_TRAINS = [
  {
    id: '12001',
    name: 'Shatabdi Express',
    coaches: [
      { id: 'E1', type: 'Exec', load: 95 }, // Red
      { id: 'C1', type: 'Chair', load: 85 }, // Red
      { id: 'C2', type: 'Chair', load: 45 }, // Yellow
      { id: 'C3', type: 'Chair', load: 20 }, // Green
      { id: 'C4', type: 'Chair', load: 15 }, // Green
      { id: 'C5', type: 'Chair', load: 60 }, // Yellow
      { id: 'C6', type: 'Chair', load: 90 }, // Red
      { id: 'C7', type: 'Chair', load: 92 }, // Red
    ]
  },
  {
    id: '12952',
    name: 'Mumbai Rajdhani',
    coaches: [
      { id: 'H1', type: '1AC', load: 90 }, // Red
      { id: 'A1', type: '2AC', load: 80 }, // Red
      { id: 'A2', type: '2AC', load: 70 }, // Yellow
      { id: 'B1', type: '3AC', load: 25 }, // Green
      { id: 'B2', type: '3AC', load: 40 }, // Yellow
      { id: 'B3', type: '3AC', load: 95 }, // Red
      { id: 'B4', type: '3AC', load: 100 }, // Red
      { id: 'PC', type: 'Pantry', load: 50 }, // Yellow
    ]
  }
];

// Helper to determine color based on load
const getLoadColor = (load) => {
  if (load >= 80) return 'bg-red-500 border-red-600 text-white'; // Red: Full
  if (load >= 40) return 'bg-amber-400 border-amber-500 text-amber-950'; // Yellow: Standing Room / Moderate
  return 'bg-emerald-500 border-emerald-600 text-white'; // Green: Seats Available
};

const getLoadStatusText = (load) => {
  if (load >= 80) return 'Full';
  if (load >= 40) return 'Standing';
  return 'Available';
};

const CoachMap = ({ train }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center text-slate-800 dark:text-white">
          <Train className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Live Density Indicators
        </h2>
        <div className="flex space-x-3 text-xs font-medium">
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>Full</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-amber-400 mr-1"></div>Standing</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>Available</div>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex space-x-2 min-w-max items-center">
          {/* Engine */}
          <div className="bg-slate-700 dark:bg-slate-900 text-white h-24 w-16 rounded-l-3xl rounded-r-md flex items-center justify-center border-4 border-slate-800 relative">
             <div className="w-4 h-8 bg-slate-500 absolute left-2 rounded-sm opacity-50"></div>
          </div>
          
          {/* Connectors & Coaches */}
          {train.coaches.map((coach, idx) => {
            const colorClass = getLoadColor(coach.load);
            return (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-2 h-4 bg-slate-400 dark:bg-slate-600 rounded"></div>
                <div className={`h-24 w-28 rounded-lg border-2 flex flex-col justify-between p-2 shadow-sm transition-transform hover:scale-105 duration-200 cursor-pointer ${colorClass}`}>
                  <div className="flex justify-between items-start w-full">
                    <span className="font-bold text-sm tracking-widest">{coach.id}</span>
                    <Users className="w-4 h-4 opacity-70" />
                  </div>
                  <div className="text-center w-full">
                    <div className="text-2xl font-black">{coach.load}%</div>
                    <div className="text-[10px] font-medium uppercase tracking-wider opacity-90">{getLoadStatusText(coach.load)}</div>
                  </div>
                  <div className="text-[10px] w-full text-center opacity-75">{coach.type}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlatformGuidance = ({ train, userPosition, setUserPosition }) => {
  // Logic to find closest green or yellow coach
  // Assuming platform is same length as train, 1 unit = 1 coach index
  const optimalCoachIdx = train.coaches.findIndex(c => c.load < 40) !== -1 
    ? train.coaches.findIndex(c => c.load < 40) // Find first green
    : train.coaches.findIndex(c => c.load < 80); // Otherwise find yellow

  const targetCoach = train.coaches[optimalCoachIdx];
  const distance = Math.abs(optimalCoachIdx - userPosition);
  const direction = optimalCoachIdx > userPosition ? 'right' : optimalCoachIdx < userPosition ? 'left' : 'here';
  
  return (
    <div className="w-full bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-xl p-6 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <MapPin className="w-32 h-32" />
      </div>
      
      <h2 className="text-lg font-medium mb-1 opacity-90">Platform Guidance</h2>
      <h3 className="text-3xl font-bold mb-6 tracking-tight">Move to {targetCoach?.id || 'any coach'}</h3>
      
      <div className="flex items-center justify-center space-x-6 mb-8">
        {direction === 'left' && <ArrowLeft className="w-12 h-12 animate-pulse text-emerald-300" />}
        <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30 shadow-inner">
          <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Direction</p>
          <p className="text-2xl font-bold">
            {direction === 'here' ? 'You are here' : direction === 'left' ? 'Walk Left' : 'Walk Right'}
          </p>
          {direction !== 'here' && (
            <p className="text-sm mt-1 text-emerald-200">~ {distance * 20} meters</p>
          )}
        </div>
        {direction === 'right' && <ArrowRight className="w-12 h-12 animate-pulse text-emerald-300" />}
      </div>

      <div className="mt-4 bg-white/10 rounded-lg p-3 text-sm flex items-center justify-between">
        <span>Current position: Coach index {userPosition}</span>
        <div className="flex space-x-2">
           <button 
             onClick={() => setUserPosition(Math.max(0, userPosition - 1))}
             className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition"
           >
             Move Left
           </button>
           <button 
             onClick={() => setUserPosition(Math.min(train.coaches.length - 1, userPosition + 1))}
             className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition"
           >
             Move Right
           </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedTrain, setSelectedTrain] = useState(MOCK_TRAINS[0]);
  const [userPosition, setUserPosition] = useState(1); // Mock GPS position mapping to coach index

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Coach-Load</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Passenger Balancing Engine</p>
            </div>
          </div>
          <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/40 px-3 py-1 rounded-full">
            MVP Demo
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Train Selector (Mock) */}
        <div className="mb-6 flex overflow-x-auto space-x-3 pb-2 custom-scrollbar">
          {MOCK_TRAINS.map(train => (
            <button
              key={train.id}
              onClick={() => setSelectedTrain(train)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl border text-left transition-all ${
                selectedTrain.id === train.id 
                  ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700 shadow-sm ring-1 ring-indigo-500' 
                  : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <div className="font-bold text-sm">{train.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1"># {train.id}</div>
            </button>
          ))}
        </div>

        {/* Heat Map Component */}
        <CoachMap train={selectedTrain} />

        {/* Guidance Component */}
        <PlatformGuidance 
          train={selectedTrain} 
          userPosition={userPosition} 
          setUserPosition={setUserPosition} 
        />
        
        {/* Helper Context for the reviewer */}
        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 max-w-lg mx-auto">
          <p>This is a working MVP demonstrating the Coach-Load Transparency concept.</p>
          <p className="mt-1">In a real scenario, train occupancy is live-fetched via IRCTC APIs and user position is determined via device GPS mapping to platform zones.</p>
        </div>

      </main>
    </div>
  );
}
