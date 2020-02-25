import React from 'react';
import './App.css';
import Button from 'muicss/lib/react/button'
import { add } from '@vbm/common'

function App() {
  return (
    <div className="App">
      <Button>Test Button</Button>
      <div>
      Learn React {add(2, 3)}
      </div>
    </div>
  );
}

export default App;
