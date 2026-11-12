
#ifndef SOLVER_H
#define SOLVER_H

#include "maze.h"
#include "linkedlist.h"
#include "stats.h"

int solveDFS(Maze *maze, int verbose,
             LinkedList *pathList, MazeStats *stats);

int solveBFS(Maze *maze,
             LinkedList *pathList, MazeStats *stats);

#endif