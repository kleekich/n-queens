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
  //let solutionsArr = [];
  if(n==1) {
    return [[1]];
  } 
  let solution;
  let boardObject = new Board({ n : n });
  //We'll make a board that is a nxn matrix
  var rooks = 0;
  //var found = false;
  //count = 0
  //Build a recursive function to add additional rook and test for conflicts
  var helper = function(boardObject, startIndex) {
    let board = boardObject.rows();
    if(rooks === n+1 && !boardObject.hasAnyRowConflicts(board) && !boardObject.hasAnyColConflicts(board)){
      //solutionsArr.push(board)
      //solution = board;
      //found = true;
      return board;
    }else if (startIndex === (n*n) || rooks > n) {
      return;
    }else{
      //iterate over matrix 
      for (var i = startIndex; i < (n*n); i++) {
        //check if current[i] is 0, if it is, change it to 1
        var numberOfRows = n;
        var numberOfCols = n;
        var rowIndex = Math.floor(i / numberOfRows);
        var colIndex = Math.floor(i % numberOfCols);
        //if (board[rowIndex][colIndex] === 0) {
        board[rowIndex][colIndex] = 1;
        rooks++;
        if(!boardObject.hasAnyRowConflicts(board) && !boardObject.hasAnyColConflicts(board)) {
          var newIndex = i+1;
          var result = helper(boardObject, newIndex);
          return result;
        }else{
          board[rowIndex][colIndex] = 0;
          rooks--;
        }
        //if(!found) {
          
        //}
        
        
      }
    }
  }
  //Return the first matrix that passes
  solution = helper(boardObject, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  let solutionsArr = [];
  if(n==1) {
    return [[1]];
  } 
  let solution;
  let boardObject = new Board({ n : n });
  //We'll make a board that is a nxn matrix
  var rooks = 0;
  //count = 0
  //Build a recursive function to add additional rook and test for conflicts
  var helper = function(boardObject, startIndex) {
    let board = boardObject.attributes;
    if(rooks === n && !boardObject.hasAnyRowConflicts(board) && !boardObject.hasAnyColConflicts(board)){
      solutionsArr.push(board)
      // solution = board;
      return;
    }else if (startIndex === (n*n) || rooks > n) {
      return;
    }else{
      //iterate over matrix 
      for (var i = startIndex; i < (n*n); i++) {
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
        rooks--;
        //}
        //We'll call our hasAnyConflicts helper on each grid
        // if (rooks > 1 && !this.hasAnyRowConflicts(board) && !this.hasAnyColConflicts(board)) {
        //   helper(board, startIndex + 1);
        // }
      }
    }
  }
  solutionsCount = solutionsArr.length;
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
