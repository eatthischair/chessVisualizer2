import {NormalString, NullString} from './ColorStr';
import {RenderCell} from './RenderCell';

export const RenderLogic = (
  boardToMap,
  currentBoard,
  colorMatrix,
  colorMatrixStack,
  pieceObj,
  normalRender,
) => {
  let board = boardToMap.map((currentRow, index) => {
    return currentRow.map((currentCell, cellIndex) => {
      let matrixIndex = [index, cellIndex];
      let keyString = `${index}${cellIndex}`;

      let row = index;
      let column = cellIndex;
      var positionBoardPiece = currentBoard[row][column];
      let colorSum = colorMatrix[row][column];

      if (colorSum > 7) colorSum = 7;
      if (colorSum < -7) colorSum = -7;

      let piece;
      if (positionBoardPiece !== 0) {
        piece = pieceObj[positionBoardPiece];
      }
      let color;
      if (normalRender) {
        color = NormalString(colorSum, matrixIndex);
      } else {
        color = NullString(
          colorSum,
          matrixIndex,
          colorMatrix,
          colorMatrixStack,
          row,
          column,
        );
      }

      return (
        <div>
          <RenderCell
            keyString={keyString}
            color={color}
            piece={piece}
            matrixIndex={matrixIndex}
          />
        </div>
      );
    });
  });
  return board;
};
