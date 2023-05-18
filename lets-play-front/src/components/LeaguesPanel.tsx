import trophyIcon from "../assets/trophy.svg";
import matchIcon from '../assets/match.png';
import participantsIcon from '../assets/participants.svg';

const leagues = ["Counter Striker", "Grand Line Adventures", "Naruto Storm 4"]

function LeaguesPanel() {

  return (
    <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 p-12">
      {leagues.map((league, index) => (
        <button key={index} className="w-[40rem] h-16 bg-panel-item rounded-lg flex items-center justify-between p-4 text-xl text-white font-outline-1 gap-2 hover:drop-shadow-secondary">
          <img className="w-10 h-10" src={trophyIcon} alt="Icone de um Troféu" />
          <span>{league}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <img className="w-10 h-10" src={matchIcon} alt="estrutura de uma torneio" title="Tamanho do torneio" />
              <span>8</span>
            </div>
            <div className="flex items-center gap-1">
              <img className="w-10 h-10" src={participantsIcon} alt="icone de participantes" title="Quantidade de participantes neste torneio" />
              <span>6</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default LeaguesPanel