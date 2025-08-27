import '../App.css';
import {useState} from 'react';
import usePreviousColorMatrix from '../CustomHooks/UsePrevColorMatrix';
import {useEffect} from 'react';
import {RenderLogic} from './RenderLogic';
import {initialBoard} from '../utils/Constants.js';
const RenderBoard = ({currentBoard, pieceObj, colorMatrix, boardIsFlipped}) => {
  const [colorMatrixStack] = usePreviousColorMatrix(colorMatrix);
  const [board, setBoard] = useState(initialBoard);

  //this useEffect is to re-render to the board twice using css transitions
  //first slightly discolors squares that have changed values to highlight how pieces move,
  //second renders the 'correct' square colors

  useEffect(() => {
    let boardToMap = currentBoard;

    let newBoard = RenderLogic(
      boardToMap,
      currentBoard,
      colorMatrix,
      colorMatrixStack,
      pieceObj,
      false,
    );
    if (boardIsFlipped) {
      newBoard = newBoard.map(row => row.reverse()).reverse();
    }

    setBoard(newBoard);

    const timer = setTimeout(() => {
      let newBoard = RenderLogic(
        boardToMap,
        currentBoard,
        colorMatrix,
        colorMatrixStack,
        pieceObj,
        true,
      );

      if (boardIsFlipped) {
        newBoard = newBoard.map(row => row.reverse()).reverse();
      }

      setBoard(newBoard);
    }, 200);

    return () => clearTimeout(timer);
  }, [currentBoard, colorMatrix, colorMatrixStack, pieceObj, boardIsFlipped]);

  return <div className="chessboard">{board}</div>;
};
export default RenderBoard;
