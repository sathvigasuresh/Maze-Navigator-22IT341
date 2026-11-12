/**
 * Stack Visualizer Component (LIFO)
 * Models the C99 array-based Stack with Top of Stack pointer, Push & Pop animations,
 * and capacity metrics for DFS exploration and backtracking.
 */

import React from 'react';
import { Point } from '../types/maze';
import { Layers, ArrowRight, CornerDownRight } from 'lucide-react';

interface StackVisualizerProps {
  stack: Point[];
  maxCapacity?: number;
  lastAction?: 'push' | 'pop' | 'deadend' | 'init' | null;
  currentCell?: Point | null;
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({
  stack,
  maxCapacity = 64,
  lastAction,
  currentCell
}) => {
  const topIndex = stack.length - 1;

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">
            Call Stack (LIFO Buffer)
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Top Pointer: <span className="text-cyan-300 font-bold">{topIndex}</span> | Size: {stack.length}
        </div>
      </div>

      {/* Action Indicator Bar */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Operation:</span>
          {lastAction === 'push' && (
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" /> PUSH (Forward Step)
            </span>
          )}
          {lastAction === 'deadend' && (
            <span className="text-rose-400 font-mono font-semibold flex items-center gap-1">
              <CornerDownRight className="w-3.5 h-3.5" /> DEAD END &rarr; POP (Backtrack)
            </span>
          )}
          {lastAction === 'pop' && (
            <span className="text-amber-400 font-mono font-semibold flex items-center gap-1">
              POP from Top
            </span>
          )}
          {(!lastAction || lastAction === 'init') && (
            <span className="text-slate-400 font-mono">Ready</span>
          )}
        </div>
        {currentCell && (
          <div className="text-xs font-mono text-slate-300">
            Current: <span className="text-cyan-300 font-bold">({currentCell.row}, {currentCell.col})</span>
          </div>
        )}
      </div>

      {/* Stack Items Column (Vertical Container, Top at top or bottom) */}
      <div className="flex-1 bg-slate-950/70 border-2 border-dashed border-slate-800 rounded-xl p-3 flex flex-col-reverse justify-start overflow-y-auto max-h-[360px] gap-1.5 relative">
        {stack.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
            <span>[ STACK EMPTY ]</span>
            <span className="text-[11px] text-slate-600 mt-1">top = -1</span>
          </div>
        ) : (
          stack.map((pt, idx) => {
            const isTop = idx === topIndex;
            return (
              <div
                key={`stack-item-${idx}-${pt.row}-${pt.col}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border font-mono text-xs transition-all duration-200 ${
                  isTop
                    ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 ring-1 ring-cyan-400/50 shadow-md shadow-cyan-900/30'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 w-8">
                    [{idx}]
                  </span>
                  <span className="font-semibold text-slate-100">
                    Point({pt.row}, {pt.col})
                  </span>
                </div>
                {isTop && (
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-700/60">
                    &larr; TOP
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Stack Metadata */}
      <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between font-mono">
        <span>Base: stack.items[0]</span>
        <span>Max Capacity: {maxCapacity}</span>
      </div>
    </div>
  );
};
