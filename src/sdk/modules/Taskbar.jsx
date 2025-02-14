import  "../style/Taskbar.scss";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { generateId } from "./Lib";
// import { easeInOut } from "motion";
import { winStore } from "../store/Windows";
// import { useRecoilState } from 'recoil';
// import domtoimage from 'dom-to-image';
import html2canvas from "html2canvas";
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";
const startMenuAtom=atom(false);
const StartMenu=()=>{
  const [startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  return(<motion.div 
    id="StartMenu"
    transition={{
      type: 'tween',
      duration: .35,
      ease: [.65, .35, .35, .65],
    }}
    initial={{
      x:"calc(-100%)",
      opacity:0,}}
    animate={{
      x:startMenuOpen?0:"calc(-100%)",
      opacity:startMenuOpen?1:0}}>
    <motion.div id="sm_shortcutWrapper">
      
    </motion.div>
  </motion.div>);
}
const StartMenuButton=()=>{
  const [startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  return(<motion.button 
    onClick={()=>{
      setStartMenuOpen(!startMenuOpen);
    }}
    className="item" id="startButton"></motion.button>)
}
export const Taskbar=({})=>{
  const[Windows,setWindows]=useAtom(winStore);
  // const[startMenuOpen,setStartMenuOpen]=useState(false);
  const TaskbarIcon=({data,index})=>{
    const handleOnHover=(elmid,resid)=>{
      //!html2canvas version (works but poorly)
      html2canvas(document.getElementById(elmid),{
        ignoreElements:(e)=>{
          if(e.classList.contains("window")){
            // e.classList.add("safeGraphics");
            return e.cloneNode().classList.add("safeGraphics");
          };
          if(e.classList.contains("ico"))return(true);
        }
      })
        .then(canvas=>{
          document.getElementById(resid).style.backgroundImage=`url(${canvas.toDataURL('image/png')})`;
          // document.getElementById(elmid).classList.remove("safeGraphics");
        });
        // .catch((error)=>{console.error('App preview failed!', error);});
      //!domtoimage version (also barely functional)
      /* domtoimage.toPng(document.getElementById(elmid))
        .then((dataUrl)=>{document.getElementById(resid).style.backgroundImage=`url(${dataUrl})`;})
        .catch((error)=>{console.error('App preview failed!', error);}); */
    };
    return(<>
      <motion.button 
        style={{
          backgroundImage:`url("${data?data.icon:'/icons/15.ico'}")`,
        }}
        transition={{duration:.25}}
        initial={{opacity:0,y:48}}
        animate={data?!data.closed?
          {opacity:1,y:0}:
          {opacity:0,y:48,display:"none"}:
          {opacity:0,y:48,display:"none"}}
        exit={{opacity:0,y:48}}
        className="item open"
        onClick={(e)=>{
          setWindows([
            ...Windows.filter(win=>win.id!=data.id&&win.index<index),
            {...data,min:!data.min},
            ...Windows.filter(win=>win.id!=data.id&&win.index>index),
          ]);
        }}
        onMouseEnter={(e)=>{
          handleOnHover(data.id,`${data.id}_apvres`);
        }}>
          <motion.div className="tooltip">
            {data?data.title:""}
            <div className="appPreview" id={`${data?data.id:generateId(10)}_apvres`}></div>
          </motion.div>
        </motion.button>
    </>);
  }
  return(<>
    <StartMenu/>
    <motion.div 
      id="Taskbar" 
      initial={{y:5,opacity:0}} 
      transition={{duration:.35,}}
      animate={{y:0,opacity:1,}}>
        <motion.div id="tb_itemWrapper">
          {/* <AnimatePresence 
            mode="popLayout"> */}
            <StartMenuButton />
              {Windows.map((data,index)=>
                <TaskbarIcon 
                  data={data} 
                  index={index}
                  key={`${data?data.id:generateId(10)}_${btoa("tbi")}`}/>)}
          {/* </AnimatePresence> */}
        </motion.div>
    </motion.div>
  </>);
}