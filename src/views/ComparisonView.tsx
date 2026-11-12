/**
 * DFS vs BFS Comparison View
 * Side-by-side simultaneous execution, dual visualizers, and direct algorithmic benchmarks.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Grid, Point } from '../types/maze';
import { runDfsSimulation } from '../algorithms/dfs';
import { runBfsSimulation } from '../algorithms/bfs';
import { MazeGrid } from '../components/MazeGrid';
import { PlaybackControls } from '../components/PlaybackControls';
import {
  Split,
  Layers,
  ListFilter,
  CheckCircle2,
  Clock,
  HardDrive,
  Maximize2,
  HelpCircle
} from 'lucide-react';

interface ComparisonViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  grid,
  start,
  dest
}) => {
  const dfsResult = useMemo(() => runDfsSimulation(grid, start, dest), [grid, start, dest]);
  const bfsResult = useMemo(() => runBfsSimulation(grid, start, dest), [grid, start, dest]);

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const maxSteps = Math.max(dfsResult.steps.length, bfsResult.steps.length);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [grid, start, dest]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, maxSteps]);

  // Current steps clamped
  const dfsCurrentStep = dfsResult.steps[Math.min(stepIndex, dfsResult.steps.length - 1)];
  const bfsCurrentStep = bfsResult.steps[Math.min(stepIndex, bfsResult.steps.length - 1)];

  // Dead ends for DFS up to step
  const dfsDeadEnds: Point[] = [];
  for (let i = 0; i <= stepIndex && i < dfsResult.steps.length; i++) {
    if (dfsResult.steps[i].type === 'deadend') {
      dfsDeadEnds.push(dfsResult.steps[i].current);
    }
  }

  const isDfsFinished = stepIndex >= dfsResult.steps.length - 1;
  const isBfsFinished = stepIndex >= bfsResult.steps.length - 1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            CONCURRENT BENCHMARK: 22IT341 LABORATORY
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Split className="w-5 h-5 text-cyan-400" />
            <span>DFS vs. BFS Side-by-Side Comparison</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Observe the fundamental trade-off: Depth-First Search exploration vs. Breadth-First Search level-order optimality.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Total Steps:</span>
          <span className="text-cyan-300 font-bold">{maxSteps} cycles</span>
        </div>
      </div>

      {/* Synchronized Dual Playback Controls */}
      <PlaybackControls
        isPlaying={isPlaying}
        currentStep={stepIndex}
        totalSteps={maxSteps}
        speed={speedMs}
        onPlay={() => {
          if (stepIndex >= maxSteps - 1) setStepIndex(0);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onStepForward={() => {
          if (stepIndex < maxSteps - 1) setStepIndex(prev => prev + 1);
        }}
        onReset={() => {
          setIsPlaying(false);
          setStepIndex(0);
        }}
        onSpeedChange={setSpeedMs}
        onStepSliderChange={(step) => {
          setIsPlaying(false);
          setStepIndex(step);
        }}
      />

      {/* Side-by-Side Dual Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: DFS Visualizer */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                DFS (Stack – LIFO)
              </h3>
            </div>
            <span className={`text-xs font-mono font-semibold ${isDfsFinished ? 'text-emerald-400' : 'text-cyan-300'}`}>
              {isDfsFinished ? 'Completed' : `Cycle ${Math.min(stepIndex + 1, dfsResult.steps.length)} / ${dfsResult.steps.length}`}
            </span>
          </div>

          <div className="flex justify-center overflow-x-auto py-2">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              activePoint={dfsCurrentStep?.current}
              visitedMap={dfsCurrentStep?.visitedSnapshot}
              pathPoints={dfsCurrentStep?.pathSnapshot || []}
              deadEndPoints={dfsDeadEnds}
              showCoordinates={false}
            />
          </div>

          {/* DFS Live Snapshot Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Current Cell:</span>
              <span className="text-cyan-300">({dfsCurrentStep?.current.row}, {dfsCurrentStep?.current.col})</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Stack Depth:</span>
              <span className="text-cyan-300">{dfsCurrentStep?.stackSnapshot.length ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Backtracks:</span>
              <span className="text-rose-400 font-bold">{dfsCurrentStep?.backtrackMoves ?? 0}</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              {dfsCurrentStep?.description}
            </div>
          </div>
        </div>

        {/* Right Side: BFS Visualizer */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">
                BFS (Circular Queue – FIFO)
              </h3>
            </div>
            <span className={`text-xs font-mono font-semibold ${isBfsFinished ? 'text-emerald-400' : 'text-blue-300'}`}>
              {isBfsFinished ? 'Completed' : `Cycle ${Math.min(stepIndex + 1, bfsResult.steps.length)} / ${bfsResult.steps.length}`}
            </span>
          </div>

          <div className="flex justify-center overflow-x-auto py-2">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              activePoint={bfsCurrentStep?.current}
              visitedMap={bfsCurrentStep?.visitedSnapshot}
              queuePoints={bfsCurrentStep?.queueSnapshot || []}
              shortestPathPoints={isBfsFinished ? bfsResult.finalShortestPath : []}
              showCoordinates={false}
            />
          </div>

          {/* BFS Live Snapshot Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Active Node:</span>
              <span className="text-blue-300">({bfsCurrentStep?.current.row}, {bfsCurrentStep?.current.col})</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Queue Buffer:</span>
              <span className="text-blue-300">{bfsCurrentStep?.queueSnapshot.length ?? 0} items</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Backtracks:</span>
              <span className="text-emerald-400 font-bold">0 (None needed)</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              {bfsCurrentStep?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Result Card Scoreboard */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-4">
          Comparative Empirical Scorecard
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">PATH FOUND</div>
            <div className="text-emerald-400 font-bold mt-1">
              DFS: {dfsResult.stats.pathFound ? 'YES' : 'NO'}
            </div>
            <div className="text-emerald-400 font-bold">
              BFS: {bfsResult.stats.pathFound ? 'YES' : 'NO'}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">PATH LENGTH</div>
            <div className="text-slate-300 mt-1">
              DFS: {dfsResult.stats.pathLength}
            </div>
            <div className="text-amber-400 font-bold">
              BFS: {bfsResult.stats.pathLength} (Min)
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">CELLS VISITED</div>
            <div className="text-cyan-300 mt-1">
              DFS: {dfsResult.stats.cellsVisited}
            </div>
            <div className="text-blue-300">
              BFS: {bfsResult.stats.cellsVisited}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">BACKTRACKS</div>
            <div className="text-rose-400 font-bold mt-1">
              DFS: {dfsResult.stats.backtrackMoves}
            </div>
            <div className="text-emerald-400 font-bold">
              BFS: 0
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">MAX MEMORY</div>
            <div className="text-cyan-300 mt-1">
              DFS: {dfsResult.stats.maxMemorySize}
            </div>
            <div className="text-blue-300">
              BFS: {bfsResult.stats.maxMemorySize}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-500 text-[10px]">EXECUTION TIME</div>
            <div className="text-slate-300 mt-1">
              DFS: {dfsResult.stats.executionTimeMs} ms
            </div>
            <div className="text-slate-300">
              BFS: {bfsResult.stats.executionTimeMs} ms
            </div>
          </div>
        </div>
      </div>

      {/* Academic Theoretical Insights (TCE 22IT341 Exam Focus) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-2">
          <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
            <span>When to prefer DFS (Stack LIFO):</span>
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
            <li>Lower auxiliary memory overhead <span className="font-mono text-cyan-400">O(d)</span> proportional strictly to search depth rather than branching factor.</li>
            <li>Memory-efficient for deep, narrow decision trees where any viable solution is acceptable.</li>
            <li>Directly implementable using compiler call-stack recursion or a small fixed-size C array stack.</li>
          </ul>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-2">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
            <span>When to prefer BFS (Queue FIFO):</span>
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
            <li>Guarantees the global minimum shortest path in unweighted graphs or uniform-cost grid steps.</li>
            <li>Zero backtracking overhead: never gets trapped inside deep dead-end corridors.</li>
            <li>Requires higher memory <span className="font-mono text-blue-400">O(w)</span> to buffer the entire frontier level simultaneously.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
