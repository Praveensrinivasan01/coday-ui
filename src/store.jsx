import { configureStore } from "@reduxjs/toolkit";
import tierReducer from "./slice/tier.slice"
import planReducer from "./slice/plan.slice"


export const store = configureStore({
    reducer:{
      tier:tierReducer,
      plan:planReducer
    }
})