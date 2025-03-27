import { createSlice } from "@reduxjs/toolkit";
import { comment } from "postcss";
const postSlice = createSlice({
    name:'post',
    initialState:{
        posts:[],
        selectedPost:null,
        petPost:[]
        
    },
    reducers:{
        //actions
        setPosts:(state,action) => {
            state.posts = action.payload;
        },
        setSelectedPost:(state,action) => {
            state.selectedPost = action.payload;
        },
        setpetPost:(state,action) => {
            state.petPost = action.payload;
        },
    }
});
export const {setPosts, setSelectedPost,setpetPost} = postSlice.actions;
export default postSlice.reducer;