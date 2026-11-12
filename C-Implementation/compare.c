
#include <stdio.h>
#include <time.h>
#include "maze.h"
#include "solver.h"

void compareAlgorithms(Maze *maze) {
    clock_t start, end;
    double dfsTime, bfsTime;
    int dfsResult, bfsResult;

    printf("\n========== ALGORITHM COMPARISON ==========\n");

    // Compare DFS.
    start = clock();
    dfsResult = solveDFS(maze, 0);
    end = clock();

    dfsTime = (double)(end - start) / CLOCKS_PER_SEC;

    // Compare BFS.
    start = clock();
    bfsResult = solveBFS(maze);
    end = clock();

    bfsTime = (double)(end - start) / CLOCKS_PER_SEC;

    printf("\n-------------- RESULTS ----------------\n");

    printf("DFS Result       : %s\n",
           dfsResult ? "Path Found" : "No Path");

    printf("DFS Execution   : %.6f seconds\n", dfsTime);

    printf("BFS Result       : %s\n",
           bfsResult ? "Path Found" : "No Path");

    printf("BFS Execution   : %.6f seconds\n", bfsTime);

    if (dfsTime < bfsTime)
        printf("\nDFS was faster in this run.\n");
    else if (bfsTime < dfsTime)
        printf("\nBFS was faster in this run.\n");
    else
        printf("\nBoth took approximately the same time.\n");

    printf("=========================================\n");
}
