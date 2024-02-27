import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Signin} from './pages/signin';
import { Signup } from './pages/signup';
import { SendMoney } from './pages/send';
import { Dashboard } from './pages/dashboard';
import { Success } from './pages/success';

function App()
{
  return <>
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/send' element={<SendMoney/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
      </Routes>
  
  </BrowserRouter>
  
  </>
}
export default App;