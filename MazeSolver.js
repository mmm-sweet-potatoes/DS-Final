// 2D maze representation
// '#' = wall (blocked)
// '.' = open path
// 'S' = start
// 'F' = finish
const maze = [['#','#','#','#','#','#','#','#','#','#'],
              ['#','.','.','.','.','#','.','.','.','#'],
              ['#','#','#','#','.','#','.','#','.','#'],
              ['#','.','.','#','.','.','.','#','.','F'],
              ['S','.','#','#','#','#','.','#','#','#'],
              ['#','#','#','.','.','#','.','#','.','#'],
              ['#','.','#','.','#','#','.','#','.','#'],
              ['#','.','.','.','#','.','.','.','.','#'],
              ['#','#','#','#','#','#','#','#','#','#']];


// Function to locate the start (S) and finish (F) positions in the maze
function findSAndF(maze) {
    let start = null;
    let finish = null;

    // Iterate through every cell in the grid
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[0].length; c++) {

            // If start is found, store its coordinates as a string
            if (maze[r][c] === 'S') {
                start = `${r},${c}`;
            }

            // If finish is found, store its coordinates as a string
            if (maze[r][c] === 'F') {
                finish = `${r},${c}`;
            }
        }
    }

    // Return both positions
    return { start, finish };
}


// Function to convert the maze into a graph (adjacency list)
function buildGraph(maze) {
    const rows = maze.length;
    const cols = maze[0].length;

    // Graph represented as an object:
    // key = node ("r,c"), value = array of neighbors
    const graph = {};

    // Possible movements (actions)
    const directions = [
        [1, 0],   // move down
        [-1, 0],  // move up
        [0, 1],   // move right
        [0, -1]   // move left
    ];

    // Helper function to check if a position is valid
    function isValid(r, c) {
        return r >= 0 &&           // within top boundary
               r < rows &&         // within bottom boundary
               c >= 0 &&           // within left boundary
               c < cols &&         // within right boundary
               maze[r][c] !== '#'; // not a wall
    }

    // Traverse entire maze
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            // Skip walls since they are not valid nodes
            if (maze[r][c] === '#') continue;

            // Convert current cell into a node
            const node = `${r},${c}`;

            // Initialize adjacency list for this node
            graph[node] = [];

            // Check all 4 possible directions
            for (let [dr, dc] of directions) {
                const adjacentr = r + dr;
                const adjacentc = c + dc;

                // If adjacent cell is valid, create an edge
                if (isValid(adjacentr, adjacentc)) {
                    graph[node].push(`${adjacentr},${adjacentc}`);
                }
            }
        }
    }

    return graph;
}


// BFS algorithm to find the shortest path from start to finish
function solveMazeBFS(graph, start, finish) {

    // Queue for BFS traversal
    const queue = [start];

    // Set to track visited nodes
    const visited = new Set();

    // Object to store parent of each node (used to reconstruct path)
    const parent = {};

    // Mark start as visited and initialize its parent
    visited.add(start);
    parent[start] = null;

    // BFS loop
    while (queue.length > 0) {

        // Remove the first node from queue
        const current = queue.shift();

        // If we reached the goal, stop search
        if (current === finish) {
            break;
        }

        // Explore all neighbors of current node
        for (let neighbor of graph[current]) {

            // If neighbor has not been visited
            if (!visited.has(neighbor)) {

                // Mark as visited
                visited.add(neighbor);

                // Store how we reached this node
                parent[neighbor] = current;

                // Add to queue for further exploration
                queue.push(neighbor);
            }
        }
    }

    // If finish was never reached, no path exists
    if (!visited.has(finish)) {
        return null;
    }

    // Reconstruct shortest path from finish back to start
    const path = [];
    let current = finish;

    while (current !== null) {
        path.push(current);
        current = parent[current]; // move backwards using parent links
    }

    // Reverse path to get start → finish order
    path.reverse();

    return path;
}


// Function to visually mark the solution path in the maze
function markPathOnMaze(maze, path) {

    // Create a deep copy so original maze is not modified
    const mazeCopy = maze.map(row => [...row]);

    // Skip first and last (S and F), mark only intermediate path
    for (let i = 1; i < path.length - 1; i++) {

        // Convert "r,c" back to numbers
        const [r, c] = path[i].split(',').map(Number);

        // Replace '.' with '*'
        if (mazeCopy[r][c] === '.') {
            mazeCopy[r][c] = '*';
        }
    }

    return mazeCopy;
}


// Function to print maze in readable format
function printMaze(maze) {
    for (let row of maze) {
        console.log(row.join(' '));
    }
}


// ===== MAIN EXECUTION =====

// Find start and finish nodes
const { start, finish } = findSAndF(maze);

// Convert maze into graph
const graph = buildGraph(maze);

// Run BFS to find shortest path
const shortestPath = solveMazeBFS(graph, start, finish);

// Output results
if (shortestPath) {

    console.log("Shortest Path:", shortestPath);

    // Number of steps is edges = nodes - 1
    console.log("Number of steps:", shortestPath.length - 1);

    // Mark path on maze and print it
    const solvedMaze = markPathOnMaze(maze, shortestPath);

    console.log("\nSolved Maze:");
    printMaze(solvedMaze);

} else {
    console.log("No path found from S to F.");
}
