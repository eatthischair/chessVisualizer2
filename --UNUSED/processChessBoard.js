export const processChessBoard = board => {
  const pieceCounts = {};
  const newBoard = board.map(row =>
    row.map(piece => {
      if (piece) {
        const simplified =
          piece[0] === 'w' ? piece[1].toUpperCase() : piece[1].toLowerCase();
        pieceCounts[simplified] = (pieceCounts[simplified] || 0) + 1;
        return simplified + pieceCounts[simplified];
      } else {
        return piece;
      }
    })
  );
  return newBoard;
};
