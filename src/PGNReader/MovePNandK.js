import { isInBounds } from '../utils/pureFuncs';

const movePawnKnightandKing = (
  index,
  calcForWhite,
  piece,
  incrementArray,
  slice,
  currentRow,
  currentColumn,
  pawnColumn,
  isEnPassant,
  pinnedPiecesIndices
) => {
  slice = JSON.parse(JSON.stringify(slice));
  let pawnFound = false;
  let i = 0;

  while (i < incrementArray.length && !pawnFound) {
    let increment = incrementArray[i];
    let row = currentRow + increment[0];
    let column = currentColumn + increment[1];

    if (isInBounds(row, column)) {
      let isPinned;
      if (pinnedPiecesIndices) {
        pinnedPiecesIndices.forEach(coords => {
          let [pinnedRow, pinnedCol] = coords;
          if (pinnedRow === row && pinnedCol === column) {
            isPinned = true;
          }
        });
      }
      let pieceId = slice[row][column];
      let currentSqPiece = slice[row][column][0];
      if (currentSqPiece === piece && !isPinned) {
        if (pawnColumn || pawnColumn === 0) {
          if (column === pawnColumn) {
            slice[row][column] = 0;
            slice[currentRow][currentColumn] = pieceId;
            pawnFound = true;
            if (isEnPassant) {
              let pawnRow = calcForWhite ? currentRow + 1 : currentRow - 1;
              slice[pawnRow][currentColumn] = 0;
            }
          }
        } else {
          slice[row][column] = 0;
          slice[currentRow][currentColumn] = pieceId;
        }
      }
    }
    i++;
  }
  return slice;
};

const queeningPawn = (
  calcForWhite,
  coords,
  slice,
  queenCount,
  pawnCaptureColumn,
  promotedPiece
) => {
  slice = JSON.parse(JSON.stringify(slice));
  let [row, column] = coords;
  slice[row][column] = calcForWhite
    ? `${promotedPiece}${queenCount}`
    : `${promotedPiece.toLowerCase()}${queenCount}`;
  if (pawnCaptureColumn) {
    column = pawnCaptureColumn.charCodeAt(0) - 97;
  }
  let pawnToDeleteRow = calcForWhite ? 1 : 6;
  slice[pawnToDeleteRow][column] = 0;
  return slice;
};

const determinePawnVals = (
  isPawnCapture,
  calcForWhite,
  currentIndex,
  slice,
  pawnId,
  isEnPassant
) => {
  let pawnColumn = pawnId.charCodeAt(0) - 97;
  var pawnVals;
  var whitePawnCaptureVals = [
    [1, -1],
    [1, 1],
  ];
  var blackPawnCaptureVals = [
    [-1, -1],
    [-1, 1],
  ];
  if (calcForWhite) {
    pawnVals = [
      [1, 0],
      [2, 0],
    ];
  } else {
    pawnVals = [
      [-1, 0],
      [-2, 0],
    ];
  }
  if (isPawnCapture) {
    if (calcForWhite) {
      pawnVals = whitePawnCaptureVals;
    } else {
      pawnVals = blackPawnCaptureVals;
    }
  }
  let currentRow = currentIndex[0];
  let currentColumn = currentIndex[1];
  let pieceToSearchFor = calcForWhite ? 'P' : 'p';
  slice = movePawnKnightandKing(
    currentIndex,
    calcForWhite,
    pieceToSearchFor,
    pawnVals,
    slice,
    currentRow,
    currentColumn,
    pawnColumn,
    isEnPassant
  );
  return slice;
};

export { movePawnKnightandKing, determinePawnVals, queeningPawn };
