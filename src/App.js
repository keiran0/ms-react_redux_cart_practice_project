import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { useSelector, useDispatch } from 'react-redux'; 

import { useEffect } from 'react';
import { sendCartData } from './store/cartActions';
import { fetchCartData } from './store/cartActions';

let isInitial = true; //define outside component function so that this is not changed and not reinitialised if the component renders again.

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.cartVisibility.visible)
  const notification = useSelector(state => state.cartVisibility.notification)

  const cart = useSelector(state => state.cartItems)

  useEffect(()=>{
    dispatch(fetchCartData())
  }, [])


  //putting side effect into component
  useEffect(()=>{
    if (isInitial){
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
    


  }, [cart])

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout> 
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
