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

// export const squareColors = {

//   lightSquare: '#feffd7',
//   darkSquare: '#feffd9f5',
//   whiteSquare1: '#ffdef5',
//   whiteSquare2: '#ffbcde',
//   whiteSquare3: '#fe9ac6',
//   whiteSquare4: '#fe78af',
//   whiteSquare5: '#fd5697',
//   whiteSquare6: '#fd3480',
//   whiteSquare7: '#fc1268',
//   blackSquare1: '#bad5ff',
//   blackSquare2: '#a1bcff',
//   blackSquare3: '#87a3ff',
//   blackSquare4: '#6e8bff',
//   blackSquare5: '#5472ff',
//   blackSquare6: '#3b59ff',
//   blackSquare7: '#2140ff',
// };

export const squareColors = {
  lightSquare: 'linear-gradient(135deg, #feffd7 0%, #e8eaa0 100%)',
  darkSquare: 'linear-gradient(135deg, #feffd9f5 0%, #d5d7a8 100%)',
  whiteSquare1: 'linear-gradient(135deg, #ffdef5 0%, #ffb8de 100%)',
  whiteSquare2: 'linear-gradient(135deg, #ffbcde 0%, #ff92c0 100%)',
  whiteSquare3: 'linear-gradient(135deg, #fe9ac6 0%, #fe68a3 100%)',
  whiteSquare4: 'linear-gradient(135deg, #fe78af 0%, #fe4686 100%)',
  whiteSquare5: 'linear-gradient(135deg, #fd5697 0%, #fd246e 100%)',
  whiteSquare6: 'linear-gradient(135deg, #fd3480 0%, #fd0257 100%)',
  whiteSquare7: 'linear-gradient(135deg, #fc1268 0%, #d00040 100%)',
  blackSquare1: 'linear-gradient(135deg, #bad5ff 0%, #8cb8ff 100%)',
  blackSquare2: 'linear-gradient(135deg, #a1bcff 0%, #739dff 100%)',
  blackSquare3: 'linear-gradient(135deg, #87a3ff 0%, #5982ff 100%)',
  blackSquare4: 'linear-gradient(135deg, #6e8bff 0%, #4067ff 100%)',
  blackSquare5: 'linear-gradient(135deg, #5472ff 0%, #264cff 100%)',
  blackSquare6: 'linear-gradient(135deg, #3b59ff 0%, #0d31ff 100%)',
  blackSquare7: 'linear-gradient(135deg, #2140ff 0%, #0016d0 100%)',
};
