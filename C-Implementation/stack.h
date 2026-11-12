
#ifndef STACK_H
#define STACK_H

#define STACK_SIZE 400

// Represents a position inside the maze.
typedef struct {
    int row;
    int col;
} Position;

// Represents an array-based stack.
typedef struct {
    Position items[STACK_SIZE];
    int top;
} Stack;

// Initializes the stack.
void initStack(Stack *s);

// Checks whether the stack is empty.
int isEmpty(Stack *s);

// Checks whether the stack is full.
int isFull(Stack *s);

// Inserts a position into the stack.
int push(Stack *s, Position p);

// Removes and returns the top position.
int pop(Stack *s, Position *p);

// Returns the top position without removing it.
int peek(Stack *s, Position *p);

// Displays all positions in the stack.
void displayStack(Stack *s);

// Returns the current number of elements.
int stackSize(Stack *s);

#endif
