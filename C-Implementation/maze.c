
#include <stdio.h>
#include "maze.h"

// Creates a maze with the given number of rows and columns.
void createMaze(Maze *maze, int rows, int cols) {
    int i;

    if (rows <= 0 || rows > MAX_ROWS ||
        cols <= 0 || cols > MAX_COLS) {
        printf("Invalid maze dimensions!\n");
        return;
    }

    maze->rows = rows;
    maze->cols = cols;
    maze->start = -1;
    maze->destination = -1;

    for (i = 0; i < rows * cols; i++) {
        maze->cells[i] = 0;
    }
}

// Returns the value stored at a particular row and column.
int getCell(Maze *maze, int row, int col) {
    if (row < 0 || row >= maze->rows ||
        col < 0 || col >= maze->cols) {
        return -1;
    }

    return maze->cells[row * maze->cols + col];
}

// Updates the value at a particular row and column.
void setCell(Maze *maze, int row, int col, int value) {
    int index;

    if (row < 0 || row >= maze->rows ||
        col < 0 || col >= maze->cols) {
        return;
    }

    if (value < 0 || value > 3) {
        return;
    }

    index = row * maze->cols + col;

    if (maze->cells[index] == 2) {
        maze->start = -1;
    }

    if (maze->cells[index] == 3) {
        maze->destination = -1;
    }

    maze->cells[index] = value;

    if (value == 2) {
        maze->start = index;
    }

    if (value == 3) {
        maze->destination = index;
    }
}

// Displays the maze in a readable two-dimensional format.
void displayMaze(Maze *maze) {
    int r, c, i;

    printf("\n2D MAZE VIEW\n");
    printf("S = Start, D = Destination, # = Wall, . = Path\n\n");

    for (r = 0; r < maze->rows; r++) {
        for (c = 0; c < maze->cols; c++) {
            int value = getCell(maze, r, c);

            if (value == 1)
                printf("# ");
            else if (value == 2)
                printf("S ");
            else if (value == 3)
                printf("D ");
            else
                printf(". ");
        }
        printf("\n");
    }

    printf("\nLINEAR ARRAY VIEW\n");

    for (i = 0; i < maze->rows * maze->cols; i++) {
        printf("%d ", maze->cells[i]);
    }

    printf("\n\nMAPPING FORMULA:\n");
    printf("Index = row * columns + column\n");

    printf("\nSAMPLE MAPPING:\n");
    printf("For row = 2, column = 3, columns = %d:\n",
           maze->cols);
    printf("Index = 2 * %d + 3 = %d\n",
           maze->cols, 2 * maze->cols + 3);
}

// Converts row and column coordinates into a linear array index.
int getIndex(int row, int col, int cols) {
    return row * cols + col;
}

// Finds the row number corresponding to a linear array index.
int indexToRow(int index, int cols) {
    return index / cols;
}

// Finds the column number corresponding to a linear array index.
int indexToCol(int index, int cols) {
    return index % cols;
}

// Loads a maze from a text file containing dimensions and cell values.
int loadMaze(Maze *maze, const char *filename) {
    FILE *fp;
    int rows, cols, value;
    int i, start = -1, destination = -1;

    fp = fopen(filename, "r");

    if (fp == NULL) {
        printf("Error: Cannot open maze file!\n");
        return 0;
    }

    if (fscanf(fp, "%d %d", &rows, &cols) != 2 ||
        rows <= 0 || rows > MAX_ROWS ||
        cols <= 0 || cols > MAX_COLS) {
        printf("Invalid maze dimensions in file!\n");
        fclose(fp);
        return 0;
    }

    for (i = 0; i < rows * cols; i++) {
        if (fscanf(fp, "%d", &value) != 1 ||
            value < 0 || value > 3) {
            printf("Invalid maze data!\n");
            fclose(fp);
            return 0;
        }

        if (value == 2) {
            if (start != -1) {
                printf("Multiple start positions!\n");
                fclose(fp);
                return 0;
            }
            start = i;
        }

        if (value == 3) {
            if (destination != -1) {
                printf("Multiple destinations!\n");
                fclose(fp);
                return 0;
            }
            destination = i;
        }

        maze->cells[i] = value;
    }

    fclose(fp);

    if (start == -1 || destination == -1) {
        printf("Maze must contain one start and one destination!\n");
        return 0;
    }

    maze->rows = rows;
    maze->cols = cols;
    maze->start = start;
    maze->destination = destination;

    printf("Maze loaded successfully!\n");
    return 1;
}

// Loads a built-in 10x10 default maze.
void loadDefaultMaze(Maze *maze) {
    int r, c;

    int defaultMaze[10][10] = {
        {2,0,1,0,0,0,1,0,0,0},
        {1,0,1,0,1,0,1,0,1,0},
        {0,0,0,0,1,0,0,0,1,0},
        {0,1,1,0,1,1,1,0,1,0},
        {0,0,0,0,0,0,1,0,0,0},
        {1,1,1,1,1,0,1,1,1,0},
        {0,0,0,0,1,0,0,0,1,0},
        {0,1,1,0,1,1,1,0,1,0},
        {0,0,0,0,0,0,0,0,1,0},
        {1,1,1,1,1,1,1,0,0,3}
    };

    createMaze(maze, 10, 10);

    for (r = 0; r < 10; r++) {
        for (c = 0; c < 10; c++) {
            setCell(maze, r, c, defaultMaze[r][c]);
        }
    }

    printf("Default 10x10 maze loaded successfully!\n");
}
