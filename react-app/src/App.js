import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from './pages/landingpage';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Category from './pages/category';
import AddQuestion from './pages/addQuestion';
import Questionnaire from './pages/questionnaire';
import ShowAnswers from './pages/showAnswers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="addquestion" element={<AddQuestion />} />
        <Route exact path="/questionnaire" element={<Questionnaire />} />
        <Route exact path="/showAnswers" element={<ShowAnswers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
