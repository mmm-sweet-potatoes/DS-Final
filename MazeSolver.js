const maze = [['#','#','#','#','#','#','#','#','#','#'],
			  ['#','.','.','.','.','#','.','.','.','#'],
			  ['#','#','#','#','.','#','.','#','.','#'],
			  ['#','.','.','#','.','.','.','#','.','F'],
			  ['S','.','#','#','#','#','.','#','#','#'],
			  ['#','#','#','.','.','#','.','#','.','#'],
			  ['#','.','#','.','#','#','.','#','.','#'],
			  ['#','.','.','.','#','.','.','.','.','#'],
			  ['#','#','#','#','#','#','#','#','#','#']];

function findSAndF(maze) {
	let start = null;
	let finish = null;
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[0].length; c++) {
	        if (maze[r][c] == 'S') {
	      	    start = `${r},${c}` //sets start as string coordinate
	        };
	        if (maze[r][c] == 'F') {
	      	    finish = `${r},${c}` //sets finish as string coordinate
	  		};
    	}
  	}
	return {start, finish};
}

function buildGraph(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    const graph = {};

    const directions = [[1, 0], //down
					    [-1, 0], //up
					    [0, 1], //right
					    [0, -1]]; //left

	function isValid(r, c) {
		return r >= 0 && //checks to be sure if the row iteration is not negative
			   r < rows && //checks to be sure if the row iteration is never passes the number of rows (must iterate from 0 -> (# of rows-1))
		       c >= 0 && //checks to be sure if the column iteration is not negative
		       c < cols && //checks to be sure if the column iteration is never passes the number of coloumbs (must iterate from 0 -> (# of column-1))
		       maze[r][c] !== '#'; //checks to be sure it walls aren't validated
	}

	for (let r = 0; r < rows; r++) { //iterates through the rows
		for (let c = 0; c < cols; c++) { //iterates through column
			if (maze[r][c] == '#') continue; //if wall skip to next index in array

			const node = `${r},${c}`; //turns current node into string coordinate
			graph[node] = []; //adds current node's string coordinate as a vertex

			//for loop checks each direction and runs the validation function. if it passes true then an edge is created
			for (let [dr, dc] of directions) {
				const adjacentr = r + dr;
				const adjacentc = c + dc;

				if (isValid(adjacentr, adjacentc)) {
				  graph[node].push(`${adjacentr},${adjacentc}`); //pushes the adjacent coocoordinate onto the graph as an edge
				}
			}
		}
	}
    return graph;
}
