
#include <stdio.h>
#include "maze.h"
#include "stack.h"
#include "queue.h"
#include "linkedlist.h"
#include "stats.h"
#include "solver.h"

void compareAlgorithms(Maze *maze);

int main() {
    Maze maze;
    LinkedList pathList;
    MazeStats stats;

    int choice;
    

    loadDefaultMaze(&maze);
    initList(&pathList);
    initStats(&stats);
    

    do {
        printf("\n====================================\n");
        printf("       MAZE NAVIGATION SYSTEM\n");
        printf("====================================\n");
        printf("1. Display Maze\n");
        printf("2. Solve using DFS\n");
        printf("3. Solve using BFS\n");
        printf("4. Display Linked List\n");
        printf("5. Delete First Linked List Node\n");
        printf("6. Display Statistics\n");
        printf("7. Compare DFS and BFS\n");
        printf("8. Load Maze from File\n");
        printf("9. Reset to Default Maze\n");
        printf("10. Exit\n");
        printf("====================================\n");

        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input!\n");
            while (getchar() != '\n');
            continue;
        }

        switch (choice) {

            case 1:
                displayMaze(&maze);
                break;

            case 2:
                printf("\nRunning DFS...\n");
                solveDFS(&maze, 1);
                break;

            case 3:
                printf("\nRunning BFS...\n");
                solveBFS(&maze);
                break;

            case 4:
                displayList(&pathList);
                break;

            case 5:
                if (deleteFromBeginning(&pathList))
                    printf("First node deleted.\n");
                else
                    printf("Linked list is empty.\n");
                break;

            case 6:
                displayStats(&stats);
                break;

            case 7:
                compareAlgorithms(&maze);
                break;

            case 8: {
                char filename[100];

                printf("Enter maze filename: ");
                scanf("%99s", filename);

                if (loadMaze(&maze, filename)) {
                    printf("Maze loaded successfully!\n");
                    
                } else {
                    printf("Unable to load maze.\n");
                }
                break;
            }

            case 9:
                loadDefaultMaze(&maze);
                printf("Default maze restored!\n");
                
                break;

            case 10:
                printf("Thank you for using Maze Navigation System!\n");
                break;

            default:
                printf("Invalid choice! Try again.\n");
        }

    } while (choice != 10);

    freeList(&pathList);

    return 0;
}
