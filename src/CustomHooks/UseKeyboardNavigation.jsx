import { useEffect, useCallback } from 'react';

const useKeyboardNavigation = (next, prev, last, first) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      } else if (event.key === 'ArrowUp') {
        last();
      } else if (event.key === 'ArrowDown') {
        first();
      }
    },
    [next, prev, last, first]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyboardNavigation;
