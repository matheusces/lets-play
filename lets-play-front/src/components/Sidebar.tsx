import PerfilPhoto from '../assets/PerfilPhoto.svg'

function Sidebar() {
  return (
    <div className="w-[297px] h-screen bg-[#0B0B0B] flex flex-col p-1 items-center justify-evenly">
      <div className="flex flex-col">
        <span className='w-28 h-28 rounded-full bg-bdr-purple flex items-center justify-center p-0.5'>
          <img src={PerfilPhoto} alt="foto de perfil" />
        </span>
        <div className="flex items-center justify-between gap-2">
          <span>notification</span>
          <span>config</span>
        </div>
      </div>

      <div className="w-48 h-fit">
        <span className="uppercase">grupos</span>
        <div className="h-60 flex flex-col bg-blue-primary rounded-lg p-3">
          <div className="flex justify-end pt-3">
            <span>icon</span>
          </div>
          <ul className="list-none">
            <li className="uppercase text-white font-outline-1">ci-cs</li>
            <li className="uppercase text-white font-outline-1">ci-cs</li>
            <li className="uppercase text-white font-outline-1">ci-cs</li>
          </ul>
        </div>
      </div>

      <div className="w-48 h-fit">
        <span className="uppercase">amigos</span>  
        <div className="h-60 flex flex-col bg-green-primary rounded-lg p-3">
          <div className="flex justify-end pt-3">
            <span>icon</span>
          </div>
          <ul className="list-none">
            <li className="uppercase text-white font-outline-1">Loot</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar