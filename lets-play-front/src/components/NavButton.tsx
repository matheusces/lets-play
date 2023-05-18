interface NavButtonProps {
  currentPanel: string,
  setCurrentPanel: (panel: string) => void;
  teste: () => void;
}

function NavButton({ currentPanel, setCurrentPanel, teste }: NavButtonProps) {
  return (
    <button className="uppercase w-32 h-12 rounded-2xl px-0.5 border border-bdr-purple hover:bg-primary" onClick={currentPanel === 'calendar' ? teste : () => setCurrentPanel('calendar')}>{currentPanel === 'calendar' ? 'teste' : 'Calendário'}</button>
  )
}

export default NavButton