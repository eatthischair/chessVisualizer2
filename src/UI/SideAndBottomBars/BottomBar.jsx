import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from '@fortawesome/free-solid-svg-icons';
import useKeyboardNavigation from '../../Hooks/UseKeyboardNavigation';

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
    <div className="gap-x-32 p-8">
      {currentPgn ? (
        <span className="border w-full h-full grid grid-cols-4">
          <span onClick={() => first()}>
            <FontAwesomeIcon icon={faBackwardFast} size="xl" />
          </span>
          <span onClick={() => prev()}>
            <FontAwesomeIcon icon={faBackwardStep} size="xl" />
          </span>
          <span onClick={() => next()}>
            <FontAwesomeIcon icon={faForwardStep} size="xl" />
          </span>
          <span onClick={() => last()}>
            <FontAwesomeIcon icon={faForwardFast} size="xl" />
          </span>
        </span>
      ) : (
        ''
      )}
    </div>
  );
};

export default BottomBar;
