/**
 * Statistics View
 * Deep performance analytics, memory footprints, step distributions, and efficiency metrics.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useMemo } from 'react';
import { Grid, Point } from '../types/maze';
import { runDfsSimulation } from '../algorithms/dfs';
import { runBfsSimulation } from '../algorithms/bfs';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ListFilter,
  CornerDownRight,
  TrendingUp,
  Cpu,
  HardDrive
} from 'lucide-react';

interface StatisticsViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  grid,
  start,
  dest
}) => {
  const dfsResult = useMemo(() => runDfsSimulation(grid, start, dest), [grid, start, dest]);
  const bfsResult = useMemo(() => runBfsSimulation(grid, start, dest), [grid, start, dest]);

  const dfsStats = dfsResult.stats;
  const bfsStats = bfsResult.stats;

  const totalGridCells = grid.length * grid[0].length;
  let wallCount = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell === 'wall') wallCount++;
    }
  }
  const passableCells = totalGridCells - wallCount;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            PROJECT EVALUATION: 22IT341 DATA STRUCTURES
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Algorithm Statistics &amp; Performance Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Empirical runtime data collected directly from current maze topology.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Grid: {grid.length}&times;{grid[0].length} ({passableCells} passable, {wallCount} obstacles)
        </div>
      </div>

      {/* Primary KPI Metric Cards (8 key metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: Cells Visited */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs font-medium mb-1">Cells Visited</div>
          <div className="flex items-baseline justify-between">
            <div className="text-lg sm:text-2xl font-bold font-mono text-white tabular-nums">
              {dfsStats.cellsVisited} <span className="text-xs text-cyan-400">DFS</span>
            </div>
            <div className="text-xs font-mono text-blue-400 tabular-nums">
              {bfsStats.cellsVisited} BFS
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            of {passableCells} accessible cells ({Math.round((bfsStats.cellsVisited / passableCells) * 100)}% explored)
          </div>
        </div>

        {/* Metric 2: Path Length */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs font-medium mb-1">Path Length</div>
          <div className="flex items-baseline justify-between">
            <div className="text-lg sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {bfsStats.pathLength} <span className="text-xs text-amber-300">Optimal</span>
            </div>
            <div className="text-xs font-mono text-slate-400 tabular-nums">
              {dfsStats.pathLength} DFS
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            BFS guarantees the global minimum steps
          </div>
        </div>

        {/* Metric 3: Backtracking Moves */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs font-medium mb-1">Backtracking Moves</div>
          <div className="flex items-baseline justify-between">
            <div className="text-lg sm:text-2xl font-bold font-mono text-rose-400 tabular-nums">
              {dfsStats.backtrackMoves}
            </div>
            <div className="text-xs font-mono text-emerald-400 tabular-nums">
              0 BFS
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Dead ends forced {dfsStats.backtrackMoves} stack pop operations
          </div>
        </div>

        {/* Metric 4: Max Memory Depth */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs font-medium mb-1">Max Data Structure Size</div>
          <div className="flex items-baseline justify-between">
            <div className="text-lg sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
              {dfsStats.maxMemorySize} <span className="text-xs text-cyan-400">Stack</span>
            </div>
            <div className="text-xs font-mono text-blue-400 tabular-nums">
              {bfsStats.maxMemorySize} Queue
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Peak elements in memory simultaneously
          </div>
        </div>
      </div>

      {/* Detailed Side-by-Side Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 bg-[#0B1120] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Full Statistical Metrics Comparison Table
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            TCE 22IT341 Laboratory Results
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Metric Parameter</th>
                <th className="py-3 px-4 text-cyan-400">DFS (Stack LIFO)</th>
                <th className="py-3 px-4 text-blue-400">BFS (Circular Queue FIFO)</th>
                <th className="py-3 px-4 text-slate-400">Algorithmic Consequence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Path Found</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">{dfsStats.pathFound ? 'YES' : 'NO'}</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">{bfsStats.pathFound ? 'YES' : 'NO'}</td>
                <td className="py-3 px-4 text-slate-400 font-sans">Both complete on finite graphs</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Solution Path Length</td>
                <td className="py-3 px-4 text-slate-200 tabular-nums">{dfsStats.pathLength} steps</td>
                <td className="py-3 px-4 text-amber-300 font-bold tabular-nums">{bfsStats.pathLength} steps (Optimal)</td>
                <td className="py-3 px-4 text-slate-400 font-sans">BFS minimizes edge traversal count</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Exploration (Cells Visited)</td>
                <td className="py-3 px-4 text-slate-200 tabular-nums">{dfsStats.cellsVisited}</td>
                <td className="py-3 px-4 text-slate-200 tabular-nums">{bfsStats.cellsVisited}</td>
                <td className="py-3 px-4 text-slate-400 font-sans">DFS dives deeply; BFS expands uniformly</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Forward Moves</td>
                <td className="py-3 px-4 text-emerald-400 tabular-nums">{dfsStats.forwardMoves}</td>
                <td className="py-3 px-4 text-emerald-400 tabular-nums">{bfsStats.forwardMoves}</td>
                <td className="py-3 px-4 text-slate-400 font-sans">Successful unvisited neighbor pushes / dequeues</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Backtracking Pops</td>
                <td className="py-3 px-4 text-rose-400 font-bold tabular-nums">{dfsStats.backtrackMoves}</td>
                <td className="py-3 px-4 text-slate-500 tabular-nums">0 (No Backtracking)</td>
                <td className="py-3 px-4 text-slate-400 font-sans">Queue exploration avoids manual retraction</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Dead Ends Trapped</td>
                <td className="py-3 px-4 text-rose-400 tabular-nums">{dfsStats.deadEndsEncountered}</td>
                <td className="py-3 px-4 text-slate-500 tabular-nums">0 (Absorbed by wavefront)</td>
                <td className="py-3 px-4 text-slate-400 font-sans">DFS hits cul-de-sacs and must rewind stack</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Peak Auxiliary Memory</td>
                <td className="py-3 px-4 text-cyan-300 tabular-nums">{dfsStats.maxMemorySize} Stack frames</td>
                <td className="py-3 px-4 text-blue-300 tabular-nums">{bfsStats.maxMemorySize} Queue items</td>
                <td className="py-3 px-4 text-slate-400 font-sans">O(d) depth vs O(w) branching breadth</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 text-slate-300 font-sans font-medium">Simulated Execution Time</td>
                <td className="py-3 px-4 text-slate-300 tabular-nums">{dfsStats.executionTimeMs} ms</td>
                <td className="py-3 px-4 text-slate-300 tabular-nums">{bfsStats.executionTimeMs} ms</td>
                <td className="py-3 px-4 text-slate-400 font-sans">Raw computation without visual delays</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
