/**
 * Dashboard View
 * High-level project overview, academic details, architecture cards, and quick jump points.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React from 'react';
import { ActiveTab, Point, Grid } from '../types/maze';
import { MazeGrid } from '../components/MazeGrid';
import { PRESET_MAZES, buildGridFromPreset } from '../algorithms/presets';
import {
  Layers,
  ListFilter,
  Network,
  Split,
  BarChart3,
  Edit3,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: ActiveTab) => void;
  grid: Grid;
  start: Point;
  dest: Point;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  grid,
  start,
  dest
}) => {
  const classicPreset = PRESET_MAZES[0];
  const sampleGrid = buildGridFromPreset(classicPreset);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0B1528] to-[#080D1A] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
            22IT341 DATA STRUCTURES · TCE IT PROJECT
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            MAZE NAVIGATOR – Data Structures &amp; Algorithms Visualizer
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            An interactive educational visualizer demonstrating <span className="text-cyan-300 font-medium">Stack (LIFO)</span>,{' '}
            <span className="text-cyan-300 font-medium">Circular Queue (FIFO)</span>,{' '}
            <span className="text-cyan-300 font-medium">DFS &amp; BFS Graph Traversals</span>,{' '}
            <span className="text-cyan-300 font-medium">Singly Linked List Path Storage</span>, and algorithmic efficiency comparisons.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dfs')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <span>Explore DFS Stack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bfs')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-cyan-200 bg-cyan-950/60 border border-cyan-800 hover:bg-cyan-900/60 rounded-xl transition-all flex items-center gap-2"
            >
              <span>Explore BFS Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('editor')}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-slate-400" />
              <span>Open Maze Editor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Academic Credits & Project Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 font-medium mb-1">Institution &amp; Department</div>
          <div className="text-sm font-bold text-white">Thiagarajar College of Engineering</div>
          <div className="text-xs text-cyan-400 mt-1 font-medium">Department of Information Technology</div>
          <div className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800/80">
            Autonomous Institution · Affiliated to Anna University · Madurai
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 font-medium mb-1">Course &amp; Project</div>
          <div className="text-sm font-bold text-white">22IT341 Data Structures</div>
          <div className="text-xs text-slate-300 mt-1">Project: Maze Navigation System</div>
          <div className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span>Team Size: 7 Students</span>
            <span className="text-cyan-400 font-mono">Lead: Sathviga &amp; Team</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
          <div className="text-xs text-slate-400 font-medium mb-1">C99 Architecture Scope</div>
          <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Educational Visualizer</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Models the data structures and algorithms of the accompanying C99 terminal project for intuitive conceptual exploration.
          </p>
        </div>
      </div>

      {/* 4 Core Data Structure Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Data Structures &amp; Algorithms Modules
            </h2>
            <p className="text-xs text-slate-400">
              Interactive implementations matching the 22IT341 curriculum
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: DFS Stack */}
          <div
            onClick={() => onNavigate('dfs')}
            className="group bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                DFS – Stack Visualizer
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Demonstrates LIFO stack push &amp; pop operations, path exploration, dead-end detection, and recursive backtracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>Launch Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: BFS Queue */}
          <div
            onClick={() => onNavigate('bfs')}
            className="group bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center mb-3 text-blue-400 group-hover:scale-105 transition-transform">
                <ListFilter className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                BFS – Queue Visualizer
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Simulates a modulo-based Circular Queue with front and rear pointers, level-order wavefront, and FIFO processing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>Launch Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Shortest Path */}
          <div
            onClick={() => onNavigate('shortest')}
            className="group bg-[#0F172A] border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Shortest Path Reconstruction
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Traces predecessor parent pointers back from destination to start, proving BFS path optimality in unweighted grids.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>Trace Path</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Singly Linked List */}
          <div
            onClick={() => onNavigate('linkedlist')}
            className="group bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800/50 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center mb-3 text-emerald-400 group-hover:scale-105 transition-transform">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Linked List Path
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Represents solution path coordinates as dynamic singly linked list nodes with insertEnd and deleteLast operations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>Inspect Nodes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Preview Strip */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Split className="w-4 h-4" />
            <span>ALGORITHMIC TRADEOFF ANALYSIS</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            DFS vs. BFS Performance Comparison
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Run both algorithms concurrently on identical maze geometries to evaluate path length, nodes visited, maximum memory depth, and CPU execution time.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('comparison')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>View Side-by-Side Comparison</span>
        </button>
      </div>
    </div>
  );
};
