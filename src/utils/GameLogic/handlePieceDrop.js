export function handlePieceDrop({
  sourceSquare,
  targetSquare,
  chessGame,
  setChessPosition,
}) {
  if (!targetSquare) {
    return false;
  }
  try {
    chessGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    setChessPosition(chessGame.fen());
    return true;
  } catch {
    return false;
  }
}
