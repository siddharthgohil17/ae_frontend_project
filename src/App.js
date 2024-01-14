import './styles/App.css';
import Home from './pages/Home.js';
import Eventform from './pages/Form.js';
import CategoryPages from './pages/CategoryPages.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/addevent" element={<Eventform />} />
        <Route path="/event" element={<CategoryPages />} />
      </Routes>
    </div>
  );
}

export default App;
