import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { GameProps, LeagueProps } from '../types/type';

import rightArrowBlue from '../assets/right-arrow-blue.svg';
import noImage from '../assets/block.svg';

interface LeagueDropdownProps {
  league: LeagueProps;
  setLeague: React.Dispatch<React.SetStateAction<LeagueProps>>;
}

function LeagueDropdown({ league, setLeague }: LeagueDropdownProps) {
  const [games, setGames] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  function handleToggleDropdown() {
    setIsDropdownActive(!isDropdownActive);
  }

  function handleSelectGame(game: GameProps) {
    setSelectedGame(game.name);
    setLeague({ ...league, game: game.name });
    setLeague({...league, game_img: game.background_image})
    setSelectedImage(game.background_image);
    setIsDropdownActive(false);
  }

  function handleGameChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedGame(e.target.value);
    setIsDropdownActive(true);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: '710e9bbeee7645df9aeeb8e5e70d5e3d',
            pageSize: 10,
            search: selectedGame,
          }
        });
        setGames(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [selectedGame]);

  return (
    <div className='w-1/3 h-full flex flex-col items-center justify-around'>
      <div className='h-full flex relative flex-col items-start justify-around'>
        <button type='button' className='w-56 h-24 flex justify-between items-center bg-input text-white text-center rounded-lg font-outline-1 border focus-within:border-secondary'>
          {/* <img src={selectedImage === undefined ? noImage : selectedImage} className='h-20 bg-img border border-secondary rounded-lg'/> */}
          <input className='w-full text-center p-2 bg-input text-ellipsis focus:outline-0' placeholder='Selecione o jogo' onChange={handleGameChange} value={selectedGame} />
          <img className={isDropdownActive ? 'right-10 rotate-90 transition-all' : 'right-10 transition-all'} src={rightArrowBlue} alt="" onClick={handleToggleDropdown} />
        </button>
        {isDropdownActive && (
          <div className='w-56 max-h-48 overflow-scroll hide-scroll-bar absolute bg-input rounded-br-lg rounded-bl-lg top-[5rem] right-[0rem] border-x border-b border-secondary z-10'>
            <ul className='flex flex-col items-center gap-2'>
              {games.map((game: GameProps, index) => (
                <li 
                  key={index} 
                  onClick={() =>handleSelectGame(game)}
                  className='flex items-start cursor-pointer text-left gap-1 text-ellipsis w-full p-2 hover:text-white'
                >
                  <img className='w-16 h-16' src={game.background_image} alt="" />
                  {game.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>          
    </div>
  )
}

export default LeagueDropdown