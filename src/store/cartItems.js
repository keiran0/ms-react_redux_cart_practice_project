import {createSlice} from '@reduxjs/toolkit'


const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], 
        changed:false //does not switch to true when replaced
    }, 
    reducers: {
        addItem(state, action){ 
            state.changed = true
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
            state.changed = true
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
        },
        replaceCart(state, action){
            state.items = action.payload
        }
    }
})



export const cartActions = CartSlice.actions
export default CartSlice