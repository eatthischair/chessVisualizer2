import { useRef } from 'react';

export const UseMousePosition = () => {
  const currentHoverPosition = useRef(null);

  const setPos = id => {
    console.log('id', id);
    currentHoverPosition.current = id;
  };
  const getPos = () => {
    console.log('getpos', currentHoverPosition.current);

    return currentHoverPosition.current;
  };

  return { setPos, getPos };
};
