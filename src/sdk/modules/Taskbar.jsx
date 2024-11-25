import { useSelector } from "react-redux";
import  "../style/Taskbar.scss";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { generateId } from "./Lib";
export const Taskbar=({})=>{
  const Window=useSelector(state=>state.win);
  useEffect(()=>{
    if(Window&&Window.length>0)console.table(Window);
  },[Window]);
  const[startMenuOpen,setStartMenuOpen]=useState(true);
  useEffect(()=>console.log(startMenuOpen),[startMenuOpen]);
  return(<>
    <motion.div 
      id="StartMenu"
      transition={{duration:.35,}}
      initial={{
        x:"calc(-100%)",
        opacity:0,}}
      animate={{
        x:startMenuOpen?0:"calc(-100%)",
        opacity:startMenuOpen?1:0}} >
    <motion.div id="sm_shortcutWrapper">
        
    </motion.div>
  </motion.div>
  <motion.div 
    id="Taskbar" 
    initial={{y:5,opacity:0}} 
    transition={{duration:.35,}}
    animate={{y:0,opacity:1,}}>
      <motion.div id="tb_itemWrapper">
        <AnimatePresence 
          mode="popLayout"
          transition={{ duration:.35 }}
          initial={{ opacity:0,y:-48 }}
          animate={{ opacity:1,y:0 }}
          exit={{ opacity:0,y:-48 }}>
            <motion.button 
              onClick={()=>{
                setStartMenuOpen(!startMenuOpen);
              }}
              className="item" id="startButton"></motion.button>
            {Window.map((data,index)=>
              <motion.button 
                style={{
                  backgroundImage:`url("${data?data.icon:'/icons/15.ico'}")`,
                }}
                className="item open"
                key={`${data?data.id:generateId(10)}_${btoa("tbi")}`}>
                  <motion.div className="tooltip" >
                    {data?data.title:""}
                  </motion.div>
                </motion.button>)}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  </>);
}