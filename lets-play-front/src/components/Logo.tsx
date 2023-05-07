import logo from '../assets/Symbol.svg';

function Logo() {
  return (
    <div className='flex flex-col items-center self-start pl-8 pt-5'>
      <span className='text-black drop-shadow-logo font-outline-title text-3xl'>Let's Play</span>
      <img className='w-32 h-auto hover:drop-shadow-logo' src={logo} alt="Joystick logo" />
    </div>
  )
}

export default Logo