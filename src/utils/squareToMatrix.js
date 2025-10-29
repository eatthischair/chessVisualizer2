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
