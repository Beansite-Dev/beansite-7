import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import "../style/Desktop.scss";
import { winStore } from "../store/Windows";
import { winLookupStore } from "../store/WinLookup";
import { useRef, useState } from "react";
export const Desktop=({})=>{
  const desktopWrapper=useRef(null);
  const[Windows,setWindows]=useRecoilState(winStore);
  const[WindowLookup,setWindowLookup]=useRecoilState(winLookupStore);
  const DesktopIcon=({
    title,
    icon,
    target,
    pos
  })=>{
    const OpenApp=()=>{
      if(WindowLookup.find(win=>win.className===target))
        setWindowLookup([
          ...WindowLookup.filter(win=>win.className!==target),
          {
            ...WindowLookup.filter(win=>win.className===target),
            closed:false,
          },
      ]);
    }
    const di=useRef(null);
    return(<>
      <motion.div
        id={`${target}_desktopIcon`}
        ref={di}
        /* drag
        dragConstraints={desktopWrapper}
        dragMomentum={false} */
        transition={{duration:.05}}
        /* onDragEnd={(e)=>{
          if(di.current){
            let rect=di.current.getBoundingClientRect();
            let x=Math.floor(rect.left/75);
            let y=Math.floor(rect.top/50);
            di.current.style.left=`${x>=0?((75+5)*x)+10:10}px`;
            di.current.style.top=`${y>=0?((50+5)*y)+10:10}px`;
          }
        }} */
        style={{
          left:`${((75+5)*pos[1])+10}px`,
          top:`${((50+5)*pos[0])+10}px`,
        }}
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
        <DesktopIcon
          title="Welcome!"
          icon="/icons/15.ico"
          target="welcome"
          pos={[4,2]}/>
    </motion.div>
  </>);
}