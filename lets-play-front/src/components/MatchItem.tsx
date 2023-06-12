import { MatchProps } from "../types/type";

import wasteBinIcon from '../assets/waste-bin.svg';
import users from '../assets/users.svg';

interface MatchItemProps {
  match: MatchProps,
  handleDelete: (id: string) => void,
}


function MatchItem({ match, handleDelete }: MatchItemProps) {
  return (
    <div className="flex gap-2">
      <button className="w-[40rem] h-24 bg-panel-item rounded-lg flex items-center justify-between p-4 text-2xl text-white font-outline-1 gap-2 hover:drop-shadow-primary">
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
      <button className='w-12 h-12 self-center p-1 text-xl bg-panel text-secondary rounded-full hover:drop-shadow-secondary' onClick={() => handleDelete(match.id)}>
        <img src={wasteBinIcon} alt="" />
      </button>
    </div>
  )
}

export default MatchItem