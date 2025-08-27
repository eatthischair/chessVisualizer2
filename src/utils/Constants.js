export const blackPawnVals = [
  [1, 1],
  [1, -1],
];

export const whitePawnVals = [
  [-1, -1],
  [-1, 1],
];

export const emptyMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const initialBoard = [
  ['r1', 'n1', 'b1', 'q1', 'k1', 'b2', 'n2', 'r2'],
  ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
  ['R1', 'N1', 'B1', 'Q1', 'K1', 'B2', 'N2', 'R2'],
];

export const initialBoardFEN =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const kingSqVals = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const knightSqVals = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [-1, -2],
  [1, -2],
];

export const recurseCallObj = {
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
