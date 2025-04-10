import { createSlice } from "@reduxjs/toolkit"; 

const adoptionSlice = createSlice({
    name:'adoption',
    initialState:{
        AdoptionPets : [],
        AllAdoptionReq :[],
        AllSendingReq : []

    },
    reducers:{

        setAdoptionPet:(state,action)=>{
            state.AdoptionPets = action.payload
        },
        setAllAdoptionReq:(state,action)=>{
            state.AllAdoptionReq = action.payload
        },
        setAllSendingAdoptionReq:(state,action)=>{
            state.AllSendingReq = action.payload
        },
    }



});

export const  { setAdoptionPet,setAllAdoptionReq,setAllSendingAdoptionReq} = adoptionSlice.actions;
export default adoptionSlice.reducer;