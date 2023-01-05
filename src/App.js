import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';

import {Route, Routes } from 'react-router-dom';
import './App.scss';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Nav/>}>
        <Route index element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;