import { Tooltip } from "react-tooltip";
export default function DisplaySimButtons({
  handlePackOpen,
  packsOpened,
  allPacksOpened,
  curSetName,
}: {
  handlePackOpen: (isBox: boolean) => void;
  packsOpened: number;
  allPacksOpened: any;
  curSetName: string;
}) {
  return (
    <div className="flex justify-center items-center gap-1">
      <button
        className="flex w-fit border border-green-500 bg-green-300 rounded-lg p-1"
        onClick={() => handlePackOpen(false)}
      >
        Pack
      </button>
      <button
        className=" flex w-fit border border-red-500 bg-red-300 rounded-lg p-1"
        onClick={() => handlePackOpen(true)}
      >
        Box
      </button>
      <div className="flex items-center">Packs Opened: {packsOpened}</div>
      <div className="flex items-center">
        <h1
          data-tooltip-id="my-tooltip-1"
          className="flex justify-center items-center text-center rounded-full border-2 border-gray-500 h-6 w-6"
        >
          ?
        </h1>
      </div>
      <Tooltip id="my-tooltip-1" place="bottom" className="z-50">
        <div className="text-[14px]">
          <div>
            This pack opener is based on more recent booster sets from the
            scarlet violet era so older sets should be inaccurate.
          </div>
          <div>
            Pokémon Center Support: Each booster pack contains 10 game cards: 4
            commons, 3 uncommons, and 3 foils (at least one of which will be
            rare or higher).
          </div>
          <div>
            But mine will do 1 common-rare (reverse holo slot), 1 common-rare+
            (reverse holo slot), and rare+ for the holocards. common 45%, rare
            40%, rare 15% or rare 12%, rare+ 3%.
          </div>
        </div>
      </Tooltip>
      {allPacksOpened.hasOwnProperty(curSetName) && (
        <div className="flex items-center bg-blue-200">
          <h1
            data-tooltip-id="my-tooltip-2"
            className="flex justify-center items-center text-center border-2 border-gray-500 p-1"
          >
            Pack Info
          </h1>
        </div>
      )}

      <Tooltip id="my-tooltip-2" place="bottom" className="z-50 text-2xl">
        <div className="text-[14px]">
          {allPacksOpened.hasOwnProperty(curSetName) &&
            Object.keys(allPacksOpened[curSetName]).map((key) => (
              <div key={key}>
                {key}: {allPacksOpened[curSetName][key]}
              </div>
            ))}
        </div>
      </Tooltip>
    </div>
  );
}
