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
    },
    removeWindow:(state,action)=>{
      switch(state.some(m=>m.id==action.payload)){
        case true:
          return state.filter(win=>win.id!==action.payload);
        break;
        default:
          console.error(`could not find window with id ${action.payload}`);
          return state;
      }
    },
  },
});
export const { createWindow,removeWindow }=winSlice.actions;
export default winSlice.reducer;