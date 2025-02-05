// import {
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';
import { atom } from 'jotai';
export const winStore=atom([]);

//!deprecated zustand implementation of window state
// import { create } from 'zustand';
// import { combine } from 'zustand/middleware';
// export const winStore=create(combine(
//   {windows:[],},
//   (set,get)=>{
//     return {
//       createWindow:(window)=>{
//         set((state)=>([
//           state.windows.filter((win)=>win.id==window.id)
//             ?{windows:state.windows}
//             :({windows:[...state.windows,window]})
//         ]));
//       },
//     }
//   },
// ),);  