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
        <Route path="/" element={<HomePage />} />
        <Route path="/hbd" element={<HomePage />} />
        <Route path="/clock" element={<VerseCard />} />
      </Routes>
    </Router>
  );
};

export default App;
