import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import useKeyboardNavigation from '../../Hooks/UseKeyboardNavigation';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
const BottomBar = ({
  currentPgn,
  setChessPosition,
  getNextBoard,
  getPreviousBoard,
  getLastBoard,
  getFirstBoard,
}) => {
  //arrow key event listeners
  const first = () => {
    setChessPosition(getFirstBoard());
  };

  const next = () => {
    setChessPosition(getNextBoard());
  };
  const prev = () => {
    setChessPosition(getPreviousBoard());
  };
  const last = () => {
    setChessPosition(getLastBoard());
  };
  useKeyboardNavigation(next, prev, last, first);

  return (
    <div className="flex justify-center p-4">
      {currentPgn ? (
        <span className=" flex gap-32">
          <span onClick={() => first()}>
            <ChevronFirst color="var(--text)" />
          </span>
          <span onClick={() => prev()}>
            <ChevronLeft color="var(--text)" />
          </span>
          <span onClick={() => next()}>
            <ChevronRight color="var(--text)" />
          </span>
          <span onClick={() => last()}>
            <ChevronLast color="var(--text)" />
          </span>
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default BottomBar;
