import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { visibilityActions } from '../../store/cartVisibility';

const CartButton = (props) => {

  const dispatch = useDispatch()

  function handleToggleVisibility(){
    dispatch(visibilityActions.toggle())
  }

  const cartSelector = useSelector(state => state.cartItems.items)

  let quantity = 0
  if (cartSelector.length > 0) {
    cartSelector.forEach(function(cartItem){
      quantity += cartItem.quantity
    })
  }


  return (
    <button className={classes.button} onClick={handleToggleVisibility}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
