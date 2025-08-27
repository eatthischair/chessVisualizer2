//-----------------
//UNUSED
//---------------
export const ContestedSqs = (colorMatrix, redSqBoard, blueSqBoard) => {
  for (let i = 0; i < colorMatrix.length; i++) {
    for (let j = 0; j < colorMatrix[i].length; j++) {
      let contested = redSqBoard[i][j] !== 0 && blueSqBoard[i][j] !== 0;

      if (colorMatrix[i][j] === 0 && contested) {
        colorMatrix[i][j] = false;
      }
    }
  }
  return colorMatrix;
};
