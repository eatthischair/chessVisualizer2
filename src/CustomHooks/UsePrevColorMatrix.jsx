import {useState, useEffect} from 'react';

const usePreviousColorMatrix = colorMatrix => {
  const [colorMatrixStack, setColorMatrixStack] = useState([null]);

  useEffect(() => {
    setColorMatrixStack(prevStack => {
      const newStack = [...prevStack, colorMatrix];
      if (newStack.length >= 3) {
        newStack.shift();
      }
      return newStack;
    });
  }, [colorMatrix]);

  return colorMatrixStack;
};

export default usePreviousColorMatrix;
