import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
   name:"auth",
   initialState:{
      loading:false,
      user:null
   },
   reducers:{
      // actions 
      setloading:(state, action) => {
         state.loading = action.payload;
      },
      setUser:(state, action) => {
         state.user = action.payload;
      }
   }

})

export const { setloading, setUser } = authslice.actions;
export default authslice.reducer; 