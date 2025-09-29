import { createSlice } from "@reduxjs/toolkit";
import Set from "lodash/set"

const initialState ={
    tier:"free",
    plan:"basic",
    expired:false,
    active:true,
    loggedIn:{
        token:"",
        active:true
    },
    payment:{
        nextDueDate:"",
        active:false,
        lastPaymentDate:""
    }
}

const tierSlice = createSlice({
    name:"tier",
    initialState,
    reducers:{
        updateField:(state,action)=>{
         const {path, value } = action.payload;
         Set(state,path,value)
        }   
    }
});

export const { updateField } = tierSlice.actions;
export default tierSlice.reducer;