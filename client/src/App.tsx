import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FALoginForm from './components/2FALoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm></LoginForm>}/>
        <Route path="/register" element={<RegisterForm></RegisterForm>}/>
        <Route path="/2faLogin" element={<FALoginForm></FALoginForm>}/>
      </Routes>
    </Router>
  );
}

export default App;
