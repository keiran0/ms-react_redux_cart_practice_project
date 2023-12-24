import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

import { useSelector } from 'react-redux'

const Cart = (props) => {

  const cartSelector = useSelector(state => state.cartItems.items)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartSelector.map((cartItem)=><CartItem item={{title: cartItem.title, quantity:cartItem.quantity, total:cartItem.quantity*cartItem.price, price:cartItem.price}}/>)}
      </ul>
    </Card>
  );
};

export default Cart;
