interface MatchInviteProps {
  game: string;
  sender: string;
}

function MatchInvite({ game, sender }: MatchInviteProps) {
  return (
    <li className='flex flex-col gap-2 items-center border border-primary p-2 rounded-md text-center justify-center hover:bg-panel'>
      <div className="w-full h-full text-primary font-outline-0">
      <span className="text-secondary font-outline-0 drop-shadow-secondary">{sender}</span> te convidou para uma partida de <span className="text-secondary font-outline-0 drop-shadow-secondary underline">{game}</span>.
      </div>

      <div className="flex gap-2">
        <button className="border border-secondary p-1 rounded-md text-xs text-white hover:border-primary">Aceitar</button>
        <button className="border border-secondary p-1 rounded-md text-xs text-white hover:border-primary">Recusar</button>
      </div>
    </li>
  )
}

export default MatchInvite