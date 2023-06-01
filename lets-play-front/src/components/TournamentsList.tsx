import { Tournaments } from "../utils/Tournaments";

import trophyIcon2 from "../assets/trophy_gold.svg";
import tournamentIcon from '../assets/match.png';
import participantsIcon from '../assets/participants.svg';

function TournamentsList() {
  return (
   <>
    {Tournaments.map((tournament, index) => (
        <button key={index} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary">
          <img className="w-10 h-10" src={trophyIcon2} alt="Icone de um Troféu" />
          <span>{tournament.title}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <img className="w-10 h-10" src={tournamentIcon} alt="estrutura de uma torneio" title="Tamanho do torneio" />
              <span>{tournament.tournamentSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <img className="w-10 h-10" src={participantsIcon} alt="icone de participantes" title="Quantidade de participantes neste torneio" />
              <span>{tournament.participants.length}</span>
            </div>
          </div>
        </button>
      ))}
   </>
  )
}

export default TournamentsList