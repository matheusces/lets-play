import Panel from './components/Panel';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import PanelContextProvider from './components/PanelContextProvider';
import UserContextProvider from './components/UserContextProvider';

function App() {

  return (
    <>  
      {/* <div className="w-full h-full bg-[url('../src/assets/stars.svg')] absolute self-center left-48 -z-10" /> */}
      <div className="w-screen h-screen bg-background font-primary text-primary flex items-center justify-between z-[10]">
        <Logo />
        <UserContextProvider>
          <PanelContextProvider>
            <Panel />
            <Sidebar />
          </PanelContextProvider>
        </UserContextProvider>
      </div>
      {/* <div className="w-full h-full absolute left-0 top-0 bg-galaxy -z-[0]" /> */}
    </>
  );
}

export default App;
