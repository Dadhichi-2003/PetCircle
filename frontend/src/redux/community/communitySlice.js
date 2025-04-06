import { createSlice } from "@reduxjs/toolkit"; 

const communitySlice = createSlice({
    name:'community',
    initialState:{
        allCommunities : [],
        communityDetail : null,
        communityPosts:[],
        getsingleCommPost : []
    },
    reducers:{

        setAllComm:(state,action)=>{
            state.allCommunities = action.payload
        },
        setCommDetail : (state,action) => {
            state.communityDetail = action.payload
        },
        setAllCommPost:(state,action)=>{
            state.communityPosts = action.payload
        },
        setCommPost:(state,action)=>{
            state.getsingleCommPost = action.payload
        }

    }



});

export const  { setAllComm ,setCommDetail,setAllCommPost,setCommPost } = communitySlice.actions;
export default communitySlice.reducer;