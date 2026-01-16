import { useEffect } from 'react';
import { calcSqs } from '../ColorCalculations/calcSqs.js';
import {
  fenToBoard,
  matrixIndexToChessNotation,
  isWhiteSquare,
} from '../utils/pureFuncs.js';
import { squareColors } from '../utils/constants.js';
export default function useUpdateColors(
  setSquareStyles,
  squareStyles,
  blackCtrlOn,
  whiteCtrlOn,
  boardIsFlipped,
  chessPosition
) {
  useEffect(() => {
    if (!chessPosition) {
      return;
    }
    document.startViewTransition(() => {
      let board = fenToBoard(chessPosition);
      let colorMatrix = calcSqs(
        blackCtrlOn,
        whiteCtrlOn,
        board,
        boardIsFlipped
      );
      let clone = structuredClone(squareStyles);

      colorMatrix.forEach((row, i) => {
        row.forEach((value, j) => {
          let square = matrixIndexToChessNotation(i, j);

          let str = '';
          if (value >= 1 && whiteCtrlOn) {
            str = `whiteSquare${value}`;
          } else if (value <= -1 && blackCtrlOn) {
            str = `blackSquare${value * -1}`;
          } else {
            const coords = isWhiteSquare([i, j]);
            str = coords;
          }

          clone[square] = {
            background: squareColors[str],
          };
        });
      });
      setSquareStyles(clone);
    });
  }, [chessPosition, blackCtrlOn, whiteCtrlOn, boardIsFlipped]);
}
