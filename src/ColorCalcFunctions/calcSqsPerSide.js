import { isInBounds } from '../utils/PureFuncs';
import checkForAbsolutePin from './checkForAbsolutePin';
import { emptyMatrix } from '../utils/Constants';
import {
  kingSqVals,
  knightSqVals,
  whitePawnVals,
  blackPawnVals,
  recurseCallObj,
} from '../utils/Constants';

const CalcSqsPerSide = (positionBoard, calcForWhite) => {
  //each Vals array corresponds to the X and Y increment values a piece can move to from the square it is currently placed. Kings, Knights, and Pawns have static values while Queens, Rooks and Bishops can be blocked
  let pawnVals;
  calcForWhite ? (pawnVals = whitePawnVals) : (pawnVals = blackPawnVals);

  recurseCallObj.P = {
    NW: pawnVals[0],
    NE: pawnVals[1],
  };
  //this object is used for all pieces. When a piece is absolutely pinned (i.e. moving the piece would result in the King being captured, it cannot move except along the diagonal/file/rank it is pinned on, which is why the calls are organized in the cardinal directions). If a piece is pinned, all values are deleted except the cardinal direction by which it is pinned

  //this returns an array of the pinned pieces (if there are any) for the side that is being calculated, with their callObj only containing the direction it is pinned.
  let pinnedPieceArray = checkForAbsolutePin(
    positionBoard,
    calcForWhite,
    recurseCallObj
  );

  const checkDiagonals = (index, checkType, isWhitePiece, callObj) => {
    let coordinates = [];

    const recursiveFunc = (index, incrementX, incrementY) => {
      let [row, column] = index;
      let newRow = row + incrementX;
      let newColumn = column + incrementY;
      let newIndex = [newRow, newColumn];

      if (!isInBounds(newRow, newColumn)) return;

      let sqPiece = positionBoard[newRow][newColumn];
      let sqHasPiece = sqPiece !== 0;

      //this is to check if the piece blocking the path of the piece being calculated can move in the same direction (called a Battery). If so, instead of stopping the calculation it will continue along that direction until it reaches a piece that cannot move in the same direction, or is an opponents piece. However it will continue if the piece is the opponent's King, to better illustrate Mating Nets.

      if (sqHasPiece) {
        let pinned = false;
        //A battery cannot take place if the second piece in the battery is pinned (i.e. cannot move)
        for (let i = 0; i < pinnedPieceArray.length; i++) {
          let index = pinnedPieceArray[i].pinnedPieceIndex;
          if (index && index[0] === newRow && index[1] === newColumn) {
            pinned = true;
          }
        }

        let sqPieceIsWhite =
          positionBoard[newRow][newColumn] ===
          positionBoard[newRow][newColumn].toUpperCase();
        sqPiece = sqPiece.toUpperCase();
        let bothSameColor = isWhitePiece === sqPieceIsWhite;
        let samePieceType = sqPiece[0] === checkType || sqPiece[0] === 'Q';
        let pieceIsOppKing = sqPiece === 'K1' && !bothSameColor;
        //this is because bishops and queens can recapture on a square a pawn captures on
        let pawnBattery =
          checkType === 'B' &&
          sqPiece[0] === 'P' &&
          ((isWhitePiece && incrementX === -1) ||
            (!isWhitePiece && incrementX === 1));

        if (pawnBattery && bothSameColor) {
          let pawnBatteryIndex = [newRow + incrementX, newColumn + incrementY];
          coordinates.push(pawnBatteryIndex);
        }
        if ((samePieceType && bothSameColor && !pinned) || pieceIsOppKing) {
          coordinates.push(newIndex);
          recursiveFunc(newIndex, incrementX, incrementY);
        } else {
          coordinates.push(newIndex);
          return;
        }
      } else {
        coordinates.push(newIndex);
        recursiveFunc(newIndex, incrementX, incrementY);
      }
    };

    for (let key in callObj) {
      let callIncrementsArray = callObj[key];
      if (callIncrementsArray.length !== 0) {
        callIncrementsArray.forEach(callIncrement => {
          recursiveFunc(index, callIncrement[0], callIncrement[1]);
        });
      }
    }
    return coordinates;
  };

  //the deep copies necessary as otherwise all 3 matrices would have the same memory location and overwrite each other

  //each value totals the number of times a square is controlled by pieces per side.
  let sqCtrlBySum = JSON.parse(JSON.stringify(emptyMatrix));
  //each value is equal to the lowest value piece controlling that square, per side, where pawns = 5 and kings = 1
  let sqCtrlByPriority = JSON.parse(JSON.stringify(emptyMatrix));
  //each value is equal to the piece on that square, given a priority where pawns = 5 and kings = 1
  let piecesByPriority = JSON.parse(JSON.stringify(emptyMatrix));

  const updateCallObjandPinStatus = (pinnedPieceArray, callObj, i, j) => {
    let pinned = false;
    pinnedPieceArray.forEach(item => {
      if (item.pinnedPieceIndex[0] === i && item.pinnedPieceIndex[1] === j) {
        callObj = item.pinnedPieceCallObj;
        pinned = true;
      }
    });
    return [callObj, pinned];
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let sqValue = positionBoard[i][j];
      let [callObj, pinned] = updateCallObjandPinStatus(
        pinnedPieceArray,
        recurseCallObj,
        i,
        j
      );

      let isWhitePiece = sqValue !== 0 && sqValue.toUpperCase() === sqValue;
      if (sqValue !== 0) sqValue = sqValue.toUpperCase();
      let correctPieceColor = calcForWhite === isWhitePiece;

      if (correctPieceColor) {
        if (sqValue[0] === 'K') {
          piecesByPriority[i][j] = 1;
          kingSqVals.forEach(num => {
            let rowIndex = i + num[0];
            let columnIndex = j + num[1];
            if (isInBounds(rowIndex, columnIndex)) {
              sqCtrlBySum[rowIndex][columnIndex] += 1;
              sqCtrlByPriority[rowIndex][columnIndex] = Math.max(
                sqCtrlByPriority[rowIndex][columnIndex],
                1
              );
            }
          });
        }
        if (sqValue[0] === 'N') {
          piecesByPriority[i][j] = 4;
          //If a knight is pinned, it cannot move at all, which is why we can forgo all calculation if it is
          if (!pinned) {
            knightSqVals.forEach(num => {
              let rowIndex = i + num[0];
              let columnIndex = j + num[1];
              if (isInBounds(rowIndex, columnIndex)) {
                sqCtrlBySum[rowIndex][columnIndex] += 1;
                sqCtrlByPriority[rowIndex][columnIndex] = Math.max(
                  sqCtrlByPriority[rowIndex][columnIndex],
                  4
                );
              }
            });
          }
        }
        if (sqValue[0] === 'P') {
          piecesByPriority[i][j] = 5;
          for (let key in callObj.P) {
            let incrementArray = callObj.P[key];
            if (incrementArray.length !== 0) {
              let rowIndex = i + incrementArray[0];
              let columnIndex = j + incrementArray[1];
              if (isInBounds(rowIndex, columnIndex)) {
                sqCtrlBySum[rowIndex][columnIndex] += 1;
                sqCtrlByPriority[rowIndex][columnIndex] = Math.max(
                  sqCtrlByPriority[rowIndex][columnIndex],
                  5
                );
              }
            }
          }
        }
        if (sqValue[0] === 'B') {
          piecesByPriority[i][j] = 4;
          let coordinates = [i, j];
          let diagonalArray = checkDiagonals(
            coordinates,
            'B',
            isWhitePiece,
            callObj.B
          );
          diagonalArray.forEach(square => {
            let row = square[0];
            let column = square[1];
            sqCtrlBySum[row][column] += 1;
            sqCtrlByPriority[row][column] = Math.max(
              sqCtrlByPriority[row][column],
              4
            );
          });
        }
        if (sqValue[0] === 'R') {
          piecesByPriority[i][j] = 3;
          let coordinates = [i, j];
          let rookArray = checkDiagonals(
            coordinates,
            'R',
            isWhitePiece,
            callObj.R
          );
          rookArray.forEach(square => {
            let row = square[0];
            let column = square[1];
            sqCtrlBySum[row][column] += 1;
            sqCtrlByPriority[row][column] = Math.max(
              sqCtrlByPriority[row][column],
              3
            );
          });
        }
        if (sqValue[0] === 'Q') {
          piecesByPriority[i][j] = 2;
          let coordinates = [i, j];
          let bishopArray = checkDiagonals(
            coordinates,
            'B',
            isWhitePiece,
            callObj.B
          );
          bishopArray.forEach(square => {
            let row = square[0];
            let column = square[1];
            sqCtrlBySum[row][column] += 1;
            sqCtrlByPriority[row][column] = Math.max(
              sqCtrlByPriority[row][column],
              2
            );
          });
          let rookArray = checkDiagonals(
            coordinates,
            'R',
            isWhitePiece,
            callObj.R
          );
          rookArray.forEach(square => {
            let row = square[0];
            let column = square[1];
            sqCtrlBySum[row][column] += 1;
            sqCtrlByPriority[row][column] = Math.max(
              sqCtrlByPriority[row][column],
              2
            );
          });
        }
      }
    }
  }

  if (!calcForWhite) {
    sqCtrlBySum.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        sqCtrlBySum[rowIndex][columnIndex] = square * -1;
      });
    });
  }
  return [sqCtrlBySum, sqCtrlByPriority, piecesByPriority];
};

export default CalcSqsPerSide;
