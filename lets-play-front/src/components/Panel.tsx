import Calendar from "./Calendar"

function Panel() {
  return (
    <div className="w-fit h-fit flex flex-col gap-2">

      <div className="flex items-center justify-between">
        <h1 className="uppercase text-primary text-2xl">Minhas partidas</h1>
        <div className="flex text-white items-center gap-6">
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary">Criar partida</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary">Criar Liga</button>
          <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary">Criar Torneio</button>
        </div>
      </div>

      <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center">
        <Calendar />
      </div>
    </div>
  )
}

export default Panel