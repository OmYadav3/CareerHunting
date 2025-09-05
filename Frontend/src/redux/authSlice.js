import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
   name:"auth",
   initialState:{
      loading:false
   },
   reducers:{
      // actions 
      setloading:(state, action) => {
         state.loading = action.payload;
      }
   }

})

export const { setloading } = authslice.actions;
export default authslice.reducer; 