const IsValid = boardArray => {
  let pgnIsValid = true;
  if (!boardArray) {
    pgnIsValid = false;
    return false;
  }

  boardArray.forEach((board, index) => {
    if (index > 0) {
      if (
        JSON.stringify(boardArray[index]) ===
          JSON.stringify(boardArray[index - 1]) ||
        boardArray[index] === undefined
      ) {
        pgnIsValid = false;
      }
    }
  });

  return pgnIsValid;
};

export default IsValid;
