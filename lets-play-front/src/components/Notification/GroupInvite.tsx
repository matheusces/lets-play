interface GroupInviteProps {
  groupName: string;
  sender: string;
}

function GroupInvite({ groupName, sender }: GroupInviteProps) {
  return (
    <li className='flex flex-col gap-2 items-center border border-primary p-2 rounded-md text-center justify-center hover:bg-panel'>
      <div className="w-full h-full text-primary font-outline-0">
      <span className="text-secondary font-outline-0 drop-shadow-secondary">{sender}</span> te convidou para entrar no grupo <span className="text-secondary font-outline-0 drop-shadow-secondary underline">{groupName}</span>.
      </div>

      <div className="flex gap-2">
        <button className="border border-secondary p-1 rounded-md text-xs text-white hover:border-primary">Aceitar</button>
        <button className="border border-secondary p-1 rounded-md text-xs text-white hover:border-primary">Recusar</button>
      </div>
    </li>
  )
}

export default GroupInvite