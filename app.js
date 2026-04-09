const rows = 10, cols = 10;
let maze = [];

function createGrid() {
  const table = document.getElementById("maze");
  table.innerHTML = "";
  maze = [];

  for (let r = 0; r < rows; r++) {
    const tr = document.createElement("tr");
    maze[r] = [];

    for (let c = 0; c < cols; c++) {
      const td = document.createElement("td");
      const input = document.createElement("input");

      input.type = "text";
      input.maxLength = 1;
      input.size = 1;

      input.oninput = () => {
        maze[r][c] = input.value.toUpperCase() || ' ';
      };

      td.appendChild(input);
      tr.appendChild(td);

      maze[r][c] = ' ';
    }

    table.appendChild(tr);
  }
}

function solve() {
  const converted = convertMaze(maze);

  const graph = buildGraph(converted);
  const { start, finish } = findSAndF(converted);

  if (!start || !finish) {
    alert("Need both S and F");
    return;
  }

  let visited = {};
  let parent = {};

  const found = DFSPossible(graph, start, finish, visited, parent);

  if (!found) {
    alert("No path found");
    return;
  }

  const path = DFSPath(parent, start, finish);

  let solved = convertMaze(maze);

  for (let node of path) {
    let [r, c] = node.split(',').map(Number);

    if (solved[r][c] !== 'S' && solved[r][c] !== 'F') {
      solved[r][c] = 'P';
    }
  }

  colourSolvedMaze(solved);
}

function resetMaze() {
  createGrid();
}

function convertMaze(inputMaze) {
  return inputMaze.map(row =>
    row.map(cell => {
      if (cell === 'W') return 'W';
      if (cell === 'S') return 'S';
      if (cell === 'F') return 'F';
      return ' '; // FIXED
    })
  );
}

function colourSolvedMaze(solved) {
  const table = document.getElementById("maze");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const td = table.rows[r].cells[c];
      const input = td.querySelector("input");
      const val = solved[r][c].toUpperCase();

      td.className = "";

      if (val === "W") td.classList.add("wall"); // FIXED
      else if (val === "S") td.classList.add("start");
      else if (val === "F") td.classList.add("finish");
      else if (val === "P") td.classList.add("path");

      input.value = (val === "S" || val === "F") ? val : "";
    }
  }
}

createGrid();
