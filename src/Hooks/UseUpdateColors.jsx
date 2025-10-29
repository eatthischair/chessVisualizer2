import {useEffect} from 'react';
import {calcSqs} from '../ColorCalculations/calcSqs.js'
import {fenToBoard, matrixIndexToChessNotation, isWhiteSquare} from '../utils/pureFuncs.js'

export const UseUpdateColors = {setSquareStyles, blackCtrlOn, whiteCtrlOn, board, boardIsFlipped, chessPosition} => {


  useEffect(() => {
    let board = fenToBoard(chessPosition);
    let colorMatrix = calcSqs(blackCtrlOn, whiteCtrlOn, board, boardIsFlipped);
    let clone = structuredClone(squareStyles);

    // document.startViewTransition(() => {
    colorMatrix.forEach((row, i) => {
      row.forEach((value, j) => {
        let square = matrixIndexToChessNotation(i, j);

        let str = '';
        if (value >= 1) {
          str = `whiteSquare${value}`;
        } else if (value <= -1) {
          str = `blackSquare${value * -1}`;
        } else {
          const coords = isWhiteSquare([i, j]);
          str = coords;
        }

        clone[square] = {
          background: squareColors[str],
          transition: 'background-color 2s ease, opacity 1200ms',
        };
      });
    });
    setSquareStyles(clone);
    // });
  }, [chessPosition])
};
