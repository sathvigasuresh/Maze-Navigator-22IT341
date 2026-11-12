
#include <stdio.h>
#include <stdlib.h>
#include "linkedlist.h"

// Initialize an empty linked list.
void initList(LinkedList *list) {
    list->head = NULL;
    list->size = 0;
}

// Insert a new position at the end.
int insertAtEnd(LinkedList *list, Position p) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    Node *temp;

    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return 0;
    }

    newNode->data = p;
    newNode->next = NULL;

    if (list->head == NULL) {
        list->head = newNode;
    } else {
        temp = list->head;

        while (temp->next != NULL) {
            temp = temp->next;
        }

        temp->next = newNode;
    }

    list->size++;
    return 1;
}

// Display all positions.
void displayList(LinkedList *list) {
    Node *temp = list->head;

    if (temp == NULL) {
        printf("Linked list is empty.\n");
        return;
    }

    printf("\nMAZE PATH USING LINKED LIST:\n");

    while (temp != NULL) {
        printf("(%d,%d)",
               temp->data.row,
               temp->data.col);

        if (temp->next != NULL)
            printf(" -> ");

        temp = temp->next;
    }

    printf("\n");
}

// Delete the first node.
int deleteFromBeginning(LinkedList *list) {
    Node *temp;

    if (list->head == NULL)
        return 0;

    temp = list->head;
    list->head = list->head->next;

    free(temp);
    list->size--;

    return 1;
}

// Return the number of nodes.
int listSize(LinkedList *list) {
    return list->size;
}

// Free all allocated nodes.
void freeList(LinkedList *list) {
    Node *temp;

    while (list->head != NULL) {
        temp = list->head;
        list->head = list->head->next;
        free(temp);
    }

    list->size = 0;
}
