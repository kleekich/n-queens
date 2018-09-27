// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    //this tells us where in the first row to start your diagonal
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //Get row using by get()
      let row = this.get(rowIndex);
      
      //make counter variable
      let counter = 0;

      //Iterate over 
      for(var i = 0 ; i < row.length; i++){
        //if we encounter 1 we add to our counter
        if(row[i]===1) {
          counter++;
        }
      }
      
      //if our counter is greater than 1 we return true
      if(counter > 1){
        return true;
      }
       return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
    //We need to check all the rows here
    //We need to use this.get('n') <--this lets us get the # of rows
    //We'll use a for loop through 0 - 'n' (not including n)
    //Each time we loop through we'll call hasRowConflictAt(i)
    
    let n = this.get('n');

    for (var i = 0; i < n; i++) {
      //if the below ever returns true
      if (this.hasRowConflictAt(i)) {
        return true;
      }
    }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      //create a counter variable
      

      //we iterate all the rows
          //let arr = this.get(0) => [0,0,0,0] => arr[colIndex]
          //if row[i][colIndex] === 1 we increament counter by 1, check if counter is greater than 1
      let counter = 0;
      let numRows = this.get('n');
      
      for (var i = 0; i < numRows; i++) {
        var currentRow = this.get(i);
        if (currentRow[colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //Declare variable numCol = this.get('n');
      //Iterate through to numCol
        //call hasColConflictAt(i)
      let numCol = this.get('n');
      for(var i = 0; i < numCol; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(firstIndex) {
      let matrix = this.rows();
      let counter = 0;
      let n = this.get('n');
      
      //negative index cases
      if(firstIndex < 0){
        let startRow = Math.abs(firstIndex);
        let j = 0;
        for( var i = startRow ; i < n; i++){
          if(matrix[i][j] === 1){
            counter++;
          }
          if( counter >1){
            return true;  
          }
          j++;
        }
      //positive indexes cases 
      //For right half of matrix, use colIndex as colume index  
      }else{
        let startCol = firstIndex;
        let i = 0;
        //Using starting point, Iterate our matrix j = start
        for (var j = startCol; j < n; j++) {
          //if matrix[i][j] is 1, counter++
          if (matrix[i][j] === 1) {
            counter++;
          }
          if (counter > 1) {
            return true;
          }
          //increment rowIndex
          i++;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      //Iterate bottom row range(0, n) to check left half of matrix
      for (var j = 0; j < n-1; j++) {
        //get first rowIndex using _getFirstRowColumnIndexForMajorDiagonalOn
        let firstColIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(n-1, j);
        //if any has conflict, return true;
        if (this.hasMajorDiagonalConflictAt(firstColIndex)) {
          return true;
        }  
      }
      //Iterate rihgt col range(n-2, 0) to check right half of matrix
      for (var i = n-1; i >= 0; i--) {
        let firstRowIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(i, n-1);
        if (this.hasMajorDiagonalConflictAt(firstRowIndex)) {
          return true;
        }
      }
      
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(firstIndex) {
      //We set a variable to be our matrix      
      //We're starting at the top right of our matrix and going right to left
      //As we iterate we decrement our colIndex while incrementing our row so that we 
      //go down and left as we check for Queens

      let matrix = this.rows();
      let counter = 0;
      let n = this.get('n')
    
      if (firstIndex < n) {
        //left half case
        let startCol = firstIndex;
        let row = 0;
        //Here we set our start as the firstIndex passed in, and decrement as we iterate
        for (var j = starCol; j >= 0; j--) {
          if (matrix[row][j] === 1) {
            counter++;
          }
          if (counter > 1) {
            return true;
          }
          //increment row so we head down
          row++;
        }
      } else {
        //right half case
        //We need to subtract 3 from starting row to get proper index within matrix
        let startRow = firstIndex - (n - 1) ;
        let col = n - 1
        for (var i = startRow; i < n-1; i++) {
          if (matrix[i][col] === 1) {
            counter++
          }
          if (counter > 1) {
            return true;
          }
        col--;
        }
      }  
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
    //We want to get our starting index by calling _getFirstRowColumnIndexForMinorDiagonalOn
    //We want to call hasMinorDiagonalConflictAt on the left and bottom most indexes
    //stop if we get a true
    let n = this.get('n');

    for (var i = 0; i < n; i++) {
      let firstIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(i, 0);
      if (this.hasMinorDiagonalConflictAt(firstIndex)) {
        return true;
      }
    }
    for (var j = 1; j < n; j++) {
      let firstIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(n-1, j);
      if (this.hasMinorDiagonalConflictAt(firstIndex)) {
        return true;
      }
    }      
    return false;
  }    
});    

/*--------------------  End of Helper Functions  ---------------------*/


 

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
