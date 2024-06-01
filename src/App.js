import './App.css';
import Navbar from './components/Navbar';

import Home from './pages/Home';

function App() {
  return (
    <div className="App w-full min-h-screen background">
      <Navbar/>

      <div className='w-full h-[2px] bg-white'/>

      <Home/>

      
    </div>
  );
}

export default App;
