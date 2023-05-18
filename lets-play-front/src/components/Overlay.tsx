
interface OverlayProps {
  onClick: () => void
}

function Overlay({ onClick }: OverlayProps) {

  function handleClick() {
    onClick();
  }

  return (
    <div className='fixed w-screen h-screen bg-overlay z-0 inset-0' onClick={handleClick}/>
  )
}

export default Overlay