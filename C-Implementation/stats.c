
#include <stdio.h>
#include "stats.h"

// Initialize all statistics to zero.
void initStats(MazeStats *stats) {
    stats->cellsVisited = 0;
    stats->totalMoves = 0;
    stats->deadEnds = 0;
    stats->backtrackingMoves = 0;
    stats->pathLength = 0;
}

// Update maze statistics.
void updateStats(MazeStats *stats, int visited,
                 int moves, int deadEnds,
                 int backtracking, int pathLength) {

    stats->cellsVisited = visited;
    stats->totalMoves = moves;
    stats->deadEnds = deadEnds;
    stats->backtrackingMoves = backtracking;
    stats->pathLength = pathLength;
}

// Display statistics.
void displayStats(MazeStats *stats) {
    printf("\n========== MAZE STATISTICS ==========\n");

    printf("Cells Visited       : %d\n",
           stats->cellsVisited);

    printf("Total Moves         : %d\n",
           stats->totalMoves);

    printf("Dead Ends           : %d\n",
           stats->deadEnds);

    printf("Backtracking Moves  : %d\n",
           stats->backtrackingMoves);

    printf("Path Length         : %d\n",
           stats->pathLength);

    printf("=====================================\n");
}
