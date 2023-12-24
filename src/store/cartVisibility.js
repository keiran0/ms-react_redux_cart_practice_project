import { createSlice } from "@reduxjs/toolkit";

const visbilitySlice = createSlice({
    name:"cartVisibility",
    initialState: {visible: false, notification: null},
    reducers: {
        toggle(state){
            state.visible = !state.visible
        },
        showNotification(state, action){
            state.notification = { status: action.payload.status, title: action.payload.title, message:action.payload.message}
        }
    }
})

export const visibilityActions = visbilitySlice.actions
export default visbilitySlice