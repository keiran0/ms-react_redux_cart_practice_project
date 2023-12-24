import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { visibilityActions } from './store/cartVisibility';

import { useSelector, useDispatch } from 'react-redux'; 

import { useEffect } from 'react';

let isInitial = true; //define outside component function so that this is not changed and not reinitialised if the component renders again.

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.cartVisibility.visible)
  const notification = useSelector(state => state.cartVisibility.notification)

  const cart = useSelector(state => state.cartItems)

  //putting side effect into component
  useEffect(()=>{
    const sendCartData = async ()=>{
      dispatch(visibilityActions.showNotification({
        status: 'pending',
        title: 'sending',
        message: 'Sending cart data'
      }))
      
      const response = await fetch('https://react-testproject-9cde5-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', { 
        method: 'PUT', body: JSON.stringify(cart)
      }) //PUT overwrites, POST adds to list
      if (!response.ok){
        throw new Error('sending cart data failed')
      }
      dispatch(visibilityActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully.'
      }))
    }

    if (isInitial){
      isInitial = false;
      return; //blocks the cart data from being sent the first time this executes (when application started)
    }

    sendCartData()
      .catch(error=>{
        dispatch(visibilityActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed.'
        }))
      })

  },[cart])

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
