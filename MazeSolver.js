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
function DFSPossible(graph, currentNode, finalNode, visited, parent){
  visited[currentNode] = true; 
  if (currentNode == finalNode) {
    return true;
  }
  for (let neighbourNode of graph[currentNode]){
    if (visited[neighbourNode]) continue;
    parent[neighbourNode] = currentNode;
    if(DFSPossible(graph, neighbourNode, finalNode, visited, parent)){
      return true;
    }
  }
  return false;
}
function DFSPath(parent, start, finish) {
  let path = [];
  let current = finish;

  while (current !== undefined) {
    path.push(current);
    current = parent[current];
  }

  path.reverse();
  return path;
}

const graph = buildGraph(maze);
const {start, finish} = findSAndF(maze);
let visited = {};
let parent = {};
console.log(DFSPossible(graph, start, finish, visited, parent));
