/**
 * Linked List Path View
 * Demonstrates solution paths as a Singly Linked List in memory:
 * struct Node { int row, col, linearIndex; struct Node* next; };
 * Interactive insertion at end (insertEnd) and deletion at last node (deleteLast).
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useState, useEffect } from 'react';
import { Grid, Point } from '../types/maze';
import { runBfsSimulation } from '../algorithms/bfs';
import { MazeGrid } from '../components/MazeGrid';
import { LinkedListVisualizer } from '../components/LinkedListVisualizer';
import {
  createInitialLinkedList,
  insertEndNode,
  deleteLastNode,
  LinkedListState
} from '../algorithms/linkedList';
import { Network, Database, Layers, ArrowRight } from 'lucide-react';

interface LinkedListViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
}

export const LinkedListView: React.FC<LinkedListViewProps> = ({
  grid,
  start,
  dest
}) => {
  const cols = grid[0]?.length || 10;

  // Obtain solution path from BFS
  const [listState, setListState] = useState<LinkedListState>(() => {
    const res = runBfsSimulation(grid, start, dest);
    return createInitialLinkedList(res.finalShortestPath, cols);
  });

  // Re-sync if grid/start/dest changes
  useEffect(() => {
    const res = runBfsSimulation(grid, start, dest);
    setListState(createInitialLinkedList(res.finalShortestPath, cols));
  }, [grid, start, dest, cols]);

  const handleInsertEnd = (r: number, c: number) => {
    setListState(prev => insertEndNode(prev, { row: r, col: c }, cols));
  };

  const handleDeleteLast = () => {
    setListState(prev => deleteLastNode(prev));
  };

  const handleResetFromPath = () => {
    const res = runBfsSimulation(grid, start, dest);
    setListState(createInitialLinkedList(res.finalShortestPath, cols));
  };

  // Convert current list nodes to points for maze highlight
  const currentPathPoints = listState.nodes.map(n => n.point);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 mb-1">
            DYNAMIC DATA STRUCTURE: SINGLY LINKED LIST
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Singly Linked List Path Representation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic node allocation where each path cell holds coordinates, linear index, and a pointer to the next step.
          </p>
        </div>

        {/* Dynamic Nodes Count */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg">
            <span className="text-slate-400">Total Nodes in Heap: </span>
            <span className="text-cyan-300 font-bold">{listState.nodes.length}</span>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg">
            <span className="text-slate-400">Memory Allocated: </span>
            <span className="text-emerald-400 font-bold">
              {listState.nodes.length * 24} bytes (64-bit C99)
            </span>
          </div>
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Maze Canvas (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-x-auto min-h-[420px]">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              shortestPathPoints={currentPathPoints}
              showCoordinates={true}
            />
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 text-xs text-slate-400 leading-relaxed">
            <h4 className="text-slate-200 font-semibold mb-1">C99 Heap Storage Advantage:</h4>
            Unlike static arrays with fixed compile-time limits (<code className="text-cyan-400">MAX_CELLS</code>), dynamic singly linked lists only allocate memory for coordinates actually traversed, freeing memory on backtracking via <code className="text-rose-400">free()</code>.
          </div>
        </div>

        {/* Right: Interactive Linked List Node Chain (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <LinkedListVisualizer
            nodes={listState.nodes}
            onInsertEnd={handleInsertEnd}
            onDeleteLast={handleDeleteLast}
            onResetFromPath={handleResetFromPath}
            lastAction={listState.lastAction}
            cCodeSnapshot={listState.cCodeSnapshot}
          />
        </div>
      </div>
    </div>
  );
};
