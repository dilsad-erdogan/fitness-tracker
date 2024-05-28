import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/register/RegisterForm';
import FALoginForm from './components/login/2FALoginForm';
import AdminPanel from './components/admin/AdminPanel';
import UserPanel from './components/user/UserPanel';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm></LoginForm>}/>
        <Route path="/register" element={<RegisterForm></RegisterForm>}/>
        <Route path="/2faLogin" element={<FALoginForm></FALoginForm>}/>
        <Route path="/admin" element={<AdminPanel></AdminPanel>}/>
        <Route path="/user" element={<UserPanel></UserPanel>}/>
      </Routes>
    </Router>
  );
}

export default App;
