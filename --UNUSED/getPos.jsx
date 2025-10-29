const getPos = pos => {
  const placeholderBoard = Array(8)
    .fill()
    .map(() => Array(8).fill(0));

  for (const key in pos) {
    const [row, col] = squareToMatrixIndex(key);
    placeholderBoard[row][col] = pos[key];
  }
  const processBoard = processChessBoard(placeholderBoard);
  const fenString = boardToFen(processBoard);
  const finalBoard = calcSqs(true, true, processBoard, false);

  const checkForNodes = finalBoard => {
    if (typeof window === 'undefined') return;

    const checkNode = finalBoard => {
      const square = document.querySelector("[data-square='a3']");
      if (square && !isLoaded) {
        clearInterval(intervalId);
        finalBoard.map((row, rowIndex) => {
          row.map((col, colIndex) => {
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                const squareNotation = matrixIndexToChessNotation(
                  rowIndex,
                  colIndex
                );
                const currentSquare = document.querySelector(
                  `[data-square='${squareNotation}']`
                );
                const value = col;
                if (value >= 1) {
                  currentSquare.className = `cell whiteSquare${value}`;
                  currentSquare.style = '';
                } else if (value <= -1) {
                  currentSquare.className = `cell blackSquare${value * -1}`;
                  currentSquare.style = '';
                } else {
                  const coords = isWhiteSquare([rowIndex, colIndex]);
                  currentSquare.className = `cell ${coords}`;
                  currentSquare.style = '';
                }
              });
            }
          });
        });
      }
      // setIsLoaded(true);
    };
    const intervalId = setInterval(checkNode, 100);
    checkNode(finalBoard);
    return () => clearInterval(intervalId);
  };
  checkForNodes(finalBoard);
};
