import TournamentsList from "./TournamentsList";

function TournamentsPanel() {
  return (
    <div className="w-[60rem] h-[36rem] bg-panel flex flex-col items-center gap-4 p-12">
      <TournamentsList />
    </div>
  )
}

export default TournamentsPanel