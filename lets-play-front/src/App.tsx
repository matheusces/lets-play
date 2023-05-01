import Panel from './components/Panel';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <>  
      <div className="w-screen h-screen bg-background font-primary text-primary flex items-center justify-between">
        {/* <div className="w-full h-full bg-[url('../src/assets/stars.svg')] absolute self-center left-48" /> */}
        <span className='self-start pl-8 pt-5'>logo</span>
        <Panel />
        <Sidebar />
      </div>
    </>
  );
}

export default App;
