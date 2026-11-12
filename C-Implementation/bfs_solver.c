
#include <stdio.h>
#include <string.h>
#include "maze.h"
#include "queue.h"

int isValidBFS(Maze *maze, int row, int col, int visited[]) {
    int index;

    if (row < 0 || row >= maze->rows ||
        col < 0 || col >= maze->cols) {
        return 0;
    }

    index = getIndex(row, col, maze->cols);

    return maze->cells[index] != 1 && !visited[index];
}

int solveBFS(Maze *maze) {
    Queue q;
    Position current, next;

    int visited[MAX_CELLS] = {0};
    int parent[MAX_CELLS];
    int path[MAX_CELLS];

    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};

    int i, index, start, destination;
    int found = 0, pathLength = 0;

    if (maze->start < 0 || maze->destination < 0) {
        printf("Invalid maze: Start or destination missing.\n");
        return 0;
    }

    start = maze->start;
    destination = maze->destination;

    for (i = 0; i < MAX_CELLS; i++)
        parent[i] = -1;

    initQueue(&q);

    current.row = indexToRow(start, maze->cols);
    current.col = indexToCol(start, maze->cols);

    enqueue(&q, current);
    visited[start] = 1;

    printf("\nBFS TRAVERSAL STARTED\n");

    while (!queueIsEmpty(&q)) {
        dequeue(&q, &current);

        index = getIndex(current.row, current.col, maze->cols);

        if (index == destination) {
            found = 1;
            break;
        }

        for (i = 0; i < 4; i++) {
            next.row = current.row + dr[i];
            next.col = current.col + dc[i];

            if (isValidBFS(maze, next.row, next.col, visited)) {
                index = getIndex(next.row, next.col, maze->cols);

                visited[index] = 1;
                parent[index] = getIndex(
                    current.row, current.col, maze->cols
                );

                enqueue(&q, next);

                printf("Visited: (%d,%d)\n",
                       next.row, next.col);
            }
        }
    }

    if (!found) {
        printf("\nNo path exists!\n");
        return 0;
    }

    // Reconstruct the shortest path.
    index = destination;

    while (index != -1) {
        path[pathLength++] = index;
        index = parent[index];
    }

    printf("\nBFS SHORTEST PATH:\n");

    for (i = pathLength - 1; i >= 0; i--) {
        printf("(%d,%d)",
               indexToRow(path[i], maze->cols),
               indexToCol(path[i], maze->cols));

        if (i > 0)
            printf(" -> ");
    }

    printf("\n");

    printf("\nShortest path length: %d moves\n",
           pathLength - 1);

    return 1;
}
