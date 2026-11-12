/**
 * MAZE NAVIGATOR – Data Structures and Algorithms Visualizer
 * Course: 22IT341 Data Structures
 * Institution: Thiagarajar College of Engineering
 * Department: Information Technology
 * Project: Maze Navigation
 * Team Size: 7 Students (Lead: Sathviga & Collaborators)
 */

import React, { useState } from 'react';
import { ActiveTab, Grid, Point, PresetMaze } from './types/maze';
import { PRESET_MAZES, buildGridFromPreset } from './algorithms/presets';
import { Header } from './components/Header';
import { AcademicBanner } from './components/AcademicBanner';
import { CSourceDrawer } from './components/CSourceDrawer';
import { DashboardView } from './views/DashboardView';
import { MazeEditorView } from './views/MazeEditorView';
import { DfsVisualizerView } from './views/DfsVisualizerView';
import { BfsVisualizerView } from './views/BfsVisualizerView';
import { ShortestPathView } from './views/ShortestPathView';
import { LinkedListView } from './views/LinkedListView';
import { StatisticsView } from './views/StatisticsView';
import { ComparisonView } from './views/ComparisonView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isCCodeOpen, setIsCCodeOpen] = useState<boolean>(false);

  // Initialize with the Classic Labyrinth preset
  const [currentPreset, setCurrentPreset] = useState<PresetMaze>(PRESET_MAZES[0]);
  const [mazeData, setMazeData] = useState<{
    grid: Grid;
    start: Point;
    dest: Point;
  }>(() => buildGridFromPreset(PRESET_MAZES[0]));

  const handleUpdateGrid = (newGrid: Grid, newStart?: Point, newDest?: Point) => {
    setMazeData({
      grid: newGrid,
      start: newStart ?? mazeData.start,
      dest: newDest ?? mazeData.dest
    });
  };

  const handleSelectPreset = (preset: PresetMaze) => {
    setCurrentPreset(preset);
    const built = buildGridFromPreset(preset);
    setMazeData(built);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Academic Context Banner */}
      <AcademicBanner />

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenCCode={() => setIsCCodeOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={setActiveTab}
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'editor' && (
          <MazeEditorView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
            onUpdateGrid={handleUpdateGrid}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'dfs' && (
          <DfsVisualizerView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'bfs' && (
          <BfsVisualizerView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'shortest' && (
          <ShortestPathView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'linkedlist' && (
          <LinkedListView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'statistics' && (
          <StatisticsView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}

        {activeTab === 'comparison' && (
          <ComparisonView
            grid={mazeData.grid}
            start={mazeData.start}
            dest={mazeData.dest}
          />
        )}
      </main>

      {/* C99 Reference Implementation Drawer */}
      <CSourceDrawer
        isOpen={isCCodeOpen}
        onClose={() => setIsCCodeOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full bg-[#080D1A] border-t border-slate-800/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-slate-400">MAZE NAVIGATOR</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Thiagarajar College of Engineering</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Department of Information Technology</span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-500 font-mono">
            Course 22IT341 · Educational Visualizer for C99 Project · Team of 7
          </div>
        </div>
      </footer>
    </div>
  );
}
