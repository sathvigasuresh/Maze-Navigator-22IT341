/**
 * DFS Visualizer View
 * Depth-First Search with Stack Simulation (LIFO), Dead-End Detection, and Backtracking.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useState, useEffect, useRef } from 'react';
import { Grid, Point, DfsStep } from '../types/maze';
import { runDfsSimulation, DfsRunResult } from '../algorithms/dfs';
import { MazeGrid } from '../components/MazeGrid';
import { StackVisualizer } from '../components/StackVisualizer';
import { PlaybackControls } from '../components/PlaybackControls';
import { Layers, ArrowRight, CornerDownRight, CheckCircle2, AlertTriangle, Code2 } from 'lucide-react';

interface DfsVisualizerViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
}

export const DfsVisualizerView: React.FC<DfsVisualizerViewProps> = ({
  grid,
  start,
  dest
}) => {
  const [simulationResult, setSimulationResult] = useState<DfsRunResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute DFS steps whenever grid, start, or dest changes
  useEffect(() => {
    const res = runDfsSimulation(grid, start, dest);
    setSimulationResult(res);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [grid, start, dest]);

  // Handle Playback Interval
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (!simulationResult) return 0;
          if (prev >= simulationResult.steps.length - 1) {
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
  }, [isPlaying, speedMs, simulationResult]);

  const steps = simulationResult?.steps || [];
  const currentStep: DfsStep | undefined = steps[currentStepIndex];

  const handlePlay = () => {
    if (steps.length === 0) return;
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleSliderChange = (step: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(step);
  };

  // Find all dead-end points encountered up to the current step
  const deadEndPoints: Point[] = [];
  for (let i = 0; i <= currentStepIndex && i < steps.length; i++) {
    if (steps[i].type === 'deadend') {
      deadEndPoints.push(steps[i].current);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner and Algorithm Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            DATA STRUCTURE: STACK (LAST-IN, FIRST-OUT)
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Depth-First Search (DFS) Visualizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Explores as deep as possible along each branch before backtracking via Stack pop.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Stack Depth: </span>
            <span className="text-cyan-300 font-bold">
              {currentStep ? currentStep.stackSnapshot.length : 0}
            </span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Forward Moves: </span>
            <span className="text-emerald-300 font-bold">
              {currentStep ? currentStep.forwardMoves : 0}
            </span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Backtracks: </span>
            <span className="text-rose-300 font-bold">
              {currentStep ? currentStep.backtrackMoves : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Playback Controls Bar */}
      <PlaybackControls
        isPlaying={isPlaying}
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        speed={speedMs}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onReset={handleReset}
        onSpeedChange={setSpeedMs}
        onStepSliderChange={handleSliderChange}
      />

      {/* Main Two-Zone Sandbox Area: Maze on Left, Stack on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Maze Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-x-auto min-h-[460px]">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              activePoint={currentStep?.current || null}
              visitedMap={currentStep?.visitedSnapshot}
              pathPoints={currentStep?.pathSnapshot || []}
              deadEndPoints={deadEndPoints}
              showCoordinates={true}
            />
          </div>

          {/* Explanation Step Log Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">
                Current Algorithmic Step
              </span>
              <span className="font-mono text-cyan-400">
                Action: {currentStep?.type.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-slate-200 font-medium">
              {currentStep?.description || 'Ready to run DFS simulation.'}
            </p>

            {currentStep?.cCodeExplanation && (
              <div className="mt-2 bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-cyan-300">
                <span className="text-slate-500 text-[10px] block mb-1">C99 Stack Operation:</span>
                <code>{currentStep.cCodeExplanation}</code>
              </div>
            )}
          </div>
        </div>

        {/* Right: Stack Structure Visualizer (5 cols) */}
        <div className="lg:col-span-5">
          <StackVisualizer
            stack={currentStep?.stackSnapshot || []}
            lastAction={currentStep?.type === 'deadend' ? 'deadend' : currentStep?.type === 'push' ? 'push' : 'pop'}
            currentCell={currentStep?.current || null}
          />
        </div>
      </div>
    </div>
  );
};
