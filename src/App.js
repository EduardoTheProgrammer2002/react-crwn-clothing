import { createUserDocumentFromAuth, getCurrentUser, OnAuthStateChangesListener } from './utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './routes/home/home.component';
import Nav from './routes/nav/nav.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useDispatch } from 'react-redux';
import { checkUserSession, setCurrentUser } from './redux/user/user.action';
import { USER_ACTION_TYPES } from './redux/user/user.types';

const App = () => {
  const dispatch = useDispatch()
  dispatch(checkUserSession());
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;