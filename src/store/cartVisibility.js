import { createSlice} from "@reduxjs/toolkit";

const visbilitySlice = createSlice({
    name:"cartVisibility",
    initialState: {visible: false},
    reducers: {
        toggle(state){
            state.visible = !state.visible
        }
    }
})

export const visibilityActions = visbilitySlice.actions
export default visbilitySlice