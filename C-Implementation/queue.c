
#include <stdio.h>
#include "queue.h"

// Initializes the circular queue.
void initQueue(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

// Checks whether the queue is empty.
int queueIsEmpty(Queue *q) {
    return q->count == 0;
}

// Checks whether the queue is full.
int queueIsFull(Queue *q) {
    return q->count == QUEUE_SIZE;
}

// Inserts a position at the rear of the queue.
int enqueue(Queue *q, Position p) {
    if (queueIsFull(q)) {
        printf("Queue Overflow!\n");
        return 0;
    }

    q->rear = (q->rear + 1) % QUEUE_SIZE;
    q->items[q->rear] = p;
    q->count++;

    return 1;
}

// Removes and returns the front position.
int dequeue(Queue *q, Position *p) {
    if (queueIsEmpty(q)) {
        printf("Queue Underflow!\n");
        return 0;
    }

    *p = q->items[q->front];

    q->front = (q->front + 1) % QUEUE_SIZE;
    q->count--;

    if (q->count == 0) {
        q->front = 0;
        q->rear = -1;
    }

    return 1;
}

// Returns the front position without removing it.
int queuePeek(Queue *q, Position *p) {
    if (queueIsEmpty(q)) {
        return 0;
    }

    *p = q->items[q->front];
    return 1;
}

// Displays all positions in the circular queue.
void displayQueue(Queue *q) {
    int i, index;

    if (queueIsEmpty(q)) {
        printf("Queue is empty.\n");
        return;
    }

    printf("\nQueue (front to rear):\n");

    for (i = 0; i < q->count; i++) {
        index = (q->front + i) % QUEUE_SIZE;

        printf("(%d, %d)\n",
               q->items[index].row,
               q->items[index].col);
    }
}

// Returns the current number of elements in the queue.
int queueSize(Queue *q) {
    return q->count;
}
