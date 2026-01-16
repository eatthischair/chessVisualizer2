export const Header = ({ playerNames }) => {
  return (
    <div className="flex justify-center flex-col p-0 ">
      <h1 className="flex justify-center body-font font-GreatVibes text-md ">
        Chess Visualizer
      </h1>
      <div className="flex justify-center text-lg min-h-8">
        {playerNames ? playerNames : ''}
      </div>
    </div>
  );
};
