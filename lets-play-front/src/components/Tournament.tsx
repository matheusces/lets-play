import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { useEffect, useState } from 'react';

import GlootTheme from '../utils/Themes';
import { size2 } from '../utils/TournamentSizeTemplates/size2';
import { size4 } from '../utils/TournamentSizeTemplates/size4';
import { TournamentProps, Tournaments } from '../utils/Tournaments';
import { size8 } from '../utils/TournamentSizeTemplates/size8';
import { size16 } from '../utils/TournamentSizeTemplates/size16';

interface TournamentComponentProps {
  tournamentID: string;
  toggleIsTournamentSelected: () => void;
}

const sizes = {
  2: size2,
  4: size4,
  8: size8,
  16: size16,
}

function Tournament({ tournamentID, toggleIsTournamentSelected }: TournamentComponentProps) {
  const [tournament, setTournament] = useState<TournamentProps | undefined>({} as TournamentProps);
  const [isEditModeActive, setIsEditModeActive] = useState(false);


  useEffect(() => {
    // setIsLoading(true);
    // setIsLoading(false);
    
    const fetchedTournament: TournamentProps | undefined = Tournaments.find(tournament => tournament.id === tournamentID);
    setTournament(fetchedTournament);

    console.log(tournament);

  }, [tournamentID]);
  
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {isEditModeActive ? (
          <h1>Edit mode</h1>
        ) : (
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2'>
              <button className='w-fit p-1 bg-primary rounded-md text-white' onClick={toggleIsTournamentSelected}>voltar</button>
              <button className='w-fit p-1 bg-primary rounded-md text-white' onClick={toggleIsTournamentSelected}>voltar</button>
              <button className='w-fit p-1 bg-primary rounded-md text-white' onClick={toggleIsTournamentSelected}>voltar</button>
              <button className='w-fit p-1 bg-primary rounded-md text-white' onClick={toggleIsTournamentSelected}>voltar</button>
            </div>
            <SingleEliminationBracket
              matches={size16}
              matchComponent={Match}
              svgWrapper={({ children, ...props }) => (
                <SVGViewer SVGBackground={GlootTheme.svgBackground}  width={900} height={500} {...props}>
                  {children}
                </SVGViewer>
              )}
            />
          
            {/* <DoubleEliminationBracket
              matches={dataDoublePlayoffs}
              matchComponent={Match}
              svgWrapper={({ children, ...props }) => (
                <SVGViewer SVGBackground={GlootTheme.svgBackground}  width={900} height={500} {...props}>
                  {children}
                </SVGViewer>
              )}
            /> */}
          </div>
      )}
    </div>
  )
}

export default Tournament