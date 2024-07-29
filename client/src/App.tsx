import LoginForm from './pages/login/LoginForm';
import RegisterForm from './pages/register/RegisterForm';
import FALoginForm from './pages/login/2FALoginForm';
import AdminPanel from './pages/admin/main/AdminPanel';
import UserPanel from './pages/user/main/UserPanel';
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
