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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route exact path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="qa/category" element={<Category />} />
        <Route exact path="qa/addquestion" element={<AddQuestion />} />
        <Route exact path="qa/questionnaire" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
