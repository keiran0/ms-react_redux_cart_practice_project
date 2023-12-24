import { configureStore } from '@reduxjs/toolkit';

import visbilitySlice from './cartVisibility'
import CartSlice from './cartItems';


let store = configureStore({
    reducer: {
        cartItems:CartSlice.reducer,
        cartVisibility: visbilitySlice.reducer
    }
})

export default store
