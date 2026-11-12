
#ifndef MAZE_H
#define MAZE_H

#define MAX_ROWS 20
#define MAX_COLS 20
#define MAX_CELLS (MAX_ROWS * MAX_COLS)

typedef struct {
    int rows;
    int cols;
    int cells[MAX_CELLS];
    int start;
    int destination;
} Maze;

// Creates an empty maze.
void createMaze(Maze *maze, int rows, int cols);

// Returns the value stored at a maze position.
int getCell(Maze *maze, int row, int col);

// Updates the value at a maze position.
void setCell(Maze *maze, int row, int col, int value);

// Displays the maze in 2D format.
void displayMaze(Maze *maze);

// Loads a maze from a text file.
int loadMaze(Maze *maze, const char *filename);

// Loads the built-in default maze.
void loadDefaultMaze(Maze *maze);

// Converts a row and column into a 1D index.
int getIndex(int row, int col, int cols);

// Returns the row number from a 1D index.
int indexToRow(int index, int cols);

// Returns the column number from a 1D index.
int indexToCol(int index, int cols);

#endif
