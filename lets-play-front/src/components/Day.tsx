
interface DayProps {
  day: string
}

function Day({ day }: DayProps) {
  return (
    <button className="w-20 h-20 bg-color-0 flex text-black items-center justify-center hover:drop-shadow-primary">
      {day}  
    </button>
  )
}

export default Day