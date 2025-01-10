import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import TimePage from "./TimePage";
import "./App.css";
import BibleVerseComponent from "./Bible";
import VerseCard from "./VerseCard";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerseCard />} />
        <Route path="/hbd" element={<HomePage />} />
        <Route path="/time" element={<TimePage />} />
      </Routes>
    </Router>
  );
};

export default App;
