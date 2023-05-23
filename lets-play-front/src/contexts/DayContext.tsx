import React from 'react';

interface DayContextProps {
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  isDaySelected: boolean;
  setIsDaySelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const DayContext =  React.createContext<DayContextProps>({
  selectedDay: '',
  setSelectedDay: () => {},
  isDaySelected: false,
  setIsDaySelected: () => {},
});

export default DayContext;