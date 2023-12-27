import React from 'react';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home/home';
import Nav from './componnents/header/nav/nav';

// Interface state
interface IState{
  naviguation: string[];
}

function App() {
   // State 
   const [menu, setMenu] = useState<IState['naviguation']>(
    [ 'Home','About', 'Blog', 'Contact']
  );

  return (
    <div className="App">
      {/*<Nav naviguation={menu} />*/}
      <Home />
    </div>
  );
}

export default App;
