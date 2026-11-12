
#include <stdio.h>
#include "stack.h"

// Initializes the stack with top set to -1.
void initStack(Stack *s) {
    s->top = -1;
}

// Checks whether the stack is empty.
int isEmpty(Stack *s) {
    return s->top == -1;
}

// Checks whether the stack is full.
int isFull(Stack *s) {
    return s->top == STACK_SIZE - 1;
}

// Inserts a new position at the top of the stack.
int push(Stack *s, Position p) {
    if (isFull(s)) {
        printf("Stack Overflow!\n");
        return 0;
    }

    s->items[++s->top] = p;
    return 1;
}

// Removes the top position from the stack.
int pop(Stack *s, Position *p) {
    if (isEmpty(s)) {
        printf("Stack Underflow!\n");
        return 0;
    }

    *p = s->items[s->top--];
    return 1;
}

// Returns the top position without removing it.
int peek(Stack *s, Position *p) {
    if (isEmpty(s)) {
        return 0;
    }

    *p = s->items[s->top];
    return 1;
}

// Displays all positions currently stored in the stack.
void displayStack(Stack *s) {
    int i;

    if (isEmpty(s)) {
        printf("Stack is empty.\n");
        return;
    }

    printf("\nStack (bottom to top):\n");

    for (i = 0; i <= s->top; i++) {
        printf("(%d, %d)\n",
               s->items[i].row,
               s->items[i].col);
    }
}

// Returns the current number of elements in the stack.
int stackSize(Stack *s) {
    return s->top + 1;
}
