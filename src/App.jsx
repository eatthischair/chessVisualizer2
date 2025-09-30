import './App.css';
import { Chessboard } from 'react-chessboard';
import { useEffect, useState, useMemo, useRef } from 'react';
import { squareToMatrixIndex } from './utils/squareToMatrix';
import { processChessBoard } from './utils/processChessBoard';
import { calcSqs } from './ColorCalcFunctions/calcSqs';
import {
  matrixIndexToChessNotation,
  isWhiteSquare,
  boardToFen,
} from './utils/PureFuncs.js';
import { Chess } from 'chess.js';
import ImportGame from './PGNReader/ImportGame';
import PgnReader from './PGNReader/PgnReader.js';
import BottomBar from './SideAndBottomBars/BottomBar';
// import RightSidebar from './SideAndBottomBars/RightSideBar.jsx';
import LeftSideBar from './SideAndBottomBars/LeftSideBar';
import { UseBoardArray } from './CustomHooks/UseBoardArray';
import { Header } from './Header';
import ParsePlayerNames from './PGNReader/ParsePlayerNames.js';
import { initialBoardFEN } from './utils/Constants.js';

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

  const [squareStyles, setSquareStyles] = useState({
    e4: {
      backgroundColor: 'rgba(255,0,0,0.2)',
    },
  });

  const chessboardOptions = {
    position: chessPosition,
    squareStyles,
    onPieceDrop,
  };

  return (
    <div className="">
      <Header playerNames={playerNames}></Header>

      <main className="grid grid-cols-2 !gap-0">
        <aside className=" ">
          <LeftSideBar readPgn={readPgn} />
        </aside>
        <div className="border w-78 ">
          <Chessboard options={chessboardOptions} />
        </div>
      </main>

      <div className="grid gap-x-32">
        <ImportGame
          pgnInput={setCurrentPgn}
          readPgn={readPgn}
          currentPgn={currentPgn}
          pgnValid={pgnValid}
        />
        <BottomBar
          currentPgn={currentPgn}
          setChessPosition={setChessPosition}
          getNextBoard={getNextBoard}
          getPreviousBoard={getPreviousBoard}
          getFirstBoard={getFirstBoard}
          getLastBoard={getLastBoard}
        />
      </div>
    </div>
  );
}
