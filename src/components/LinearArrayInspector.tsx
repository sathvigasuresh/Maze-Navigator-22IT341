/**
 * Linear 1D Array Representation Inspector
 * Demonstrates the row-major mapping: index = row * columns + column
 */

import React from 'react';
import { Point, Grid } from '../types/maze';
import { getLinearIndex } from '../algorithms/presets';

interface LinearArrayInspectorProps {
  grid: Grid;
  hoveredCell: Point | null;
  start: Point;
  dest: Point;
}

export const LinearArrayInspector: React.FC<LinearArrayInspectorProps> = ({
  grid,
  hoveredCell,
  start,
  dest
}) => {
  const rows = grid.length;
  const cols = grid[0]?.length || 10;
  const totalCells = rows * cols;

  const activeRow = hoveredCell ? hoveredCell.row : start.row;
  const activeCol = hoveredCell ? hoveredCell.col : start.col;
  const computedIndex = getLinearIndex(activeRow, activeCol, cols);
  const cellType = grid[activeRow]?.[activeCol] || 'empty';

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 text-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Linear 1D Memory Mapping
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            C99 Row-Major Order Formula: <span className="font-mono text-cyan-400">index = (row * COLS) + col</span>
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Grid: {rows} &times; {cols} ({totalCells} elements)
        </div>
      </div>

      {/* Active Cell Calculation Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs font-mono">
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
          <div className="text-slate-400 text-[11px] mb-1">Target Coordinates</div>
          <div className="text-cyan-300 font-semibold text-sm">
            Row: {activeRow}, Col: {activeCol}
          </div>
          <div className="text-slate-500 text-[10px] mt-1 capitalize">
            State: {cellType}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
          <div className="text-slate-400 text-[11px] mb-1">Linear Formula Expansion</div>
          <div className="text-emerald-400 font-semibold text-sm">
            ({activeRow} &times; {cols}) + {activeCol} = {computedIndex}
          </div>
          <div className="text-slate-500 text-[10px] mt-1">
            Byte Offset: {computedIndex * 4} bytes (int32)
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
          <div className="text-slate-400 text-[11px] mb-1">Inverse Coordinate Mapping</div>
          <div className="text-amber-300 font-semibold text-sm">
            row = {computedIndex} / {cols} &rarr; {Math.floor(computedIndex / cols)}
          </div>
          <div className="text-slate-400 text-[10px] mt-0.5">
            col = {computedIndex} % {cols} &rarr; {computedIndex % cols}
          </div>
        </div>
      </div>

      {/* Linearized 1D Memory Ribbon preview */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>1D Memory Buffer Array (<code className="text-cyan-400">maze1D[index]</code>)</span>
          <span className="text-[11px] text-slate-500">Green = Start, Red = Dest, Grey = Wall</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1 font-mono text-[10px]">
          {Array.from({ length: Math.min(totalCells, 32) }).map((_, idx) => {
            const r = Math.floor(idx / cols);
            const c = idx % cols;
            const isStart = r === start.row && c === start.col;
            const isDest = r === dest.row && c === dest.col;
            const isWall = grid[r]?.[c] === 'wall';
            const isSelected = idx === computedIndex;

            let bg = 'bg-slate-900 border-slate-800 text-slate-400';
            if (isStart) bg = 'bg-emerald-600/80 border-emerald-400 text-white font-bold';
            else if (isDest) bg = 'bg-rose-600/80 border-rose-400 text-white font-bold';
            else if (isWall) bg = 'bg-slate-700 border-slate-600 text-slate-300';
            else if (isSelected) bg = 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold';

            return (
              <div
                key={`mem-${idx}`}
                title={`Index ${idx} -> (${r}, ${c})`}
                className={`w-7 h-10 shrink-0 border rounded flex flex-col items-center justify-between py-1 transition-all ${bg} ${
                  isSelected ? 'ring-2 ring-cyan-400 scale-105 z-10' : ''
                }`}
              >
                <span className="text-[8px] opacity-75">{idx}</span>
                <span className="text-[9px] font-bold">
                  {isStart ? 'S' : isDest ? 'D' : isWall ? '1' : '0'}
                </span>
              </div>
            );
          })}
          {totalCells > 32 && (
            <div className="px-2 text-slate-500 shrink-0 flex items-center">
              + {totalCells - 32} more elements...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
