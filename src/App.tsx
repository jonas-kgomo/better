import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Documentation } from './pages/Documentation';
import { Components } from './pages/Components';
import { Blog } from './pages/Blog';
import { FeedDemo } from './pages/FeedDemo';
import { AdPhilosophy } from './pages/AdPhilosophy';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/components" element={<Components />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/demo" element={<FeedDemo />} />
        <Route path="/ad-philosophy" element={<AdPhilosophy />} />
      </Routes>
    </Router>
  );
}

export default App;
