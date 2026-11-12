/**
 * MAZE NAVIGATOR - Data Structures & Algorithms Visualizer
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 */

export type CellType = 'empty' | 'wall' | 'start' | 'dest';

export interface Point {
  row: number;
  col: number;
}

export type Grid = CellType[][];

export type VisualState = 'unvisited' | 'visited' | 'active' | 'path' | 'backtracked' | 'deadend' | 'frontier';

export interface DfsStep {
  stepNumber: number;
  type: 'push' | 'pop' | 'deadend' | 'reach_dest' | 'unreachable';
  current: Point;
  neighbor?: Point;
  stackSnapshot: Point[];
  visitedSnapshot: boolean[][];
  pathSnapshot: Point[];
  description: string;
  forwardMoves: number;
  backtrackMoves: number;
  cCodeExplanation: string;
}

export interface BfsStep {
  stepNumber: number;
  type: 'enqueue' | 'dequeue' | 'reach_dest' | 'unreachable';
  current: Point;
  neighbor?: Point;
  queueSnapshot: Point[];
  frontIndex: number;
  rearIndex: number;
  visitedSnapshot: boolean[][];
  parentMap: Record<string, Point | null>; // key: "r,c"
  distanceMap: Record<string, number>;
  description: string;
  cCodeExplanation: string;
}

export interface LinkedListNode {
  id: string;
  point: Point;
  linearIndex: number;
  isDeleted?: boolean;
}

export interface AlgorithmStats {
  algorithm: 'DFS' | 'BFS';
  pathFound: boolean;
  pathLength: number;
  cellsVisited: number;
  forwardMoves: number;
  backtrackMoves: number;
  maxMemorySize: number; // Max stack depth or max queue size
  totalSteps: number;
  executionTimeMs: number;
  deadEndsEncountered: number;
}

export type ActiveTab =
  | 'dashboard'
  | 'editor'
  | 'dfs'
  | 'bfs'
  | 'shortest'
  | 'linkedlist'
  | 'statistics'
  | 'comparison';

export interface PresetMaze {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  description: string;
  rows: number;
  cols: number;
  start: Point;
  dest: Point;
  walls: Point[];
}
