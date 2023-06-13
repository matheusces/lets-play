import { useEffect, useState } from "react"
import { MatchProps } from "../../types/type"
import dayjs from "dayjs";
import { matchs } from "../../utils/matchs";

function Notifications() {
  const [matches, setMatches] = useState<MatchProps[]>();
  const [todayMatches, setTodayMatches] = useState<MatchProps[]>();
  const [timeToMatch, setTimeToMatch] = useState<number[]>();

  function getTodayMatches() {
    const today = dayjs().format('YYYY-MM-DD')
    const todayMatches = matches?.filter(match => {

      return match.date === today
    })

    setTodayMatches(todayMatches)
  }
  
  function calculateTimeToNextMatch(argMatches: MatchProps) {
    const now = dayjs().format('HH:mm')
    const { time1, time2 } = convertTimeToDayjs(now, argMatches.time)

    const timeRemaining = time2.diff(time1, 'minute')
    console.log(timeRemaining)

    return timeRemaining;
  }

  function handleNotify(minutesRemaining:number) {
    if (minutesRemaining >= 15 && minutesRemaining > 0) {
      setTimeout(() => {
        const notification = new Notification("Hora da Partida!", {
          body: "Você tem uma partida em 15 minutos!",
        });
        // Manipule eventos de clique na notificação, se necessário
        notification.onclick = function () {
          // Ação ao clicar na notificação
        };
      }, (minutesRemaining - 15) * 60 * 1000);
    }

    setTimeout(() => {
      // Verifica se as notificações são suportadas no navegador
      if ("Notification" in window) {
        // Solicita permissão ao usuário, se necessário
        if (Notification.permission === "granted") {
          // Cria e exibe a notificação

          const notification = new Notification("Hora da Partida!", {
            body: "Sua partida está prestes a começar",
          });
          // Manipule eventos de clique na notificação, se necessário
          notification.onclick = function () {
            // Ação ao clicar na notificação
          };
        }
      }
    }, minutesRemaining * 60 * 1000);

    timeToMatch?.shift();
  }

  function setRemainingTimes(){
    const remainingTimes = todayMatches?.map(match => {
      const timeRemaining = calculateTimeToNextMatch(match);
      return timeRemaining;
    })

    setTimeToMatch(remainingTimes);
  }

  function convertTimeToDayjs(current: string, next: string){
    const [hora1, minuto1] = current.split(':');
    const [hora2, minuto2] = next.split(':');

    const time1 = dayjs().set('hour', parseInt(hora1)).set('minute', parseInt(minuto1));
    const time2 = dayjs().set('hour', parseInt(hora2)).set('minute', parseInt(minuto2));

    return {time1, time2};
  }

  function sortMatchesByTime() {  
    const newMatches = todayMatches?.sort((a, b) => {
        const aTime = a.time;
        const bTime = b.time;

        const { time1, time2 } = convertTimeToDayjs(aTime.toString(), bTime.toString());

        if (time1.isBefore(time2)) {
          return -1;
        } else if (time2.isBefore(time1)) {
          return 1;
        }

        return 0
      })
    
      setTodayMatches(newMatches) 
  }

  useEffect(() => {
    Notification.requestPermission();

    setMatches(matchs);

    setTimeout(() => {
      getTodayMatches();
    }, 1000);

    setTimeout(() => {
    }, 1000)
    sortMatchesByTime();    

    console.log(todayMatches)

    if(todayMatches){
      setRemainingTimes();
      const time = calculateTimeToNextMatch(todayMatches[0]);
      console.log(time);

      if (time > 0) {
        handleNotify(time);
      }
    }
    
  }, []);

  useEffect(() => {

    
    if (todayMatches) {
      const time = calculateTimeToNextMatch(todayMatches[0]);
      // console.log(time);

      if (time > 0) {
        handleNotify(time);
      }
    }
  }, [timeToMatch]);

  return (
    <></>
  )
}

export default Notifications