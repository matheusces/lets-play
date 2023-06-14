import Day from "./Day";
import { useState, useEffect } from "react";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(months[dayjs().month()]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [daysOfMonth, setDaysOfMonth] = useState<number[]>([]);

  function handleChangeToNextMonth() {
    setSelectedMonth(months[months.indexOf(selectedMonth) + 1]);
  }

  function handleChangeToPreviousMonth() {
    setSelectedMonth(months[months.indexOf(selectedMonth) - 1]);
  }

  function handleToggleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }

  function getDaysOfTheMonth() {
    const date = dayjs(
      `${dayjs().year()}-${
        months.indexOf(selectedMonth) > 9
          ? months.indexOf(selectedMonth)
          : `0${months.indexOf(selectedMonth) + 1}`
      }`
    );
    const daysInMonth = date.daysInMonth();
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );
    setDaysOfMonth(daysArray);
  }

  function handleChangeMonth(month: string) {
    setSelectedMonth(month);
    setIsDropdownActive(false);
    getDaysOfTheMonth();
  }

  function formatDate(day: number, month: number, year: number) {
    const date = dayjs(`${year}-${month}-${day}`);

    return date;
  }

  useEffect(() => {
    handleChangeMonth(selectedMonth);
  }, [selectedMonth]);

  return (
    <>
      <div className="flex mt-9 mb-8 text-white items-center gap-11 text-3xl">
        <button
          className="hover:text-primary"
          onClick={handleChangeToPreviousMonth}
        >
          «
        </button>
        <button
          className="w-80 h-20 bg-primary rounded-xl text-center hover:drop-shadow-secondary"
          onClick={handleToggleDropdown}
        >
          {selectedMonth}
        </button>
        <button
          className="hover:text-primary"
          onClick={handleChangeToNextMonth}
        >
          »
        </button>
      </div>
      <div className="grid grid-cols-8 grid-rows-4 gap-4 items-center justify-center">
        {daysOfMonth.map((day, index) => (
          <Day
            key={index}
            day={formatDate(
              day,
              months.indexOf(selectedMonth) + 1,
              dayjs().year()
            )}
          />
        ))}
      </div>

      {isDropdownActive && (
        <div className="w-[20rem] max-h-48 overflow-scroll hide-scroll-bar absolute bg-panel border border-input rounded-br-lg rounded-bl-lg top-[29%] left-[35.8%]">
          <ul className="flex flex-col items-center gap-2">
            {months.map((month: string, index) => (
              <li
                key={index}
                onClick={() => setSelectedMonth(month)}
                className="flex items-center justify-center text-white text-3xl cursor-pointer gap-1 w-full p-2 hover:bg-highlight hover:drop-shadow-primary hover:text-secondary"
              >
                <button
                  className="flex w-full justify-center"
                  onClick={() => handleChangeMonth(month)}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Calendar;
