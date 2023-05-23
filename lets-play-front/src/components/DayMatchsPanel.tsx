
import participants from "../assets/participants.svg";
import users from '../assets/users.svg';
import { matchs } from "../utils/matchs";

function DayMatchsPanel() {
  return (
    <>
      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 py-12 hide-scroll-bar overflow-scroll">
        {/* <div className="w-full flex items-center justify-end gap-1 hover:drop-shadow-secondary">
          <span className="text-white font-outline-1 text-3xl">7</span>
          <img className="w-10 h-10" src={participants} alt="" />
        </div> */}
        {matchs.map((match, index) => (
          <button key={index} className="w-[40rem] h-24 bg-panel-item rounded-lg flex items-center justify-between p-4 text-2xl text-white font-outline-1 gap-2 hover:drop-shadow-primary">
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
      {/* <div className="w-full h-full absolute left-0 top-0 bg-galaxy bg-cover bg-no-repeat" /> */}
    </>
  )
}

export default DayMatchsPanel