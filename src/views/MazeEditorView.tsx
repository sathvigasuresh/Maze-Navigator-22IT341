/**
 * Maze Editor View
 * Interactive grid designer with drawing modes (Start, Destination, Wall, Path),
 * 3 predefined academic presets, procedural maze generation, and live linear 1D memory inspector.
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import React, { useState } from 'react';
import { Grid, Point, PresetMaze } from '../types/maze';
import { MazeGrid } from '../components/MazeGrid';
import { LinearArrayInspector } from '../components/LinearArrayInspector';
import { PRESET_MAZES, createEmptyGrid, generateRandomMaze, buildGridFromPreset } from '../algorithms/presets';
import {
  Paintbrush,
  Sparkles,
  RotateCcw,
  Flag,
  Target,
  Square,
  Eraser,
  HelpCircle,
  Hash
} from 'lucide-react';

interface MazeEditorViewProps {
  grid: Grid;
  start: Point;
  dest: Point;
  onUpdateGrid: (newGrid: Grid, newStart?: Point, newDest?: Point) => void;
  onSelectPreset: (preset: PresetMaze) => void;
}

export const MazeEditorView: React.FC<MazeEditorViewProps> = ({
  grid,
  start,
  dest,
  onUpdateGrid,
  onSelectPreset
}) => {
  const [editMode, setEditMode] = useState<'wall' | 'empty' | 'start' | 'dest'>('wall');
  const [hoveredCell, setHoveredCell] = useState<Point | null>(null);
  const [showLinearIdx, setShowLinearIdx] = useState<boolean>(false);
  const [showCoords, setShowCoords] = useState<boolean>(true);

  const rows = grid.length;
  const cols = grid[0]?.length || 10;

  const handleCellClick = (r: number, c: number) => {
    // Cannot overwrite start or destination directly unless re-placing them
    if (editMode === 'start') {
      if (r === dest.row && c === dest.col) return; // Cannot place on destination
      const nextGrid = grid.map(row => [...row]);
      nextGrid[start.row][start.col] = 'empty';
      nextGrid[r][c] = 'start';
      onUpdateGrid(nextGrid, { row: r, col: c }, dest);
    } else if (editMode === 'dest') {
      if (r === start.row && c === start.col) return; // Cannot place on start
      const nextGrid = grid.map(row => [...row]);
      nextGrid[dest.row][dest.col] = 'empty';
      nextGrid[r][c] = 'dest';
      onUpdateGrid(nextGrid, start, { row: r, col: c });
    } else if (editMode === 'wall') {
      if ((r === start.row && c === start.col) || (r === dest.row && c === dest.col)) return;
      const nextGrid = grid.map(row => [...row]);
      nextGrid[r][c] = 'wall';
      onUpdateGrid(nextGrid);
    } else if (editMode === 'empty') {
      if ((r === start.row && c === start.col) || (r === dest.row && c === dest.col)) return;
      const nextGrid = grid.map(row => [...row]);
      nextGrid[r][c] = 'empty';
      onUpdateGrid(nextGrid);
    }
  };

  const handleClearAllWalls = () => {
    const emptyGrid = createEmptyGrid(rows, cols);
    emptyGrid[start.row][start.col] = 'start';
    emptyGrid[dest.row][dest.col] = 'dest';
    onUpdateGrid(emptyGrid, start, dest);
  };

  const handleGenerateRandom = () => {
    const { grid: randomGrid, start: newStart, dest: newDest } = generateRandomMaze(rows, cols);
    onUpdateGrid(randomGrid, newStart, newDest);
  };

  const handleResizeGrid = (newSize: number) => {
    const newGrid = createEmptyGrid(newSize, newSize);
    const newStart = { row: 0, col: 0 };
    const newDest = { row: newSize - 1, col: newSize - 1 };
    newGrid[newStart.row][newStart.col] = 'start';
    newGrid[newDest.row][newDest.col] = 'dest';
    onUpdateGrid(newGrid, newStart, newDest);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner and Quick Presets */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Paintbrush className="w-4 h-4 text-cyan-400" />
            <span>Interactive Maze Designer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build custom mazes or load curated academic test geometries to evaluate algorithms.
          </p>
        </div>

        {/* 3 Predefined Maze Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Predefined Mazes:</span>
          {PRESET_MAZES.map(preset => (
            <button
              type="button"
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-cyan-950/60 hover:text-cyan-300 hover:border-cyan-700/80 border border-slate-700/80 rounded-lg transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Area: Toolbar + Grid + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drawing Tools & Dimensions */}
        <div className="lg:col-span-4 space-y-4">
          {/* Drawing Mode Palette */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Drawing Palette &amp; Tool
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEditMode('wall')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border font-medium transition-all ${
                  editMode === 'wall'
                    ? 'bg-slate-700 border-cyan-400 text-white shadow-sm ring-1 ring-cyan-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-slate-600 border border-slate-500 shrink-0" />
                <span>Place Wall</span>
              </button>

              <button
                type="button"
                onClick={() => setEditMode('empty')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border font-medium transition-all ${
                  editMode === 'empty'
                    ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-sm ring-1 ring-cyan-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Eraser className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Erase / Path</span>
              </button>

              <button
                type="button"
                onClick={() => setEditMode('start')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border font-medium transition-all ${
                  editMode === 'start'
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0 flex items-center justify-center text-[9px] font-bold text-white">
                  S
                </div>
                <span>Set Start (Green)</span>
              </button>

              <button
                type="button"
                onClick={() => setEditMode('dest')}
                className={`flex items-center gap-2 p-2.5 rounded-lg border font-medium transition-all ${
                  editMode === 'dest'
                    ? 'bg-rose-950/80 border-rose-400 text-rose-300 ring-1 ring-rose-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded bg-rose-500 shrink-0 flex items-center justify-center text-[9px] font-bold text-white">
                  D
                </div>
                <span>Set Dest (Red)</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-1 leading-normal">
              Click and drag across the grid to draw continuous obstacle walls.
            </p>
          </div>

          {/* Grid Size & Generators */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Grid Configuration &amp; Utilities
            </h3>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Dimensions:</span>
              <div className="flex items-center gap-1 font-mono">
                {[10, 12, 14].map(sz => (
                  <button
                    type="button"
                    key={`sz-${sz}`}
                    onClick={() => handleResizeGrid(sz)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      rows === sz
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sz}&times;{sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGenerateRandom}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 hover:bg-cyan-900/60 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Generate Random Maze (Recursive Backtracker)</span>
              </button>

              <button
                type="button"
                onClick={handleClearAllWalls}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 bg-slate-900 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900/60 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All Walls</span>
              </button>
            </div>
          </div>

          {/* View Overlays */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Cell Overlay Labels
            </h3>
            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
              <span>Show Row / Col Coordinates (r, c)</span>
              <input
                type="checkbox"
                checked={showCoords}
                onChange={(e) => setShowCoords(e.target.checked)}
                className="accent-cyan-400 rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
              <span>Show Linear 1D Array Indices (0..N-1)</span>
              <input
                type="checkbox"
                checked={showLinearIdx}
                onChange={(e) => setShowLinearIdx(e.target.checked)}
                className="accent-cyan-400 rounded"
              />
            </label>
          </div>
        </div>

        {/* Right Column: Interactive Grid Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-x-auto min-h-[480px]">
            <MazeGrid
              grid={grid}
              start={start}
              dest={dest}
              isEditable={true}
              editMode={editMode}
              onCellClick={handleCellClick}
              onCellHover={(r, c) => setHoveredCell({ row: r, col: c })}
              showCoordinates={showCoords}
              showLinearIndex={showLinearIdx}
            />
          </div>

          {/* Linear Array Inspector Card */}
          <LinearArrayInspector
            grid={grid}
            hoveredCell={hoveredCell}
            start={start}
            dest={dest}
          />
        </div>
      </div>
    </div>
  );
};
