
#include <stdio.h>
#include <string.h>
#include "maze.h"
#include "stack.h"

// Stores the DFS traversal statistics.
typedef struct {
    int cellsVisited;
    int forwardMoves;
    int backtrackingMoves;
    int deadEnds;
    int maxStackSize;
} DFSStats;

// Checks whether a cell can be visited.
int isValidDFS(Maze *maze, int row, int col, int visited[]) {
    int index;

    if (row < 0 || row >= maze->rows ||
        col < 0 || col >= maze->cols) {
        return 0;
    }

    index = getIndex(row, col, maze->cols);

    return maze->cells[index] != 1 && !visited[index];
}

// Displays the path stored in the stack.
void displayDFSPath(Stack *s) {
    int i;

    printf("\nDFS PATH (Start to Destination):\n");

    for (i = 0; i <= s->top; i++) {
        printf("(%d,%d)",
               s->items[i].row,
               s->items[i].col);

        if (i < s->top)
            printf(" -> ");
    }

    printf("\n");
}

// Solves the maze using Depth First Search and an array-based stack.
int solveDFS(Maze *maze, int verbose,
             LinkedList *pathList, MazeStats *stats) {
    Stack s;
    Position current, next;
    int visited[MAX_CELLS] = {0};
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    int found, i, index;
    int deadEnd;
    DFSStats stats = {0};

    if (maze->start < 0 || maze->destination < 0) {
        printf("Invalid maze: Start or destination missing.\n");
        return 0;
    }

    if (maze->start == maze->destination) {
        printf("Start and destination are the same!\n");
        return 1;
    }

    initStack(&s);

    current.row = indexToRow(maze->start, maze->cols);
    current.col = indexToCol(maze->start, maze->cols);

    push(&s, current);
    visited[maze->start] = 1;

    stats.cellsVisited = 1;
    stats.maxStackSize = 1;

    printf("\nDFS TRAVERSAL STARTED\n");

    while (!isEmpty(&s)) {
        peek(&s, &current);

        index = getIndex(current.row, current.col, maze->cols);

        if (index == maze->destination) {
            printf("\nDestination reached!\n");
            displayDFSPath(&s);

            found = 1;
            printf("\nDFS STATISTICS\n");
            printf("Cells visited: %d\n", stats.cellsVisited);
            printf("Forward moves: %d\n", stats.forwardMoves);
            printf("Backtracking moves: %d\n",
                   stats.backtrackingMoves);
            printf("Dead ends: %d\n", stats.deadEnds);
            printf("Maximum stack size: %d\n",
                   stats.maxStackSize);

            return found;
        }

        found = 0;
        deadEnd = 1;

        for (i = 0; i < 4; i++) {
            next.row = current.row + dr[i];
            next.col = current.col + dc[i];

            if (isValidDFS(maze, next.row, next.col, visited)) {
                deadEnd = 0;

                index = getIndex(next.row, next.col, maze->cols);

                if (push(&s, next)) {
                    visited[index] = 1;
                    stats.cellsVisited++;
                    stats.forwardMoves++;

                    if (stackSize(&s) > stats.maxStackSize)
                        stats.maxStackSize = stackSize(&s);

                    if (verbose) {
                        printf("Push: (%d,%d)\n",
                               next.row, next.col);
                        displayStack(&s);
                    }

                    found = 1;
                    break;
                }
            }
        }

        if (!found) {
            if (deadEnd)
                stats.deadEnds++;

            if (verbose && deadEnd)
                printf("Dead end at (%d,%d)\n",
                       current.row, current.col);

            if (s.top > 0) {
                pop(&s, &current);
                stats.backtrackingMoves++;

                if (verbose) {
                    printf("Backtracking...\n");
                    displayStack(&s);
                }
            } else {
                pop(&s, &current);
            }
        }
    }

    printf("\nNo path exists!\n");
    printf("Cells visited: %d\n", stats.cellsVisited);
    printf("Forward moves: %d\n", stats.forwardMoves);
    printf("Backtracking moves: %d\n",
           stats.backtrackingMoves);
    printf("Dead ends: %d\n", stats.deadEnds);

    return 0;
}
