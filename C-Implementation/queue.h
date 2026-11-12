
#ifndef QUEUE_H
#define QUEUE_H

#include "stack.h"

#define QUEUE_SIZE 400

// Represents a circular queue of maze positions.
typedef struct {
    Position items[QUEUE_SIZE];
    int front;
    int rear;
    int count;
} Queue;

// Initializes the queue.
void initQueue(Queue *q);

// Checks whether the queue is empty.
int queueIsEmpty(Queue *q);

// Checks whether the queue is full.
int queueIsFull(Queue *q);

// Inserts a position into the queue.
int enqueue(Queue *q, Position p);

// Removes the front position from the queue.
int dequeue(Queue *q, Position *p);

// Returns the front position without removing it.
int queuePeek(Queue *q, Position *p);

// Displays all positions in the queue.
void displayQueue(Queue *q);

// Returns the current number of elements.
int queueSize(Queue *q);

#endif
