import { configureStore } from "@reduxjs/toolkit";
import  tierReducer  from "./slice/tier.slice"

export const store = configureStore({
    reducer:{
        tier:tierReducer
    }
})