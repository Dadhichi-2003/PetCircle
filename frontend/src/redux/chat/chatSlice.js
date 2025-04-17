import { createSlice } from "@reduxjs/toolkit";


const chatSlice  = createSlice ({
    name:'chat',
    initialState:{
        onlineUsers:[],
        messages:[],
        selectedUser: null,
    },
    reducers:{
        //actions
        setOnlineUsers:(state,action)=>{
            state.onlineUsers =action.payload;
        },
        setMessages: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.messages = action.payload; // ✅ Pure array ke liye replace
            } else {
                state.messages = [...state.messages, action.payload]; // ✅ Append new message
            }
        }
    }
})
export const {setOnlineUsers,setMessages} = chatSlice.actions;
export default chatSlice.reducer;