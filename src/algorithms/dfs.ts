/**
 * DFS Algorithm Implementation with Stack Simulation
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 *
 * Implements Depth-First Search with explicit Stack operations (push/pop),
 * step-by-step history generation, dead-end detection, and backtracking metrics.
 */

import { Grid, Point, DfsStep, AlgorithmStats } from '../types/maze';

export interface DfsRunResult {
  steps: DfsStep[];
  stats: AlgorithmStats;
  finalPath: Point[];
}

export function runDfsSimulation(grid: Grid, start: Point, dest: Point): DfsRunResult {
  const startTime = performance.now();
  const rows = grid.length;
  const cols = grid[0].length;

  const steps: DfsStep[] = [];
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const stack: Point[] = [];
  const currentPath: Point[] = [];

  let forwardMoves = 0;
  let backtrackMoves = 0;
  let maxStackSize = 0;
  let deadEnds = 0;

  // Directions: Up, Right, Down, Left (standard exploratory order)
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const dirNames = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  // 1. Initial State: Push Start onto Stack
  stack.push({ ...start });
  currentPath.push({ ...start });
  visited[start.row][start.col] = true;
  maxStackSize = Math.max(maxStackSize, stack.length);
  forwardMoves++;

  steps.push({
    stepNumber: steps.length,
    type: 'push',
    current: { ...start },
    stackSnapshot: stack.map(p => ({ ...p })),
    visitedSnapshot: visited.map(row => [...row]),
    pathSnapshot: currentPath.map(p => ({ ...p })),
    description: `Initialized DFS: Pushed START cell (${start.row}, ${start.col}) onto Stack.`,
    forwardMoves,
    backtrackMoves,
    cCodeExplanation: `push(&stack, (Point){${start.row}, ${start.col}}); // stack.items[++stack.top] = pt; visited[${start.row}][${start.col}] = 1;`
  });

  let reached = false;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];

    // Check if reached destination
    if (current.row === dest.row && current.col === dest.col) {
      reached = true;
      steps.push({
        stepNumber: steps.length,
        type: 'reach_dest',
        current: { ...current },
        stackSnapshot: stack.map(p => ({ ...p })),
        visitedSnapshot: visited.map(row => [...row]),
        pathSnapshot: currentPath.map(p => ({ ...p })),
        description: `SUCCESS: Destination (${dest.row}, ${dest.col}) reached! Stack contains the complete active path.`,
        forwardMoves,
        backtrackMoves,
        cCodeExplanation: `if (curr.row == dest.row && curr.col == dest.col) { printf("Destination Reached!\\n"); return FOUND; }`
      });
      break;
    }

    // Look for an unvisited valid neighbor
    let foundNeighbor = false;
    for (let i = 0; i < 4; i++) {
      const nr = current.row + dr[i];
      const nc = current.col + dc[i];

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        grid[nr][nc] !== 'wall' &&
        !visited[nr][nc]
      ) {
        // Valid forward move
        visited[nr][nc] = true;
        const nextPoint = { row: nr, col: nc };
        stack.push(nextPoint);
        currentPath.push(nextPoint);
        maxStackSize = Math.max(maxStackSize, stack.length);
        forwardMoves++;
        foundNeighbor = true;

        steps.push({
          stepNumber: steps.length,
          type: 'push',
          current: nextPoint,
          neighbor: nextPoint,
          stackSnapshot: stack.map(p => ({ ...p })),
          visitedSnapshot: visited.map(row => [...row]),
          pathSnapshot: currentPath.map(p => ({ ...p })),
          description: `Exploring ${dirNames[i]}: PUSH (${nr}, ${nc}) to Stack. Stack size: ${stack.length}.`,
          forwardMoves,
          backtrackMoves,
          cCodeExplanation: `push(&stack, (Point){${nr}, ${nc}}); visited[${nr}][${nc}] = 1; // LIFO push operation`
        });

        break; // DFS goes deep immediately
      }
    }

    if (!foundNeighbor) {
      // Dead end reached! Backtrack: POP current cell from Stack
      deadEnds++;
      backtrackMoves++;
      const popped = stack.pop()!;
      currentPath.pop();

      steps.push({
        stepNumber: steps.length,
        type: 'deadend',
        current: { ...popped },
        stackSnapshot: stack.map(p => ({ ...p })),
        visitedSnapshot: visited.map(row => [...row]),
        pathSnapshot: currentPath.map(p => ({ ...p })),
        description: `DEAD END at (${popped.row}, ${popped.col})! No unvisited neighbors. BACKTRACKING: POP (${popped.row}, ${popped.col}) from Stack.`,
        forwardMoves,
        backtrackMoves,
        cCodeExplanation: `// Dead end detected: backtrack\nPoint popped = pop(&stack); // stack.top--; retracting candidate path`
      });
    }
  }

  if (!reached && stack.length === 0) {
    steps.push({
      stepNumber: steps.length,
      type: 'unreachable',
      current: { ...start },
      stackSnapshot: [],
      visitedSnapshot: visited.map(row => [...row]),
      pathSnapshot: [],
      description: `TERMINATED: Stack is empty. Destination (${dest.row}, ${dest.col}) is unreachable from Start (${start.row}, ${start.col}).`,
      forwardMoves,
      backtrackMoves,
      cCodeExplanation: `if (isEmpty(&stack)) { printf("Path not found: Unreachable\\n"); return NOT_FOUND; }`
    });
  }

  const endTime = performance.now();
  let cellsVisitedCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (visited[r][c]) cellsVisitedCount++;
    }
  }

  const finalPath = reached ? currentPath.map(p => ({ ...p })) : [];

  const stats: AlgorithmStats = {
    algorithm: 'DFS',
    pathFound: reached,
    pathLength: finalPath.length,
    cellsVisited: cellsVisitedCount,
    forwardMoves,
    backtrackMoves,
    maxMemorySize: maxStackSize,
    totalSteps: steps.length,
    executionTimeMs: Math.max(0.1, Number((endTime - startTime).toFixed(2))),
    deadEndsEncountered: deadEnds
  };

  return {
    steps,
    stats,
    finalPath
  };
}
