import {createSlice} from '@reduxjs/toolkit'
import { visibilityActions } from './cartVisibility'

const CartSlice = createSlice({
    name: 'cart',
    initialState: {items: []},
    reducers: {
        addItem(state, action){ 
            let includes = state.items.some((cartItem)=> cartItem.title == action.payload.title)
            if (!includes){ //item does not exist
                state.items.push({
                    title: action.payload.title,
                    quantity: 1, 
                    price: action.payload.price
                })
            } else {
                let item = state.items.filter((item)=>item.title == action.payload.title)
                let newCart = state.items.filter((item)=>item.title !== action.payload.title)
                newCart.push({
                    title: action.payload.title,
                    quantity: item[0].quantity + 1, 
                    price: action.payload.price
                })
                state.items = newCart
            }
        },
        removeItem(state, action){
            let item = state.items.filter((item)=>item.title == action.payload.title)
            let newCart = state.items.filter((item)=>item.title !== action.payload.title)
            if (item[0].quantity > 1) {
                newCart.push({
                    title: action.payload.title,
                    quantity: item[0].quantity - 1 , 
                    price: action.payload.price
                })
            }
            state.items = newCart
        }
    }
})

//creating our own action creator
export const sendCartData = (cart)=>{
    return async (dispatch)=>{ //create function that returns another function
        dispatch(
            visibilityActions.showNotification({
                status: 'pending',
                title: 'sending',
                message: 'Sending cart data'
            })
        )

        const sendRequest = async () => {
            const response = await fetch('https://react-testproject-9cde5-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', { 
                method: 'PUT', body: JSON.stringify(cart)
              }) //PUT overwrites, POST adds to list
    
            if (!response.ok){
                throw new Error('sending cart data failed')
            }
        }

        try {
            await sendRequest();
            dispatch(visibilityActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully.'
              }))
        } catch (error) {
            dispatch(visibilityActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed.'
              }))
        }
    }
}

export const cartActions = CartSlice.actions
export default CartSlice