import Day from './Day';
import {useState} from 'react'

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '28', '29', '30' ]

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState('Maio');

  function handleChangeToNextMonth(){
    setCurrentMonth(months[months.indexOf(currentMonth) + 1])
  }

  function handleChangeToPreviousMonth() {
    setCurrentMonth(months[months.indexOf(currentMonth) - 1])
  }

  return (
    <>
      <div className="flex mt-9 mb-8 text-white items-center gap-11 text-3xl">
        <button className="hover:text-primary" onClick={handleChangeToPreviousMonth}>«</button>
        <button className="w-80 h-20 bg-primary rounded-xl text-center hover:drop-shadow-secondary">{currentMonth}</button>
        <button className="hover:text-primary" onClick={handleChangeToNextMonth}>»</button>
      </div>
      <div className='grid grid-cols-7 grid-rows-4 gap-4 items-center justify-center'>
        {days.map((day, index) => <Day key={index} day={day} />)}
      </div>
    </>
  )
}

export default Calendar