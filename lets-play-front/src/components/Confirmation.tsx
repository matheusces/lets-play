
interface ConfirmationProps {
  action: string;
  onConfirm: () => void;
  toggleConfirmation: () => void;
}
function Confirmation({ action, onConfirm, toggleConfirmation }: ConfirmationProps) {

  function handleConfirm() {
    onConfirm();
    toggleConfirmation();
  }

  return (
    <div className='absolute left-[38%] bottom-[50%] w-[25rem] h-[15rem] bg-input-panel flex flex-col items-center justify-center rounded-lg p-8 gap-4 z-10'>
      <h1 className='text-white text-xl'>
        Você está prestes a <strong className="text-primary cursor-pointer underline">{action}</strong>.
        Tem certeza que 
        quer continuar?
      </h1>
      <div className='flex gap-8'>
        <button className='bg-primary text-white px-4 py-2 rounded-xl text-xl hover:drop-shadow-primary' onClick={handleConfirm}>Sim</button>
        <button className='bg-white text-primary px-4 py-2 rounded-xl text-xl hover:drop-shadow-primary' onClick={toggleConfirmation}>Não</button>
      </div>
    </div>
  )
}

export default Confirmation