/**
 * Preset mazes and procedural generator for MAZE NAVIGATOR
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

import { Point, PresetMaze, Grid } from '../types/maze';

export const PRESET_MAZES: PresetMaze[] = [
  {
    id: 'classic-labyrinth',
    name: 'Classic Labyrinth',
    difficulty: 'Easy',
    description: 'A balanced 10x10 maze with standard pathways and decision forks. Ideal for observing baseline search behavior.',
    rows: 10,
    cols: 10,
    start: { row: 0, col: 0 },
    dest: { row: 9, col: 9 },
    walls: [
      { row: 0, col: 2 }, { row: 0, col: 5 }, { row: 0, col: 7 },
      { row: 1, col: 2 }, { row: 1, col: 5 }, { row: 1, col: 7 },
      { row: 2, col: 0 }, { row: 2, col: 2 }, { row: 2, col: 4 }, { row: 2, col: 7 }, { row: 2, col: 9 },
      { row: 3, col: 4 }, { row: 3, col: 6 }, { row: 3, col: 7 },
      { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 4 }, { row: 4, col: 8 },
      { row: 5, col: 4 }, { row: 5, col: 6 }, { row: 5, col: 7 },
      { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 4 }, { row: 6, col: 7 },
      { row: 7, col: 4 }, { row: 7, col: 6 }, { row: 7, col: 9 },
      { row: 8, col: 1 }, { row: 8, col: 2 }, { row: 8, col: 4 }, { row: 8, col: 7 },
      { row: 9, col: 4 }, { row: 9, col: 7 }
    ]
  },
  {
    id: 'backtracking-trap',
    name: 'Dead-End Backtracker Trap',
    difficulty: 'Medium',
    description: 'Engineered specifically for DFS demonstration: contains long cul-de-sacs that force deep Stack push sequences followed by successive pop backtracking.',
    rows: 10,
    cols: 10,
    start: { row: 1, col: 0 },
    dest: { row: 8, col: 9 },
    walls: [
      { row: 0, col: 1 }, { row: 0, col: 3 }, { row: 0, col: 5 }, { row: 0, col: 7 },
      { row: 1, col: 3 }, { row: 1, col: 5 }, { row: 1, col: 7 },
      { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 2, col: 5 }, { row: 2, col: 7 }, { row: 2, col: 8 },
      { row: 3, col: 1 }, { row: 3, col: 5 }, { row: 3, col: 7 },
      { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 4, col: 7 }, { row: 4, col: 9 },
      { row: 5, col: 7 },
      { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 5 }, { row: 6, col: 7 }, { row: 6, col: 8 },
      { row: 7, col: 5 },
      { row: 8, col: 0 }, { row: 8, col: 1 }, { row: 8, col: 3 }, { row: 8, col: 5 }, { row: 8, col: 7 },
      { row: 9, col: 3 }, { row: 9, col: 7 }
    ]
  },
  {
    id: 'multipath-bottleneck',
    name: 'Multi-Path & Bottleneck',
    difficulty: 'Challenging',
    description: 'Contains a fast direct corridor alongside a deceptively long winding corridor. Perfect for contrasting BFS shortest path optimality against DFS exploration.',
    rows: 10,
    cols: 10,
    start: { row: 0, col: 1 },
    dest: { row: 9, col: 8 },
    walls: [
      { row: 0, col: 3 }, { row: 0, col: 6 },
      { row: 1, col: 0 }, { row: 1, col: 3 }, { row: 1, col: 5 }, { row: 1, col: 6 }, { row: 1, col: 8 },
      { row: 2, col: 0 }, { row: 2, col: 3 }, { row: 2, col: 5 }, { row: 2, col: 8 },
      { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 5 }, { row: 3, col: 7 }, { row: 3, col: 8 },
      { row: 4, col: 5 },
      { row: 5, col: 1 }, { row: 5, col: 2 }, { row: 5, col: 3 }, { row: 5, col: 5 }, { row: 5, col: 7 }, { row: 5, col: 8 },
      { row: 6, col: 3 }, { row: 6, col: 5 }, { row: 6, col: 7 },
      { row: 7, col: 0 }, { row: 7, col: 1 }, { row: 7, col: 3 }, { row: 7, col: 5 }, { row: 7, col: 7 }, { row: 7, col: 9 },
      { row: 8, col: 3 }, { row: 8, col: 5 }, { row: 8, col: 7 },
      { row: 9, col: 3 }, { row: 9, col: 5 }
    ]
  }
];

export function createEmptyGrid(rows: number, cols: number): Grid {
  const grid: Grid = [];
  for (let r = 0; r < rows; r++) {
    const row: Grid[number] = [];
    for (let c = 0; c < cols; c++) {
      row.push('empty');
    }
    grid.push(row);
  }
  return grid;
}

export function buildGridFromPreset(preset: PresetMaze): { grid: Grid; start: Point; dest: Point } {
  const grid = createEmptyGrid(preset.rows, preset.cols);
  for (const w of preset.walls) {
    if (w.row < preset.rows && w.col < preset.cols) {
      grid[w.row][w.col] = 'wall';
    }
  }
  grid[preset.start.row][preset.start.col] = 'start';
  grid[preset.dest.row][preset.dest.col] = 'dest';
  return { grid, start: { ...preset.start }, dest: { ...preset.dest } };
}

/**
 * Generate a random maze using Randomized DFS (Recursive Backtracker)
 */
export function generateRandomMaze(rows: number, cols: number): { grid: Grid; start: Point; dest: Point } {
  const grid = createEmptyGrid(rows, cols);
  // Fill all with walls first
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c] = 'wall';
    }
  }

  // Carve paths starting from (0, 0)
  const stack: Point[] = [{ row: 0, col: 0 }];
  grid[0][0] = 'empty';

  const directions = [
    { dr: -2, dc: 0 },
    { dr: 2, dc: 0 },
    { dr: 0, dc: -2 },
    { dr: 0, dc: 2 }
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    // Shuffle directions
    const shuffled = [...directions].sort(() => Math.random() - 0.5);
    let carved = false;

    for (const d of shuffled) {
      const nr = current.row + d.dr;
      const nc = current.col + d.dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 'wall') {
        // Carve passage between
        grid[current.row + d.dr / 2][current.col + d.dc / 2] = 'empty';
        grid[nr][nc] = 'empty';
        stack.push({ row: nr, col: nc });
        carved = true;
        break;
      }
    }

    if (!carved) {
      stack.pop();
    }
  }

  // Ensure start and destination are clear
  const start: Point = { row: 0, col: 0 };
  const dest: Point = { row: rows - 1, col: cols - 1 };

  grid[start.row][start.col] = 'start';
  grid[dest.row][dest.col] = 'dest';

  // Ensure destination is accessible
  if (dest.row > 0 && grid[dest.row - 1][dest.col] === 'wall' && dest.col > 0 && grid[dest.row][dest.col - 1] === 'wall') {
    grid[dest.row - 1][dest.col] = 'empty';
  }

  return { grid, start, dest };
}

/**
 * Linear array representation helper
 * index = row * cols + col
 */
export function getLinearIndex(row: number, col: number, cols: number): number {
  return row * cols + col;
}

export function getCoordsFromLinear(index: number, cols: number): Point {
  return {
    row: Math.floor(index / cols),
    col: index % cols
  };
}
