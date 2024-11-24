import { createSlice } from '@reduxjs/toolkit';
export const winSlice=createSlice({
  name:'win',
  initialState:[],
  reducers:{
    createWindow:(state,action)=>{
      switch(state.some(m=>m.id==action.payload.id)){
        case true:
          return state;
        break;
        default:
          return [
            ...state,
            action.payload,
          ]
      }
    }
  },
});
export const { createWindow }=winSlice.actions;
export default winSlice.reducer;