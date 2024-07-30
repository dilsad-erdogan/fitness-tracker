import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './dark.scss';
import { DarkModeContext } from './components/navbar/context/context';

import LoginForm from './pages/login/LoginForm';
import RegisterForm from './pages/register/RegisterForm';
import FALoginForm from './pages/login/2FALoginForm';

import AdminPanel from './pages/admin/main/AdminPanel';
import Users from './pages/admin/list/Users';
import Movements from './pages/admin/list/Movements';
import MTitles from './pages/admin/list/MTitles';
import Program from './pages/admin/list/Program';
import UProgram from './pages/admin/list/UProgram';
import URole from './pages/admin/list/URole';
import Set from './pages/admin/list/Set';
import HeightWeight from './pages/admin/list/HeightWeight';
import Todo from './pages/admin/list/Todo';
import Weekly from './pages/admin/list/Weekly';
import StatisticsA from './pages/admin/useful/Statistics';
import Notifications from './pages/admin/useful/Notifications';
import Logs from './pages/admin/services/Logs';
import Settings from './pages/admin/services/Settings';

import UserPanel from './pages/user/main/UserPanel';
import Workout from './pages/user/pages/Workout';
import Goals from './pages/user/pages/Goals';
import StatisticsU from './pages/user/pages/Statistics';
import Profile from './pages/user/pages/Profile';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm></LoginForm>}/>
          <Route path="/register" element={<RegisterForm></RegisterForm>}/>
          <Route path="/2faLogin" element={<FALoginForm></FALoginForm>}/>

          <Route path="/admin" element={<AdminPanel></AdminPanel>}/>
          <Route path="/admin/user" element={<Users></Users>}/>
          <Route path="/admin/movement" element={<Movements></Movements>}/>
          <Route path="/admin/title" element={<MTitles></MTitles>}/>
          <Route path="/admin/program" element={<Program></Program>}/>
          <Route path="/admin/userProgram" element={<UProgram></UProgram>}/>
          <Route path="/admin/role" element={<URole></URole>}/>
          <Route path="/admin/set" element={<Set></Set>}/>
          <Route path="/admin/hw" element={<HeightWeight></HeightWeight>}/>
          <Route path="/admin/todo" element={<Todo></Todo>}/>
          <Route path="/admin/weekly" element={<Weekly></Weekly>}/>
          <Route path="/admin/ista" element={<StatisticsA></StatisticsA>}/>
          <Route path="/admin/noti" element={<Notifications></Notifications>}/>
          <Route path="/admin/logs" element={<Logs></Logs>}/>
          <Route path="/admin/setting" element={<Settings></Settings>}/>

          <Route path="/user" element={<UserPanel></UserPanel>}/>
          <Route path="/user/plan" element={<Workout></Workout>}/>
          <Route path="/user/goals" element={<Goals></Goals>}/>
          <Route path="/user/ista" element={<StatisticsU></StatisticsU>}/>
          <Route path="/user/profile" element={<Profile></Profile>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
