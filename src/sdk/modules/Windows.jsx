import "../style/Window.scss";
import { useState, useCallback, useEffect, Fragment, useRef } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { generateId } from "./Lib";
import { winStore } from "../store/Windows";
// import { useRecoilState } from 'recoil';
import { useAtom } from "jotai";
export const Window=({
  dragConstraint,
  children,
  closed=false,
  draggable=true,
  maximized=false,
  minimized=false,
  className,
  data:{
    title,
    icon,
    id,
    includeTitlebarButtons=[],
    x=15,
    y=15,
    height=215,
    width=300,
  },
  customContentBoxStyling={},
  customWindowStyling={},
  expandContentBoxIntoTitlebar=false,
  hideTitleInTitlebar=false,
  //callbacks
  beforeClose=()=>{},
  afterClose=()=>{},
  beforeMinimize=()=>{},
  afterMinimize=()=>{},
  beforeMaximize=()=>{},
  afterMaximize=()=>{},
})=>{
  const winParent=useRef(null);
  const[isDraggingY,setIsDraggingY]=useState(false);
  const mHeight=useMotionValue(height);
  const handleDragY=useCallback((e,info)=>{
    let newHeight=mHeight.get()+info.delta.y;
    if(newHeight>150&&newHeight<2000)mHeight.set(mHeight.get()+info.delta.y);
  },[]);

  const[isDraggingX,setIsDraggingX]=useState(false);
  const mWidth=useMotionValue(width);
  const handleDragX=useCallback((e,info)=>{
    let newWidth=mWidth.get()+info.delta.x;
    if(newWidth>150&&newWidth<2000)mWidth.set(mWidth.get()+info.delta.x);
  },[]);

  const[_closed,setClosed]=useState(closed);
  const[ani,setAni]=useState(closed?{opacity:0}:{opacity:1});
  const[_maximized,setMaximized]=useState(maximized);
  const[_minimized,setMinimized]=useState(minimized);
  
  const[Windows,setWindows]=useAtom(winStore);

  useEffect(()=>{
    if(!Windows.find(win=>win.id===id))
      setWindows([
        ...Windows,{
          title,icon,id,
          className,
          closed:_closed,
          max:_maximized,
          min:_minimized,
        }
    ]);
  });
  useEffect(()=>{
    if(_closed===true){
      setWindows([
        ...Windows.filter(win=>win.id!==id),
        {...Windows.filter(win=>win.id===id)[0],
          closed:true,min:false,max:false}
      ]);
    }
    setAni(_closed||_minimized?{opacity:0}:{opacity:1});
    /* setTimeout(()=>{
      document.getElementById(`${id}_tb`).style.pointerEvents=
      _closed||_minimized?"none":"auto"},500); */
  },[_closed,_maximized,_minimized]);
  useEffect(()=>{
    console.table(Windows);
    // detect minimize change from windows
    if(Windows.filter(win=>win.id==id)[0]
    &&Windows.filter(win=>win.id==id).length==1){
      setMinimized(Windows.filter(win=>win.id==id)[0].min);
      setClosed(Windows.filter(win=>win.id==id)[0].closed);}
  },[Windows]);
  return(<>
    <motion.div 
      drag
      dragConstraints={dragConstraint}
      dragListener={!(isDraggingX||isDraggingY)&&draggable}
      dragMomentum={false}
      transition={{duration:.35}}
      initial={{opacity:0,y:-5}}
      animate={ani}
      ref={winParent}
      style={{height:mHeight,width:mWidth,top:y,left:x,...customWindowStyling}}
      className={`window ${_maximized?"maximized":""} ${className} ${_closed||_minimized?"noInteract":""}`} 
      id={id} 
      onMouseDown={(e)=>{
        var wl=document.getElementsByClassName('window');
        for (var i=0;i<wl.length;i++) {
          wl[i].style.zIndex="auto";
        }
        winParent.current.style.zIndex=90;
      }}>
        <div 
          className="tb" 
          id={`${id}_tb`}
          onMouseUp={(e)=>{
            console.log(e.clientY);
            if(e.clientY<=20){
              includeTitlebarButtons.includes("max")
                ?setMaximized(true)
                :null;
            }
          }}
          onMouseDown={(e)=>{
            _maximized?includeTitlebarButtons.includes("max")
              ?setMaximized(false)
              :null:null;
          }}>
          {!hideTitleInTitlebar?<>
            <div 
              className="ico" id={`${id}_ico`}
              style={{
                backgroundImage:icon?`url('${icon}')`:"",
              }}></div>
            <h1>{title}</h1></>
          :null}
          <div className="bw" id={`${id}_bw`} style={{
            ...expandContentBoxIntoTitlebar?{
              zIndex: 100,
            }:null}}>
            {includeTitlebarButtons.map((data,index)=>
              <Fragment key={`${generateId(10)}_${btoa(index)}`}>
                {data=="close"?
                  <button 
                    onPointerDownCapture={e=>e.stopPropagation()}
                    className="close"
                    onClick={(e)=>{
                      e.preventDefault();
                      setClosed(true);
                    }}>{"🗙︎"}</button>
                  :null}
                {data=="max"?
                  <button 
                    onPointerDownCapture={e=>e.stopPropagation()}
                    className="max"
                    id={`${id}_max`}
                    onClick={(e)=>{
                      e.preventDefault();
                      setMaximized(!_maximized);
                    }}>{_maximized?"🗗︎":"🗖︎"}</button>
                  :null}{/* 🗕︎ */}
                {data=="min"?
                  <button 
                    onPointerDownCapture={e=>e.stopPropagation()}
                    className="min"
                    onClick={(e)=>{
                      e.preventDefault();
                      setMinimized(true);
                    }}>{"🗕"}</button>
                  :null}
            </Fragment>)}
          </div>
        </div>
        <div 
          className="contents" 
          style={{...customContentBoxStyling,
              ...expandContentBoxIntoTitlebar?{
                height:`calc(100% - 12px)`,
                bottom:"6px",
                background: "transparent",
                border: "none",
              }:null,
          }}
          onPointerDownCapture={e=>e.stopPropagation()}>
            {children}
        </div>
        <motion.div
          drag="y"
          className="resizeY"
          dragConstraints={{top: 0,left:0,right:0,bottom:0}}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDragY}
          onDragEnd={(e)=>{
            setIsDraggingY(false);
          }}
          onDragStart={(e)=>{
            setIsDraggingY(true);
          }}></motion.div>
        <motion.div
          drag="x"
          className="resizeX"
          dragConstraints={{top: 0,left:0,right:0,bottom:0}}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDragX}
          onDragEnd={(e)=>{
            setIsDraggingX(false);
          }}
          onDragStart={(e)=>{
            setIsDraggingX(true);
          }}></motion.div>
    </motion.div>
  </>);
}