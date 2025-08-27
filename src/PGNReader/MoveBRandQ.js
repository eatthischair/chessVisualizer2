import {isInBounds} from '../utils/PureFuncs';

const moveBRandQ = (
  index,
  calcForWhite,
  piece,
  type,
  slice,
  pinnedPiecesIndices,
  pinnedPieces,
) => {
  slice = JSON.parse(JSON.stringify(slice));

  const recurse = (currentIndex, incrementY, incrementX) => {
    let newY = currentIndex[0] + incrementY;
    let newX = currentIndex[1] + incrementX;
    let inBounds = isInBounds(newY, newX);

    let isPinned;
    let pinnedIndex;
    if (pinnedPiecesIndices.length !== 0) {
      pinnedPiecesIndices.forEach((coords, index) => {
        let [pinnedRow, pinnedCol] = coords;
        if (pinnedRow === newY && pinnedCol === newX) {
          isPinned = true;
          pinnedIndex = index;
        }
      });
    }
    //need to find if move from current sq to pgn sq is legal.
    //use recursecallobj of the said piece

    if (!inBounds) return;

    let sqHasPiece = slice[newY][newX] !== 0;
    let pieceId = slice[newY][newX];
    let currentSqType = slice[newY][newX][0];

    let isQueen;
    if (isPinned) {
      let callObj =
        pinnedPieces[pinnedIndex].pinnedPieceCallObj[
          currentSqType.toUpperCase()
        ];
      if (currentSqType.toUpperCase() === 'Q') {
        callObj = pinnedPieces[pinnedIndex].pinnedPieceCallObj;
        isQueen = true;
      }
      //this is awful code i will fix this later
      if (isQueen) {
        for (let pieceType in callObj) {
          for (let cardinalDir in callObj[pieceType]) {
            for (let indx in callObj[pieceType][cardinalDir]) {
              let incrementsArr = callObj[pieceType][cardinalDir][indx];
              let [incY, incX] = incrementsArr;
              let recurseY = newY * 1;
              let recurseX = newX * 1;
              while (isInBounds(recurseY, recurseX)) {
                recurseY += incY;
                recurseX += incX;
                if (recurseY === index[0] && recurseX === index[1]) {
                  isPinned = false;
                }
              }
            }
          }
        }
      } else {
        for (let cardinalDir in callObj) {
          for (let indx in callObj[cardinalDir]) {
            let incrementsArr = callObj[cardinalDir][indx];
            let [incY, incX] = incrementsArr;
            let recurseY = newY * 1;
            let recurseX = newX * 1;
            while (isInBounds(recurseY, recurseX)) {
              recurseY += incY;
              recurseX += incX;
              if (recurseY === index[0] && recurseX === index[1]) {
                isPinned = false;
              }
            }
          }
        }
      }
      //index is sq to go to
      //newY newX is the potential og source of the piece
      //if index can be added subtracted by callobj increments, to equal newY, newX then that piece is the one to move
    }

    if (sqHasPiece) {
      if (currentSqType === piece && !isPinned) {
        // if (currentSqType === piece) {
        slice[index[0]][index[1]] = pieceId;
        slice[newY][newX] = 0;
        return;
      } else {
        return;
      }
    } else {
      recurse([newY, newX], incrementY, incrementX);
    }
  };

  var recurseCallObj = {
    B: {
      NE: [
        [1, -1],
        [-1, 1],
      ],
      NW: [
        [1, 1],
        [-1, -1],
      ],
    },
    R: {
      N: [
        [1, 0],
        [-1, 0],
      ],
      W: [
        [0, -1],
        [0, 1],
      ],
    },
  };

  let callObj;
  if (type === 'B') {
    callObj = recurseCallObj.B;
  }
  if (type === 'R') {
    callObj = recurseCallObj.R;
  }
  if (type === 'Q') {
    for (let type in recurseCallObj) {
      for (let direction in recurseCallObj[type]) {
        let arr = recurseCallObj[type][direction];
        arr.forEach(increments => {
          recurse(index, increments[0], increments[1]);
        });
      }
    }
  } else {
    for (let key in callObj) {
      let arr = callObj[key];
      arr.forEach(increments => {
        recurse(index, increments[0], increments[1]);
      });
    }
  }
  return slice;
};

export default moveBRandQ;
