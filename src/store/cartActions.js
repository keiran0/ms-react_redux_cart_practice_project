import { visibilityActions } from './cartVisibility'
import { cartActions } from './cartItems'

export const fetchCartData = ()=>{
    return async dispatch => {
        const fetchData = async()=>{
            const response = await fetch('https://react-testproject-9cde5-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
        
            if (!response.ok) {
                throw new Error('could not fetch cart data')
            }
    
            const data = await response.json()
            return data
        }

        try {
            const cartData = await fetchData();
            console.log(cartData)
            dispatch(cartActions.replaceCart(
                cartData || []
            ))
            dispatch(visibilityActions.showNotification({
                status: 'success',
                title: 'Successfully retrieved data!',
                message: 'Fetching cart data success.'
              }))

        } catch (error) {
            dispatch(visibilityActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed.'
              }))
        }

    } 

    
}

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
                method: 'PUT', body: JSON.stringify(cart.items)
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

