import './styles/App.css';
import Home from './pages/Home.js';
import Eventform from './pages/Form.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<Eventform />} />
      </Routes>
    </div>
  );
}

export default App;
