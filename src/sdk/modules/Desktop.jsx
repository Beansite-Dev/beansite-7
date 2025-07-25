import { motion } from "motion/react";
// import { useRecoilState } from "recoil";
import { useAtom } from "jotai";
import "../style/Desktop.scss";
import { winStore } from "../store/Windows";
import { useRef, useState } from "react";
import { generateId } from "./Lib";
export const Desktop=({appsList=[]})=>{
  const desktopWrapper=useRef(null);
  const[Windows,setWindows]=useAtom(winStore);
  const DesktopIcon=({
    title,
    icon,
    target,
    pos
  })=>{
    // use to open apps. replace target with className
    const OpenApp=()=>{
      setWindows([
        ...Windows.filter(win=>win.className!==target),
        {...Windows.filter(win=>win.className===target)[0],
          closed:false,min:false,max:false}
      ]);
    }
    const[curPos,setCurPos]=useState({
      left:`${((75+5)*pos[1])+10}px`,
      top:`${((75+5)*pos[0])+10}px`,
    });
    const di=useRef(null);
    return(<>
      <motion.div
        id={`${target}_desktopIcon`}
        ref={di}
        drag
        dragConstraints={desktopWrapper}
        dragMomentum={false}
        transition={{duration:.05}}
        //!old snapping script (very buggyyy)
        /* onDragEnd={(e)=>{
          if(di.current){
            let rect=di.current.getBoundingClientRect();
            let x=Math.floor((e.clientX+10)/75);
            let y=Math.floor((e.clientY+10)/50);
            console.log(x,y);
            let left=`${x>=0?((75+5)*x)+10:10}px`;
            let top=`${y>=0?((50+5)*y)+10:10}px`;
            setCurPos({left,top});
            console.log(curPos);
          }
        }} */
        onDoubleClick={(e)=>OpenApp()}
        initial={curPos}
        className="desktopIcon">
          <div 
            style={{backgroundImage:`url(${icon})`,}}
            className="di_icon"></div>
          <h1>{title}</h1>
      </motion.div>
    </>)
  }
  return(<>
    <motion.div
      initial={{scale:1.25,opacity:0}}
      animate={{scale:1,opacity:1}}
      transition={{delay:.15,duration:.15}}
      ref={desktopWrapper}
      id="desktopWrapper">
        {appsList.map(data=><DesktopIcon
          {...data}
          key={`${generateId(10)}_${btoa(data.target)}`}/>)}
    </motion.div>
  </>);
}