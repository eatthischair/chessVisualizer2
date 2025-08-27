import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import RenderPieces from '../utils/RenderPieces.js';
import {setPos} from '../ContextFiles/MousePos.jsx';

const Sidebar = ({
  pieceObj,
  clearBoard,
  setWhiteCtrlOn,
  whiteCtrlOn,
  setBlackCtrlOn,
  blackCtrlOn,
  setBoardIsFlipped,
  boardIsFlipped,
  setCurrentBoard,
  getFirstBoard,
}) => {
  const [showPieceElements, setShowPieceElements] = useState(false);

  return (
    <div className="flex w-64 h-[400px] shadow-md">
      <ul className="menu menu-vertical lg:menu-horizontal bg-inherit rounded-box">
        <li>
          <button
            className="btn-secondary"
            onClick={() => {
              setCurrentBoard(getFirstBoard());
            }}>
            Starting Position
          </button>
        </li>
        <li>
          <button className="btn-secondary" onClick={() => clearBoard()}>
            Clear Board
          </button>
        </li>
        <li>
          <button
            className="btn-secondary"
            onClick={() => setShowPieceElements(!showPieceElements)}>
            Add Pieces
          </button>
          {showPieceElements ? (
            <div>
              <div className="flex flex-wrap w-[210px] h-[220px] h-16 overflow-y-scroll">
                {Object.keys(pieceObj).map((pieceId, index) => {
                  return (
                    <RenderPieces
                      pieceId={pieceId}
                      pieceElement={Object.entries(pieceObj)[index][1]}
                    />
                  );
                })}
              </div>
              <div
                className="w-16 h-12 text-[40px] text-gray-400 ml-2"
                onDragOver={() => setPos(null)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          ) : (
            ''
          )}
        </li>
        <li>
          <div className="form-control w-52 h-16">
            <label className="cursor-pointer label">
              <span className="label-text text-sm">
                Disable White Square Ctrl
              </span>
              <input
                type="checkbox"
                value=""
                className="toggle toggle-primary"
                onClick={() => setWhiteCtrlOn(!whiteCtrlOn)}
              />
            </label>
          </div>
        </li>
        <li>
          <div className="form-control w-52 h-16">
            <label className="cursor-pointer label ">
              <span className="label-text text-sm">
                Disable Black Square Ctrl
              </span>
              <input
                type="checkbox"
                className="toggle"
                onClick={() => {
                  setBlackCtrlOn(!blackCtrlOn);
                }}
              />
            </label>
          </div>
        </li>
        <li>
          <button
            className="btn-secondary"
            onClick={() => setBoardIsFlipped(!boardIsFlipped)}
            type="button">
            Flip Board
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
