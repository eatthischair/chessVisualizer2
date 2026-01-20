export const indexToCoord = index => {
  let remainder = index % 8;
  let multiple = (index - remainder) / 8;
  return [multiple, remainder];
};

export const isInBounds = (rowIndex, columnIndex) => {
  let rowInBounds = rowIndex >= 0 && rowIndex <= 7;
  let columnInBounds = columnIndex >= 0 && columnIndex <= 7;
  if (rowInBounds && columnInBounds) return true;
  return false;
};

export const isWhiteSquare = coords => {
  if ((coords[0] + coords[1]) % 2 === 0) return 'lightSquare';
  return 'darkSquare';
};

export const pieceType = (pieceString, isWhitePiece) => {
  let isPawn =
    pieceString.charCodeAt(0) >= 97 && pieceString.charCodeAt(0) <= 104;
  if (isPawn) pieceString = 'P';
  if (!isWhitePiece) pieceString = pieceString.toLowerCase();
  return pieceString;
};

//-----------------------/
//takes coordination from PGN Notation (e.g. 'e4') and converts to coordinates on the 2d array [5, 5]
//-----------------------/
export const chessNotationToMatrixCoords = notationCoords => {
  let yIndex = notationCoords.charCodeAt(0) - 97;
  let xIndex = Math.abs(notationCoords[1] - 8);
  return [xIndex, yIndex];
};

export function matrixIndexToChessNotation(row, col) {
  const file = String.fromCharCode('a'.charCodeAt(0) + col);
  const rank = 8 - row;

  return `${file}${rank}`;
}

export const boardToFen = (board, moveNum) => {
  const whoseTurn = moveNum % 2 ? 'w' : 'b';

  let fen = '';

  if (!board) return;
  for (let row = 0; row < 8; row++) {
    let emptyCount = 0;

    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece === 0) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }

        fen += piece[0];
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }

    if (row < 7) {
      fen += '/';
    }
  }
  const finalFEN = `${fen} ${whoseTurn} - - 0 1`;
  return finalFEN;
};

export function fenToBoard(fenString) {
  console.log('fenstring', typeof fenString);
  const boardPart = fenString.split(' ')[0];
  const rows = boardPart.split('/');
  const pieceCounts = {};

  const board = rows.map(row => {
    const rowArray = [];

    for (let char of row) {
      if (!isNaN(char)) {
        for (let i = 0; i < parseInt(char); i++) {
          rowArray.push(0);
        }
      } else {
        if (!pieceCounts[char]) {
          pieceCounts[char] = 0;
        }
        pieceCounts[char]++;
        rowArray.push(`${char}${pieceCounts[char]}`);
      }
    }
    return rowArray;
  });

  return board;
}
export const flipBoard = fen => {
  const firstSpaceIndex = fen.indexOf(' ');
  const firstPart = fen.slice(0, firstSpaceIndex);
  const rest = fen.slice(firstSpaceIndex);

  const reversedFirstPart = firstPart.split('').reverse().join('');

  return reversedFirstPart + rest;
};

export const squareToMatrixIndex = square => {
  if (!/^[a-h][1-8]$/.test(square)) {
    throw new Error(
      'Invalid square: must be a letter a-h followed by a number 1-8 (e.g., "a1", "h8")'
    );
  }

  const file = square[0];
  const rank = square[1];
  const col = file.charCodeAt(0) - 'a'.charCodeAt(0);
  const row = 8 - parseInt(rank);

  return [row, col];
};
