const handleCollisions = (board, calcForWhite, middleChar, piece, coords) => {
  calcForWhite ? (piece = piece.toUpperCase()) : (piece = piece.toLowerCase());

  board = JSON.parse(JSON.stringify(board));
  let charCode = middleChar.charCodeAt(0);
  let searchIndex;
  let pieceId;
  if (charCode >= 97 && charCode <= 104) {
    searchIndex = charCode - 97;
    for (var i = 0; i < 8; i++) {
      if (board[i][searchIndex][0] === piece) {
        pieceId = board[i][searchIndex];
        board[i][searchIndex] = 0;
      }
    }
    board[coords[0]][coords[1]] = pieceId;
  } else {
    let rowNum = Math.abs(middleChar - 8);
    for (var j = 0; j < 8; j++) {
      if (board[rowNum][j][0] === piece) {
        board[coords[0]][coords[1]] = board[rowNum][j];
        board[rowNum][j] = 0;
      }
    }
  }
  return board;
};

export default handleCollisions;
