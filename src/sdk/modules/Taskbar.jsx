//?refrence
// https://cdn.prod.website-files.com/6634a8f8dd9b2a63c9e6be83/669e2cc9aadcd76fa47e0bc1_143213.image0.jpeg
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
import { Icons } from "./Enum";
const startMenuAtom=atom(false);
const StartMenu=({StartMenuApps=[]})=>{
  const [startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  /* const StartMenuApps=[
    {
      title:"Welcome",
      icon: Icons.application,
      target:"welcome",
    },
  ] */
  const StartMenuApp=({data})=>{
    const[Windows,setWindows]=useAtom(winStore);
    const OpenApp=()=>{
      setWindows([
        ...Windows.filter(win=>win.className!==data.target),
        {...Windows.filter(win=>win.className===data.target)[0],
          closed:false,min:false,max:false}
      ]);
    }
    return(<>
      <motion.button onClick={(e)=>OpenApp()} className="sm_startMenuApp" id={`sms_${data.target}`}>
        <motion.div className="icon" style={{backgroundImage:`url("${data.icon}")`}}></motion.div>
        <motion.span className="title">{data.title}</motion.span>
      </motion.button>
    </>);
  }
  return(<>
  <motion.div 
    id="hideStartMenu" 
    onClick={(e)=>{setStartMenuOpen(false)}}
    style={{display:startMenuOpen?"flex":"none"}}></motion.div>
  <motion.div 
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
    <motion.div id="sm_actionWrapper">
      <motion.div className="pfp">
        <svg className="hidden" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="SquircleClip-2" clipPathUnits="objectBoundingBox">
			        <path d="M 0,0.5
                C 0,0  0,0  0.5,0
                  1,0  1,0  1,0.5
                  1,1  1,1  0.5,1
                  0,1  0,1  0,0.5"></path>
            </clipPath>
          </defs>
        </svg>
        <motion.div className="pfpimg"></motion.div>
      </motion.div>
      <motion.span className="i1">User</motion.span>
      <motion.span>Documents</motion.span>
      <motion.span>Pictures</motion.span>
      <motion.span>Music</motion.span>
      <hr/>
      <motion.span>Games</motion.span>
      <motion.span>Computer</motion.span>
      <hr/>
      <motion.span>Control Panel</motion.span>
      <motion.span>Help and Support</motion.span>
    </motion.div>
    <motion.div id="sm_shortcutWrapper">
      <motion.div
        transition={{
          type: 'tween',
          duration: .35,
          delay: .15,
          ease: "easeInOut"
        }}
        id="sm_bottomWrapper"
        whileInView={{y:0,opacity:1,}}
        initial={{y:40,opacity:0,}}>
          <motion.div
            transition={{
              type: 'tween',
              duration: .35,
              delay: .25,
              ease: "easeInOut"
            }}
            id="sm_searchWrapper"
            whileInView={{y:0,opacity:1,}}
            initial={{y:20,opacity:0,}}>
              <input type="text" placeholder="Search programs and files" id="sm_search"/>
          </motion.div>
          <motion.button>
            ▶&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            All Programs
          </motion.button>
      </motion.div>
      <motion.div
        transition={{
          type: 'tween',
          duration: .35,
          delay: .15,
          ease: "easeInOut"
        }}
        id="sm_appWrapper"
        whileInView={{y:0,opacity:1,}}
        initial={{y:-40,opacity:0,}}>
          {StartMenuApps.map((data,index)=>
            <StartMenuApp data={data} key={index}/>)}
      </motion.div>
    </motion.div>
  </motion.div></>);
}
const StartMenuButton=()=>{
  const [startMenuOpen,setStartMenuOpen]=useAtom(startMenuAtom);
  return(<motion.button 
    onClick={()=>{
      setStartMenuOpen(!startMenuOpen);
    }}
    className="item" id="startButton"></motion.button>)
}
export const Taskbar=({StartMenuApps=[]})=>{
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
        style={{backgroundImage:`url("${data?data.icon:'/icons/15.ico'}")`,}}
        transition={{duration:.25}}
        initial={{opacity:0,y:48}}
        animate={data?!data.closed?
          {opacity:1,y:0,display:"flex"}:
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
    <StartMenu StartMenuApps={StartMenuApps}/>
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