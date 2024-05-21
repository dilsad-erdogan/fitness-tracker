import { useState } from "react";
import authService from './services/auth';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = async () => {
    try{
      const userData = { u_email: email, u_password: pass};
      const response = await authService.login(userData);
      console.log(response.message);
    } catch (error){
      console.error(error);
    }
  }

  return (
    <div className="App">
      <input type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
      <input type="text" placeholder="Password" value={pass} onChange={(e) => {setPass(e.target.value)}}></input>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default App;
