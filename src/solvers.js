/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  if(n==1) {
    return [[1]];
  } 
  let solution;
  let boardObject = new Board({ n : n });
  //We'll make a board that is a nxn matrix
  var rooks = 0;

  //Build a recursive function to add additional rook and test for conflicts
  var helper = function(boardObject, startIndex) {
    let board = boardObject.attributes;
    if(rooks === n && !boardObject.hasAnyRowConflicts(board) && !boardObject.hasAnyColConflicts(board)){
      solution = board;
      
    }else if (startIndex === (n*n) || rooks > n) {
      return;
    }else{
      //iterate over matrix -- fix this \/  
      for (var i = startIndex; i < (n*n-1); i++) {
        //check if current[i] is 0, if it is, change it to 1
        var numberOfRows = n;
        var numberOfCols = n;
        var rowIndex = Math.floor(i / numberOfRows);
        var colIndex = Math.floor(i % numberOfCols);
        //if (board[rowIndex][colIndex] === 0) {
        board[rowIndex][colIndex] = 1;
        rooks++;
        if(!boardObject.hasAnyRowConflicts(board) && !boardObject.hasAnyColConflicts(board)) {
          helper(boardObject, startIndex +1);
        }
        board[rowIndex][colIndex] = 0;
        //}
        //We'll call our hasAnyConflicts helper on each grid
        // if (rooks > 1 && !this.hasAnyRowConflicts(board) && !this.hasAnyColConflicts(board)) {
        //   helper(board, startIndex + 1);
        // }
      }
    }
  }
  //Return the first matrix that passes
  helper(boardObject, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
