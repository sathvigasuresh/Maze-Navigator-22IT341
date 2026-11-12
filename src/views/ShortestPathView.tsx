/**
 * Shortest Path View
 * Visualizes BFS-extracted shortest path, parent predecessor pointers,
 * distance metrics, and reverse path backtracking.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useState, useMemo } from 'react';
import { Grid, Point } from '../types/maze';
import { runBfsSimulation } from '../algorithms/bfs';
import { MazeGrid } from '../components/MazeGrid';
import { Compass, GitCommit, ArrowRight, CornerDownLeft, Route } from 'lucide-react';

interface ShortestPathViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
}

export const ShortestPathView: React.FC<ShortestPathViewProps> = ({
  grid,
  start,
  dest
}) => {
  const [selectedCell, setSelectedCell] = useState<Point | null>(null);
  const [reconstructionStep, setReconstructionStep] = useState<number>(-1);

  // Run BFS to extract parentMap, distanceMap, and shortest path
  const bfsResult = useMemo(() => {
    return runBfsSimulation(grid, start, dest);
  }, [grid, start, dest]);

  const { finalShortestPath, parentMap, distanceMap, stats } = bfsResult;
  const isFound = stats.pathFound;

  // Active reconstructed path based on scrubber or full
  const displayedPath = useMemo(() => {
    if (!isFound) return [];
    if (reconstructionStep === -1) return finalShortestPath;
    return finalShortestPath.slice(0, reconstructionStep + 1);
  }, [isFound, finalShortestPath, reconstructionStep]);

  // Selected cell predecessor info
  const targetCell = selectedCell || dest;
  const targetKey = `${targetCell.row},${targetCell.col}`;
  const parentPoint = parentMap[targetKey];
  const cellDist = distanceMap[targetKey];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-amber-400 mb-1">
            OPTIMALITY PRINCIPLE: BFS PREDECESSOR CHAIN
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Shortest Path &amp; Predecessor Extraction</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Reconstructs the optimal trajectory from <span className="text-rose-400 font-mono">Destination</span> back to <span className="text-emerald-400 font-mono">Start</span> via parent pointers.
          </p>
        </div>

        {/* Path Statistics Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Path Status: </span>
            <span className={`font-bold ${isFound ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isFound ? 'FOUND (Optimal)' : 'UNREACHABLE'}
            </span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Path Length: </span>
            <span className="text-amber-300 font-bold">
              {finalShortestPath.length} steps
            </span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400">Total Visited: </span>
            <span className="text-cyan-300 font-bold">
              {stats.cellsVisited} cells
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid & Path Reconstructor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Maze Canvas with Golden Shortest Path (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-x-auto min-h-[460px]">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              shortestPathPoints={displayedPath}
              activePoint={selectedCell}
              onCellClick={(r, c) => setSelectedCell({ row: r, col: c })}
              showCoordinates={true}
            />
          </div>

          {/* Interactive Reconstruct Scrubber */}
          {isFound && (
            <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Route className="w-4 h-4 text-amber-400" />
                  <span>Interactive Path Reconstruction Scrubber</span>
                </span>
                <span className="font-mono text-amber-300">
                  {reconstructionStep === -1
                    ? 'Showing Complete Path'
                    : `Showing ${reconstructionStep + 1} / ${finalShortestPath.length} nodes`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="reconstruct-slider" className="sr-only">Shortest Path Step Scrubber</label>
                <input
                  id="reconstruct-slider"
                  type="range"
                  min={0}
                  max={finalShortestPath.length - 1}
                  value={reconstructionStep === -1 ? finalShortestPath.length - 1 : reconstructionStep}
                  onChange={(e) => setReconstructionStep(Number(e.target.value))}
                  className="flex-1 accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setReconstructionStep(-1)}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium transition-colors"
                >
                  Full Path
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Predecessor and Distance Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Predecessor Relationship Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">
                  Predecessor &amp; Distance Inspector
                </h3>
              </div>
              <span className="text-slate-400 text-xs font-mono">
                Click any cell
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[11px] mb-1">Inspected Cell</div>
                <div className="text-white font-bold text-sm">
                  ({targetCell.row}, {targetCell.col})
                </div>
                <div className="text-slate-500 text-[10px] mt-1">
                  {targetCell.row === start.row && targetCell.col === start.col
                    ? 'Start Root'
                    : targetCell.row === dest.row && targetCell.col === dest.col
                    ? 'Target Destination'
                    : 'Interior Coordinate'}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-slate-400 text-[11px] mb-1">Distance from Start</div>
                <div className="text-amber-400 font-bold text-sm">
                  {cellDist !== undefined ? `${cellDist} steps` : 'Unreached'}
                </div>
                <div className="text-slate-500 text-[10px] mt-1">
                  BFS Wavefront Level
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs font-mono">
              <div className="text-slate-400 text-[11px] mb-1">Parent Predecessor Pointer</div>
              <div className="text-cyan-300 font-semibold">
                {parentPoint ? (
                  <span>parent[{targetCell.row}][{targetCell.col}] = ({parentPoint.row}, {parentPoint.col})</span>
                ) : targetCell.row === start.row && targetCell.col === start.col ? (
                  <span className="text-slate-400">parent[start] = NULL (Root Node)</span>
                ) : (
                  <span className="text-rose-400">No predecessor (Unvisited cell)</span>
                )}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300">
              <div className="text-[11px] text-slate-400 mb-1">C99 Predecessor Backtrack Loop:</div>
              <pre className="text-amber-300/90 whitespace-pre-wrap leading-relaxed text-[11px]">
{`Point curr = dest;
while (curr.row != start.row || curr.col != start.col) {
    insertAtFront(&shortestPath, curr);
    curr = parent[curr.row][curr.col];
}
insertAtFront(&shortestPath, start);`}
              </pre>
            </div>
          </div>

          {/* Sequential Path Coordinates List */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Extracted Shortest Path Coordinates ({finalShortestPath.length} Nodes)
            </h3>

            {isFound ? (
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
                {finalShortestPath.map((pt, idx) => {
                  const isS = pt.row === start.row && pt.col === start.col;
                  const isD = pt.row === dest.row && pt.col === dest.col;

                  return (
                    <div
                      key={`path-coord-${idx}`}
                      onClick={() => setSelectedCell(pt)}
                      className="flex items-center justify-between px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 cursor-pointer border border-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                        <span className={isS ? 'text-emerald-400 font-bold' : isD ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                          ({pt.row}, {pt.col})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {isS ? 'START' : isD ? 'DESTINATION' : `Dist: ${idx}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-rose-400 font-mono">
                No path exists between Start and Destination in the current maze.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
