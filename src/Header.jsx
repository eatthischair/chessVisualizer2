export const Header = ({ playerNames }) => {
  return (
    <div className="flex justify-center">
      <h1 className="flex justify-center body-font font-GreatVibes text-6xl mt-4">
        Chess Visualizer
      </h1>
      <div className="flex justify-center">
        {playerNames ? playerNames : <br></br>}
      </div>
    </div>
  );
};
