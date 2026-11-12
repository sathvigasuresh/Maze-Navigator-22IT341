/**
 * C99 Reference Implementation Snippets for TCE 22IT341 Data Structures
 */

export interface CCodes {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const C_SNIPPETS: CCodes[] = [
  {
    id: 'stack',
    title: 'Stack (LIFO) in C99',
    description: 'Fixed-capacity array-based Stack with top pointer for DFS exploration & backtracking.',
    code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_CELLS 256

typedef struct {
    int row;
    int col;
} Point;

typedef struct {
    Point items[MAX_CELLS];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1;
}

bool isStackFull(Stack* s) {
    return s->top == MAX_CELLS - 1;
}

bool isStackEmpty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, Point p) {
    if (isStackFull(s)) {
        printf("Stack Overflow Error!\\n");
        return;
    }
    s->items[++(s->top)] = p;
}

Point pop(Stack* s) {
    Point nullPt = {-1, -1};
    if (isStackEmpty(s)) {
        printf("Stack Underflow Error!\\n");
        return nullPt;
    }
    return s->items[(s->top)--];
}

Point peek(Stack* s) {
    return s->items[s->top];
}`
  },
  {
    id: 'circular_queue',
    title: 'Circular Queue (FIFO) in C99',
    description: 'Modulo-based Circular Queue preventing array drift for BFS level exploration.',
    code: `#include <stdio.h>
#include <stdbool.h>

#define CAPACITY 256

typedef struct {
    int row;
    int col;
} Point;

typedef struct {
    Point items[CAPACITY];
    int front;
    int rear;
    int count;
} CircularQueue;

void initQueue(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

bool isQueueEmpty(CircularQueue* q) {
    return q->count == 0;
}

bool isQueueFull(CircularQueue* q) {
    return q->count == CAPACITY;
}

void enqueue(CircularQueue* q, Point p) {
    if (isQueueFull(q)) {
        printf("Queue Overflow Error!\\n");
        return;
    }
    q->rear = (q->rear + 1) % CAPACITY;
    q->items[q->rear] = p;
    q->count++;
}

Point dequeue(CircularQueue* q) {
    Point nullPt = {-1, -1};
    if (isQueueEmpty(q)) {
        printf("Queue Underflow Error!\\n");
        return nullPt;
    }
    Point p = q->items[q->front];
    q->front = (q->front + 1) % CAPACITY;
    q->count--;
    return p;
}`
  },
  {
    id: 'linked_list',
    title: 'Singly Linked List in C99',
    description: 'Dynamic node allocation for storing solution paths, insertEnd, and deleteLast for backtracking.',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int row;
    int col;
    int linearIndex; // row * COLS + col
    struct Node* next;
};

// Insert coordinate at end of solution path
void insertEnd(struct Node** head, int r, int c, int cols) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->row = r;
    newNode->col = c;
    newNode->linearIndex = r * cols + c;
    newNode->next = NULL;

    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

// Delete last coordinate when backtracking
void deleteLast(struct Node** head) {
    if (*head == NULL) return;
    if ((*head)->next == NULL) {
        free(*head);
        *head = NULL;
        return;
    }
    struct Node* temp = *head;
    while (temp->next->next != NULL) {
        temp = temp->next;
    }
    free(temp->next);
    temp->next = NULL;
}`
  },
  {
    id: 'linear_array',
    title: 'Linear 1D Array Mapping in C99',
    description: 'Row-major order mapping formula: index = row * COLS + col',
    code: `// Converting 2D coordinate (row, col) to 1D linear array buffer:
#define ROWS 10
#define COLS 10

int linearIndex = row * COLS + col;

// Reconstructing 2D coordinate from 1D linear index:
int r = linearIndex / COLS;
int c = linearIndex % COLS;

// 1D flat maze buffer declaration in C99:
int maze1D[ROWS * COLS];
// maze1D[row * COLS + col] = 1 (WALL) or 0 (PATH);`
  }
];
