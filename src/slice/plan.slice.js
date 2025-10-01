const { createSlice } = require("@reduxjs/toolkit")

const planSlice = createSlice({
  name: "plan",
  initialState: { plans: [] },
  reducers: {
    setPlan: (state, action) => {
      state.plans = action.payload
    }
  }
})

export const { setPlan } = planSlice.actions
export default planSlice.reducer