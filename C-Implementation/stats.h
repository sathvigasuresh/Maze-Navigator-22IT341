
#ifndef STATS_H
#define STATS_H

typedef struct {
    int cellsVisited;
    int totalMoves;
    int deadEnds;
    int backtrackingMoves;
    int pathLength;
} MazeStats;

void initStats(MazeStats *stats);
void displayStats(MazeStats *stats);
void updateStats(MazeStats *stats, int visited,
                 int moves, int deadEnds,
                 int backtracking, int pathLength);

#endif
