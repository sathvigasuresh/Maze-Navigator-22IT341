/**
 * BFS Algorithm Implementation with Circular Queue Simulation
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 *
 * Implements Breadth-First Search with explicit Circular Queue simulation
 * (front, rear, count, capacity), distance levels, parent pointers,
 * and guaranteed shortest path extraction.
 */

import { Grid, Point, BfsStep, AlgorithmStats } from '../types/maze';

export interface BfsRunResult {
  steps: BfsStep[];
  stats: AlgorithmStats;
  finalShortestPath: Point[];
  parentMap: Record<string, Point | null>;
  distanceMap: Record<string, number>;
}

export function runBfsSimulation(grid: Grid, start: Point, dest: Point): BfsRunResult {
  const startTime = performance.now();
  const rows = grid.length;
  const cols = grid[0].length;

  const steps: BfsStep[] = [];
  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue: Point[] = [];
  const parentMap: Record<string, Point | null> = {};
  const distanceMap: Record<string, number> = {};

  let maxQueueSize = 0;
  let dequeuedCount = 0;

  // Circular Queue indices simulation
  let front = 0;
  let rear = -1;

  const startKey = `${start.row},${start.col}`;
  parentMap[startKey] = null;
  distanceMap[startKey] = 0;
  visited[start.row][start.col] = true;

  // 1. Initial State: Enqueue Start
  queue.push({ ...start });
  rear = 0;
  maxQueueSize = Math.max(maxQueueSize, queue.length);

  steps.push({
    stepNumber: steps.length,
    type: 'enqueue',
    current: { ...start },
    queueSnapshot: queue.map(p => ({ ...p })),
    frontIndex: front,
    rearIndex: rear,
    visitedSnapshot: visited.map(r => [...r]),
    parentMap: { ...parentMap },
    distanceMap: { ...distanceMap },
    description: `Initialized BFS: Enqueued START (${start.row}, ${start.col}) at index rear=0. Distance = 0.`,
    cCodeExplanation: `enqueue(&q, (Point){${start.row}, ${start.col}}); // q.rear = (q.rear + 1) % MAX; q.items[q.rear] = pt; q.count++; dist[${start.row}][${start.col}] = 0;`
  });

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const dirNames = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  let reached = false;
  let destKey = `${dest.row},${dest.col}`;

  while (queue.length > 0) {
    // FIFO Dequeue
    const current = queue.shift()!;
    front++;
    dequeuedCount++;

    steps.push({
      stepNumber: steps.length,
      type: 'dequeue',
      current: { ...current },
      queueSnapshot: queue.map(p => ({ ...p })),
      frontIndex: front,
      rearIndex: rear,
      visitedSnapshot: visited.map(r => [...r]),
      parentMap: { ...parentMap },
      distanceMap: { ...distanceMap },
      description: `FIFO DEQUEUE: Inspecting cell (${current.row}, ${current.col}) at front pointer. Remaining in queue: ${queue.length}.`,
      cCodeExplanation: `Point curr = dequeue(&q); // q.front = (q.front + 1) % MAX; q.count--; Exploring 4-connected neighbors.`
    });

    if (current.row === dest.row && current.col === dest.col) {
      reached = true;
      steps.push({
        stepNumber: steps.length,
        type: 'reach_dest',
        current: { ...current },
        queueSnapshot: queue.map(p => ({ ...p })),
        frontIndex: front,
        rearIndex: rear,
        visitedSnapshot: visited.map(r => [...r]),
        parentMap: { ...parentMap },
        distanceMap: { ...distanceMap },
        description: `SUCCESS: Destination (${dest.row}, ${dest.col}) reached! Shortest distance = ${distanceMap[destKey]} units.`,
        cCodeExplanation: `if (curr.row == dest.row && curr.col == dest.col) { printf("Shortest Path Found! Cost: %d\\n", dist[curr.row][curr.col]); return FOUND; }`
      });
      break;
    }

    const currentKey = `${current.row},${current.col}`;
    const currentDist = distanceMap[currentKey] ?? 0;

    // Explore neighbors in BFS order
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
        visited[nr][nc] = true;
        const neighborPoint = { row: nr, col: nc };
        const neighborKey = `${nr},${nc}`;
        parentMap[neighborKey] = { ...current };
        distanceMap[neighborKey] = currentDist + 1;

        queue.push(neighborPoint);
        rear++;
        maxQueueSize = Math.max(maxQueueSize, queue.length);

        steps.push({
          stepNumber: steps.length,
          type: 'enqueue',
          current,
          neighbor: neighborPoint,
          queueSnapshot: queue.map(p => ({ ...p })),
          frontIndex: front,
          rearIndex: rear,
          visitedSnapshot: visited.map(r => [...r]),
          parentMap: { ...parentMap },
          distanceMap: { ...distanceMap },
          description: `Discovered ${dirNames[i]} neighbor (${nr}, ${nc}): ENQUEUE at rear=${rear}. Set parent = (${current.row}, ${current.col}), distance = ${currentDist + 1}.`,
          cCodeExplanation: `parent[${nr}][${nc}] = curr; dist[${nr}][${nc}] = dist[curr.row][curr.col] + 1; enqueue(&q, (Point){${nr}, ${nc}});`
        });

        // Early exit check if target discovered during enqueue
        if (nr === dest.row && nc === dest.col) {
          reached = true;
          steps.push({
            stepNumber: steps.length,
            type: 'reach_dest',
            current: neighborPoint,
            queueSnapshot: queue.map(p => ({ ...p })),
            frontIndex: front,
            rearIndex: rear,
            visitedSnapshot: visited.map(r => [...r]),
            parentMap: { ...parentMap },
            distanceMap: { ...distanceMap },
            description: `TARGET FOUND: Destination (${dest.row}, ${dest.col}) enqueued! Guaranteed shortest path found via BFS level exploration.`,
            cCodeExplanation: `printf("Shortest path guaranteed by BFS level-order exploration.\\n");`
          });
          break;
        }
      }
    }

    if (reached) break;
  }

  if (!reached && queue.length === 0) {
    steps.push({
      stepNumber: steps.length,
      type: 'unreachable',
      current: { ...start },
      queueSnapshot: [],
      frontIndex: front,
      rearIndex: rear,
      visitedSnapshot: visited.map(r => [...r]),
      parentMap: { ...parentMap },
      distanceMap: { ...distanceMap },
      description: `TERMINATED: Queue is empty. Destination (${dest.row}, ${dest.col}) is unreachable from Start (${start.row}, ${start.col}).`,
      cCodeExplanation: `if (isEmpty(&q)) { printf("Destination is completely blocked by walls.\\n"); return NOT_FOUND; }`
    });
  }

  // Reconstruct shortest path from parent pointers
  const shortestPath: Point[] = [];
  if (reached && parentMap[destKey] !== undefined) {
    let curr: Point | null = { ...dest };
    while (curr !== null) {
      shortestPath.unshift({ row: curr.row, col: curr.col });
      const lookupKey: string = `${curr.row},${curr.col}`;
      const nextParent: Point | null = parentMap[lookupKey] ?? null;
      curr = nextParent;
    }
  }

  const endTime = performance.now();
  let cellsVisitedCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (visited[r][c]) cellsVisitedCount++;
    }
  }

  const stats: AlgorithmStats = {
    algorithm: 'BFS',
    pathFound: reached,
    pathLength: shortestPath.length,
    cellsVisited: cellsVisitedCount,
    forwardMoves: dequeuedCount,
    backtrackMoves: 0, // BFS doesn't backtrack! It expands in wavefronts
    maxMemorySize: maxQueueSize,
    totalSteps: steps.length,
    executionTimeMs: Math.max(0.1, Number((endTime - startTime).toFixed(2))),
    deadEndsEncountered: 0
  };

  return {
    steps,
    stats,
    finalShortestPath: shortestPath,
    parentMap,
    distanceMap
  };
}
