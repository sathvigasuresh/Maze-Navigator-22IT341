/**
 * Interactive Maze Grid Component
 * Renders an editable grid with row/col coordinate headers, linear 1D index mapping,
 * and dynamic visual states for DFS/BFS/Shortest Path exploration.
 */

import React, { useState } from 'react';
import { Grid, Point, VisualState } from '../types/maze';
import { getLinearIndex } from '../algorithms/presets';

interface MazeGridProps {
  grid: Grid;
  start: Point;
  dest: Point;
  isEditable?: boolean;
  editMode?: 'wall' | 'empty' | 'start' | 'dest';
  onCellClick?: (row: number, col: number) => void;
  onCellHover?: (row: number, col: number) => void;
  // Visual state overrides for algorithms
  activePoint?: Point | null;
  visitedMap?: boolean[][];
  pathPoints?: Point[];
  shortestPathPoints?: Point[];
  queuePoints?: Point[];
  deadEndPoints?: Point[];
  showLinearIndex?: boolean;
  showCoordinates?: boolean;
}

export const MazeGrid: React.FC<MazeGridProps> = ({
  grid,
  start,
  dest,
  isEditable = false,
  editMode = 'wall',
  onCellClick,
  onCellHover,
  activePoint = null,
  visitedMap,
  pathPoints = [],
  shortestPathPoints = [],
  queuePoints = [],
  deadEndPoints = [],
  showLinearIndex = false,
  showCoordinates = false
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const rows = grid.length;
  const cols = grid[0]?.length || 10;

  // Build lookup sets for fast rendering
  const pathSet = new Set(pathPoints.map(p => `${p.row},${p.col}`));
  const shortestSet = new Set(shortestPathPoints.map(p => `${p.row},${p.col}`));
  const queueSet = new Set(queuePoints.map(p => `${p.row},${p.col}`));
  const deadEndSet = new Set(deadEndPoints.map(p => `${p.row},${p.col}`));

  const handleMouseDown = (r: number, c: number) => {
    if (!isEditable || !onCellClick) return;
    setIsMouseDown(true);
    onCellClick(r, c);
  };

  const handleMouseEnter = (r: number, c: number) => {
    if (onCellHover) onCellHover(r, c);
    if (isEditable && isMouseDown && onCellClick && (editMode === 'wall' || editMode === 'empty')) {
      onCellClick(r, c);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="inline-block select-none"
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseUp={handleMouseUp}
    >
      <div className="flex flex-col">
        {/* Top Column Indices Header */}
        <div className="flex items-center pl-8 mb-1">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={`col-idx-${c}`}
              className="w-8 sm:w-10 text-center font-mono text-[10px] text-slate-500 font-semibold"
            >
              C{c}
            </div>
          ))}
        </div>

        {/* Grid Rows with Left Row Index Header */}
        <div className="flex flex-col gap-1">
          {grid.map((rowCells, r) => (
            <div key={`row-${r}`} className="flex items-center gap-1">
              {/* Row Index Label */}
              <div className="w-7 text-right pr-2 font-mono text-[10px] text-slate-500 font-semibold shrink-0">
                R{r}
              </div>

              {/* Cells in row */}
              {rowCells.map((cellType, c) => {
                const isStart = r === start.row && c === start.col;
                const isDest = r === dest.row && c === dest.col;
                const isActive = activePoint?.row === r && activePoint?.col === c;
                const isVisited = visitedMap ? visitedMap[r]?.[c] : false;
                const isShortest = shortestSet.has(`${r},${c}`);
                const isPath = pathSet.has(`${r},${c}`);
                const isQueue = queueSet.has(`${r},${c}`);
                const isDeadEnd = deadEndSet.has(`${r},${c}`);
                const linearIdx = getLinearIndex(r, c, cols);

                // Determine cell visual style
                let cellBg = 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700';
                let cellText = 'text-slate-500';
                let contentLabel: string | null = null;

                if (cellType === 'wall') {
                  cellBg = 'bg-slate-700/90 border-slate-600/60 shadow-inner';
                  cellText = 'text-slate-400';
                } else if (isStart) {
                  cellBg = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-400/40';
                  contentLabel = 'S';
                } else if (isDest) {
                  cellBg = 'bg-rose-600 border-rose-400 text-white font-bold ring-2 ring-rose-400/40';
                  contentLabel = 'D';
                } else if (isActive) {
                  cellBg = 'bg-cyan-500 border-cyan-200 text-slate-950 font-black cell-active-pulse z-10';
                  contentLabel = '●';
                } else if (isShortest) {
                  cellBg = 'bg-amber-500/90 border-amber-300 text-amber-950 font-bold shadow-md shadow-amber-500/20';
                  contentLabel = '★';
                } else if (isPath) {
                  cellBg = 'bg-cyan-900/70 border-cyan-500/80 text-cyan-200 font-semibold';
                  contentLabel = '•';
                } else if (isDeadEnd) {
                  cellBg = 'bg-rose-950/40 border-rose-800/60 text-rose-400 line-through';
                  contentLabel = '✕';
                } else if (isQueue) {
                  cellBg = 'bg-blue-900/50 border-cyan-600/70 text-cyan-300';
                  contentLabel = 'Q';
                } else if (isVisited) {
                  cellBg = 'bg-indigo-950/40 border-indigo-800/40 text-indigo-400';
                  contentLabel = '·';
                }

                return (
                  <button
                    type="button"
                    key={`cell-${r}-${c}`}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                    aria-label={`Cell R${r} C${c}, Index ${linearIdx}, Type ${cellType}`}
                    className={`w-8 h-8 sm:w-10 sm:h-10 border rounded flex flex-col items-center justify-center transition-all duration-150 relative text-[10px] sm:text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400 ${cellBg}`}
                  >
                    {/* Linear Index badge if requested */}
                    {showLinearIndex && (
                      <span className="text-[8px] opacity-75 leading-none">
                        {linearIdx}
                      </span>
                    )}

                    {/* Coordinates if requested */}
                    {showCoordinates && !showLinearIndex && (
                      <span className="text-[7px] opacity-60 leading-none">
                        {r},{c}
                      </span>
                    )}

                    {/* Main glyph or label */}
                    {contentLabel && (
                      <span className={`leading-none font-bold ${cellText}`}>
                        {contentLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
