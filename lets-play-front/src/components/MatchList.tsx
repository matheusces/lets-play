import { matchs } from "../utils/matchs"
import users from '../assets/users.svg';
import { MatchProps } from "../types/type";

interface MatchListProps {
  handleToggleMatchSelected: (match: MatchProps) => void,
}

function MatchList({ handleToggleMatchSelected }: MatchListProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-2 hide-scroll-bar overflow-scroll">
      {matchs.map((match, index) => (
          <button key={index} className="w-[40rem] h-24 bg-panel-item rounded-lg flex items-center justify-between p-4 text-2xl text-white font-outline-1 gap-2 hover:drop-shadow-primary" onClick={() => handleToggleMatchSelected(match)}>
            <div className="flex flex-col">
              <span className="text-3xl">{match.game}</span>
              <span className="w-72 text-primary overflow-ellipsis font-outline-0">{match.description}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span>{match.participants.length}</span>
                <img className="w-10 h-10" src={users} alt="estrutura de uma torneio" title="Tamanho do torneio" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span>{match.time}</span>
                <span>{match.date}</span>
              </div>
            </div>
          </button>
        ))}
    </div>
  )
}

export default MatchList