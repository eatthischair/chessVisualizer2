const handleCastles = (calcForWhite, board, pgnItem) => {
  board = JSON.parse(JSON.stringify(board));

  if (calcForWhite) {
    board[7][4] = 0;
    if (pgnItem === 'O-O') {
      board[7][7] = 0;
      board[7][6] = 'K1';
      board[7][5] = 'R2';
    } else {
      board[7][0] = 0;
      board[7][2] = 'K1';
      board[7][3] = 'R1';
    }
  } else {
    board[0][4] = 0;
    if (pgnItem === 'O-O') {
      board[0][7] = 0;
      board[0][6] = 'k1';
      board[0][5] = 'r2';
    } else {
      board[0][0] = 0;
      board[0][2] = 'k1';
      board[0][3] = 'r1';
    }
  }
  return board;
};

export default handleCastles;
