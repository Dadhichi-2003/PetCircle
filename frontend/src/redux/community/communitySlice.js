import { createSlice } from "@reduxjs/toolkit"; 

const communitySlice = createSlice({
    name:'community',
    initialState:{
        allCommunities : [],
        communityDetail : null
    },
    reducers:{

        setAllComm:(state,action)=>{
            state.allCommunities = action.payload
        },
        setCommDetail : (state,action) => {
            state.communityDetail = action.payload
        }

    }



});

export const  { setAllComm ,setCommDetail } = communitySlice.actions;
export default communitySlice.reducer;