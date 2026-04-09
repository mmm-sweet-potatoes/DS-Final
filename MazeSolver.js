// Function to locate the start (S) and finish (F) positions in the maze
function findSAndF(maze) {
    let start = null;
    let finish = null;

    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[0].length; c++) {
            if (maze[r][c] === 'S') {
                start = `${r},${c}`;
            }
            if (maze[r][c] === 'F') {
                finish = `${r},${c}`;
            }
        }
    }

    return { start, finish };
}

// Function to convert the maze into a graph (adjacency list)
function buildGraph(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    const graph = {};
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    function isValid(r, c) {
        return r >= 0 &&
               r < rows &&
               c >= 0 &&
               c < cols &&
               maze[r][c] !== 'W';
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (maze[r][c] === 'W') continue;

            const node = `${r},${c}`;
            graph[node] = [];

            for (let [dr, dc] of directions) {
                const adjacentr = r + dr;
                const adjacentc = c + dc;

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
