import ParsePlayerNames from '../../PGNReader/ParsePlayerNames.js';
import { SelectedGames } from '../../utils/selectedGames.js';
import { GhostButton } from '../../components/ui/GhostButton.jsx';
const LeftSideBar = ({ readPgn }) => {
  return (
    <div className="flex justify-center h-[520px] m-0">
      <div className="w-64 h-[520px] overflow-x-clip overflow-y-scroll">
        <div className="flex flex-row">
          <div className="flex justify-center place-self-center basis-2 grow text-sm leading-3 indent-0 h-8 mt-4 font-semibold text-slate-100">
            Selected Games
          </div>
        </div>
        {SelectedGames.map((game, index) => (
          <GhostButton
            key={game}
            onClick={() => {
              readPgn(game);
            }}
            className="!justify-start !items-center"
          >
            {ParsePlayerNames(game)}
          </GhostButton>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
