/**
 * Singly Linked List Data Structure & Path Demonstration
 * Course: 22IT341 Data Structures | Thiagarajar College of Engineering
 *
 * Models the C99 singly linked list structure:
 * struct Node {
 *     int row;
 *     int col;
 *     int linearIndex;
 *     struct Node* next;
 * };
 */

import { Point, LinkedListNode } from '../types/maze';
import { getLinearIndex } from './presets';

export interface LinkedListState {
  nodes: LinkedListNode[];
  lastAction: 'init' | 'insertEnd' | 'deleteLast' | 'clear';
  affectedNodeIndex: number | null;
  cCodeSnapshot: string;
}

export function createInitialLinkedList(path: Point[], cols: number): LinkedListState {
  const nodes: LinkedListNode[] = path.map((pt, idx) => ({
    id: `node-${idx}-${pt.row}-${pt.col}`,
    point: { ...pt },
    linearIndex: getLinearIndex(pt.row, pt.col, cols)
  }));

  return {
    nodes,
    lastAction: 'init',
    affectedNodeIndex: null,
    cCodeSnapshot: `// Initialized Singly Linked List from active path (${nodes.length} nodes)\nstruct Node* head = buildPathList(path, pathLength);`
  };
}

export function insertEndNode(state: LinkedListState, point: Point, cols: number): LinkedListState {
  const newNode: LinkedListNode = {
    id: `node-${Date.now()}-${point.row}-${point.col}`,
    point: { ...point },
    linearIndex: getLinearIndex(point.row, point.col, cols)
  };

  const updatedNodes = [...state.nodes, newNode];
  const idx = updatedNodes.length - 1;

  return {
    nodes: updatedNodes,
    lastAction: 'insertEnd',
    affectedNodeIndex: idx,
    cCodeSnapshot: `// Insertion at end of Singly Linked List
struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
newNode->row = ${point.row};
newNode->col = ${point.col};
newNode->linearIndex = ${newNode.linearIndex};
newNode->next = NULL;

if (*head == NULL) {
    *head = newNode;
} else {
    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}`
  };
}

export function deleteLastNode(state: LinkedListState): LinkedListState {
  if (state.nodes.length === 0) {
    return {
      ...state,
      lastAction: 'deleteLast',
      affectedNodeIndex: null,
      cCodeSnapshot: `// Attempted deleteLast on EMPTY list
if (*head == NULL) {
    printf("Underflow: Linked List is empty.\\n");
    return;
}`
    };
  }

  const removedNode = state.nodes[state.nodes.length - 1];
  const updatedNodes = state.nodes.slice(0, -1);

  return {
    nodes: updatedNodes,
    lastAction: 'deleteLast',
    affectedNodeIndex: updatedNodes.length,
    cCodeSnapshot: `// Deletion at last node (Backtracking step: popped (${removedNode.point.row}, ${removedNode.point.col}))
if (*head == NULL) return;
if ((*head)->next == NULL) {
    free(*head);
    *head = NULL;
} else {
    struct Node* temp = *head;
    while (temp->next->next != NULL) {
        temp = temp->next;
    }
    free(temp->next);
    temp->next = NULL;
}`
  };
}
