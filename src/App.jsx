import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useEffect, useState, useMemo, useRef } from 'react';
import { calcSqs } from './ColorCalculations/calcSqs.js';
import {
  squareToMatrixIndex,
  matrixIndexToChessNotation,
  isWhiteSquare,
  boardToFen,
  fenToBoard,
  initialBoardFEN,
  squareColors,
} from './utils';
import { ImportGame, PgnReader, ParsePlayerNames } from './PGNReader';
import { BottomBar, LeftSideBar, RightSideBar } from './UI/SideAndBottomBars';

import { UseBoardArray } from './Hooks/UseBoardArray.jsx';
import { Header } from './UI/Header/Header.jsx';

export default function App() {
  //-----------------------/// game state
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;
  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [boardArray, setBoardArray] = useState([]);
  //-----------------------///

  //--------// Buttons states & hooks
  const [blackCtrlOn, setBlackCtrlOn] = useState(true);
  const [whiteCtrlOn, setWhiteCtrlOn] = useState(true);
  const [boardIsFlipped, setBoardIsFlipped] = useState(false);
  const {
    updateBoardArray,
    getNextBoard,
    getPreviousBoard,
    getFirstBoard,
    getLastBoard,
    removeBoardArray,
  } = UseBoardArray();
  //--------//

  ///---PGN states---///
  const [currentPgn, setCurrentPgn] = useState('');
  const [pgnValid, setPgnValid] = useState(true);
  const [playerNames, setPlayerNames] = useState('');
  const pgnInput = e => {
    setCurrentPgn(e.target.value);
  };

  const readPgn = pgn => {
    //set all states for displaying a game
    let { boardArray, pgnIsValid } = PgnReader(pgn);
    setCurrentPgn(pgn);
    setPgnValid(pgnIsValid);
    setPlayerNames(ParsePlayerNames(pgn));
    setChessPosition(initialBoardFEN);
    boardToFen(boardArray[10], 11);
    const fenArray = boardArray.map((board, index) => boardToFen(board, index));
    setBoardArray(fenArray);
    updateBoardArray(fenArray);
    console.log('readpgn', boardArray, fenArray);
  };

  function onPieceDrop({ sourceSquare, targetSquare }) {
    if (!targetSquare) {
      return false;
    }
    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      setChessPosition(chessGame.fen());
      return true;
    } catch {
      return false;
    }
  }

  const [squareStyles, setSquareStyles] = useState({});

  const chessboardOptions = {
    position: chessPosition,
    squareStyles,
    onPieceDrop,
  };

  useEffect(() => {
    let board = fenToBoard(chessPosition);
    let colorMatrix = calcSqs(blackCtrlOn, whiteCtrlOn, board, boardIsFlipped);
    let clone = structuredClone(squareStyles);

    // document.startViewTransition(() => {
    colorMatrix.forEach((row, i) => {
      row.forEach((value, j) => {
        let square = matrixIndexToChessNotation(i, j);

        let str = '';
        if (value >= 1) {
          str = `whiteSquare${value}`;
        } else if (value <= -1) {
          str = `blackSquare${value * -1}`;
        } else {
          const coords = isWhiteSquare([i, j]);
          str = coords;
        }

        clone[square] = {
          background: squareColors[str],
          transition: 'background-color 2s ease, opacity 1200ms',
        };
      });
    });
    setSquareStyles(clone);
    // });
  }, [chessPosition]);

  return (
    <div className="border-2 p-2 ">
      <div className="p-2 border">
        <Header playerNames={playerNames} />
      </div>
      <main className="flex justify-center p-4">
        <aside className="border-2">
          <LeftSideBar readPgn={readPgn} />
        </aside>
        <div className=" border max-w-[500px] max-h-[500px] border-blue-200 p-4">
          <Chessboard options={chessboardOptions} />
        </div>
        <RightSideBar
          setWhiteCtrlOn={setWhiteCtrlOn}
          whiteCtrlOn={whiteCtrlOn}
          setBlackCtrlOn={setBlackCtrlOn}
          blackCtrlOn={blackCtrlOn}
          setBoardIsFlipped={setBoardIsFlipped}
          boardIsFlipped={boardIsFlipped}
        />
      </main>

      <div className="">
        <div className="flex justify-center">
          <ImportGame
            pgnInput={setCurrentPgn}
            readPgn={readPgn}
            currentPgn={currentPgn}
            pgnValid={pgnValid}
          />
        </div>
        {/* <BottomBar
        currentPgn={currentPgn}
        setChessPosition={setChessPosition}
        getNextBoard={getNextBoard}
        getPreviousBoard={getPreviousBoard}
        getFirstBoard={getFirstBoard}
        getLastBoard={getLastBoard}
      /> */}
      </div>
    </div>
  );
}
