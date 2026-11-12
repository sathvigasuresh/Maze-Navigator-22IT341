
#ifndef LINKEDLIST_H
#define LINKEDLIST_H

#include "stack.h"

typedef struct Node {
    Position data;
    struct Node *next;
} Node;

typedef struct {
    Node *head;
    int size;
} LinkedList;

void initList(LinkedList *list);
int insertAtEnd(LinkedList *list, Position p);
void displayList(LinkedList *list);
int deleteFromBeginning(LinkedList *list);
int listSize(LinkedList *list);
void freeList(LinkedList *list);

#endif
