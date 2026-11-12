/**
 * Circular Queue Visualizer Component (FIFO)
 * Models the C99 Circular Queue with Front & Rear pointers,
 * FIFO processing order, and capacity metrics for BFS level exploration.
 */

import React from 'react';
import { Point } from '../types/maze';
import { ListFilter, ArrowRight, CornerDownLeft } from 'lucide-react';

interface QueueVisualizerProps {
  queue: Point[];
  frontIndex?: number;
  rearIndex?: number;
  maxCapacity?: number;
  lastAction?: 'enqueue' | 'dequeue' | 'reach_dest' | 'unreachable' | null;
  currentCell?: Point | null;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  queue,
  frontIndex = 0,
  rearIndex = 0,
  maxCapacity = 64,
  lastAction,
  currentCell
}) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">
            Circular Queue (FIFO Buffer)
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Front: <span className="text-cyan-300 font-bold">{frontIndex}</span> | Rear: <span className="text-emerald-300 font-bold">{rearIndex}</span>
        </div>
      </div>

      {/* Action Indicator Bar */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Operation:</span>
          {lastAction === 'enqueue' && (
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" /> ENQUEUE (at Rear)
            </span>
          )}
          {lastAction === 'dequeue' && (
            <span className="text-cyan-400 font-mono font-semibold flex items-center gap-1">
              <CornerDownLeft className="w-3.5 h-3.5" /> DEQUEUE (from Front)
            </span>
          )}
          {(!lastAction || lastAction === 'reach_dest') && (
            <span className="text-slate-400 font-mono">Active Processing</span>
          )}
        </div>
        {currentCell && (
          <div className="text-xs font-mono text-slate-300">
            Active: <span className="text-cyan-300 font-bold">({currentCell.row}, {currentCell.col})</span>
          </div>
        )}
      </div>

      {/* Queue Items Horizontal/Vertical Ribbon */}
      <div className="flex-1 bg-slate-950/70 border-2 border-dashed border-slate-800 rounded-xl p-3 flex flex-col justify-start overflow-y-auto max-h-[360px] gap-1.5 relative">
        {queue.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
            <span>[ QUEUE EMPTY ]</span>
            <span className="text-[11px] text-slate-600 mt-1">count = 0</span>
          </div>
        ) : (
          queue.map((pt, idx) => {
            const isFront = idx === 0;
            const isRear = idx === queue.length - 1;

            return (
              <div
                key={`queue-item-${idx}-${pt.row}-${pt.col}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border font-mono text-xs transition-all duration-200 ${
                  isFront
                    ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 ring-1 ring-cyan-400/50'
                    : isRear
                    ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-200'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 w-8">
                    Q[{idx}]
                  </span>
                  <span className="font-semibold text-slate-100">
                    Point({pt.row}, {pt.col})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isFront && (
                    <span className="text-[9px] font-bold text-cyan-300 bg-cyan-950/90 px-1.5 py-0.5 rounded border border-cyan-700/60">
                      FRONT &larr; Next Dequeue
                    </span>
                  )}
                  {isRear && !isFront && (
                    <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-700/60">
                      REAR &larr; Last In
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Queue Circular Buffer Formula */}
      <div className="mt-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
        <span>rear = (rear + 1) % CAPACITY</span>
        <span>Count: {queue.length} / {maxCapacity}</span>
      </div>
    </div>
  );
};
