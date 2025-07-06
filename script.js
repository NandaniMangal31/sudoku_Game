const b = null;

const bdl = [
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b]
]
const bd2 = [
    [1,b,b,b,b,b,b,b,b],
    [b,b,2,b,b,b,b,b,b],
    [b,b,b,b,3,b,b,b,b],
    [b,1,b,b,b,b,4,b,b],
    [b,b,4,b,b,b,b,b,5],
    [b,b,b,b,b,b,b,6,b],
    [b,b,b,6,b,b,7,b,b],
    [b,b,b,b,b,8,b,b,b],
    [b,b,b,b,9,b,b,b,b]
]
const bd3 = [
    [1,2,3,4,5,6,7,8,b],
    [b,b,b,b,b,b,b,b,2],
    [b,b,b,b,b,b,b,b,3],
    [b,b,b,b,b,b,b,b,4],
    [b,b,b,b,b,b,b,b,5],
    [b,b,b,b,b,b,b,b,6],
    [b,b,b,b,b,b,b,b,7],
    [b,b,b,b,b,b,b,b,8],
    [b,b,b,b,b,b,b,b,9]
]
const bd4 = [
    [1,2,3,4,5,6,7,8,b],
    [b,b,b,b,b,b,b,b,1],
    [b,b,b,b,b,b,b,b,2],
    [b,b,b,b,b,b,b,b,3],
    [b,b,b,b,b,b,b,b,4],
    [b,b,b,b,b,b,b,b,5],
    [b,b,b,b,b,b,b,b,6],
    [b,b,b,b,b,b,b,b,7],
    [b,b,b,b,b,b,b,b,8]
]
function solve(board){
    if(solved(board)){
        return board;
    }else{
        const possiblities = nextboards(board); //check all the possiblities
        const validboards =  keeponlyvalid(possiblities); // for every possiblities we have to prune them and all the invalide boards are retur in valid boards
        return searchforsolution(validboards); //now we would have an array of valid sudoku board so this is an helper function.
    }
}
function searchforsolution(boards){
    if(boards.length<1){
        return false;
    }else{
        //backtracking code
        var first = boards.shift();
        const trypath =  solve(first);
        if(trypath!=false){
            return trypath;
        }else{
            return searchforsolution(boards);
        }
    }
}
function solved(board){
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
           if(board[i][j]===null){
            return false;
           }
        }
    }
    return true;
}
function nextboards(board){
    const res = [];
    const firstempty = findemptysquare(board); //it gives the coordinate
    if(firstempty!=undefined){
        const y = firstempty[0];
        const x = firstempty[1];
        for(i=1;i<=9;i++) {
            let newboard = board.map(row => [...row]); 
              newboard[y][x] = i;
              res.push(newboard);
        } //fill the empty board from the 1-9 numbers
    }
    return res;
}
function findemptysquare(board){
     for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
           if(board[i][j]===null){
            return [i,j];
           }
        }
    }
}
function keeponlyvalid(boards){
    return boards.filter(b=>validboards(b));
}
function validboards(board){
    return rowgood(board) && columngood(board) && boxesgood(board); //not conatins any duplicete numbers
}
function rowgood(board){
    for(var i=0;i<9;i++){
        curr = [];                  //use to check the duplicacy
        for(var j=0;j<9;j++){
            if(curr.includes(board[i][j])){
                return false;
            }else if(board[i][j]!=null){
                curr.push(board[i][j]);
            }
        }
    }
    return true;
}

function columngood(board){
        for(var i=0;i<9;i++){
        curr = [];
        for(var j=0;j<9;j++){
            if(curr.includes(board[j][i])){
                return false;
            }else if(board[j][i]!=null){
                curr.push(board[j][i]);
            }
        }
    }
    return true;
}
function boxesgood(board){
    const boxcoordinates = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2]
    ]
    for(var y=0;y<9;y+=3){    //it shifts the whole box upto 3 units down
        for(var x=0;x<9;x+=3){
            curr = [];
            for(var i=0;i<9;i++){
                var coordinates = [...boxcoordinates[i]];
                coordinates[0]+=y;
                coordinates[1]+=x;
                if(curr.includes(board[coordinates[0]][coordinates[1]])){
                    return false;
                }else if(board[coordinates[0]][coordinates[1]] !=null){
                    curr.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true;
}
window.onload = () => {
    const boardContainer = document.getElementById("board");
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "1");
        boardContainer.appendChild(input);
    }
};


function startSolving() {
    const inputs = document.querySelectorAll("input");
    const board = [];

    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const val = inputs[i * 9 + j].value.trim();
            if (val === "") {
                row.push(null);
            } else {
                const num = parseInt(val);
                if (isNaN(num) || num < 1 || num > 9) {
                    alert("Invalid number detected. Please enter digits between 1 and 9 only.");
                    return;
                }
                row.push(num);
            }
        }
        board.push(row);
    }

    if (!validboards(board)) {
        alert("Invalid Sudoku! There are duplicate numbers in rows, columns, or boxes.");
        return;
    }

    const solvedBoard = solve(board);
    if (!solvedBoard) {
        alert(" No solution found. The puzzle may be incorrect or unsolvable.");
        return;
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = solvedBoard[i][j];
        }
    }

    alert(" Sudoku solved successfully!");
}




function clearBoard(){
        const inputs = document.querySelectorAll("input");
          inputs.forEach(input => input.value = "")
}
function reloadPage(){
    location.reload();
}

window.startSolving = startSolving;
window.clearBoard = clearBoard;
window.reloadPage = reloadPage;