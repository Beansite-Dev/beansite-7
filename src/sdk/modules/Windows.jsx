import "../style/Window.scss";
import { useState, useCallback, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { generateId } from "./Lib";
import { createWindow, removeWindow } from "../store/slices/winSlice";
export const Window=({
  dragConstraint,
  children,
  closed=false,
  draggable=true,
  maximized=false,
  className,
  data:{
    title,
    icon,
    id,
    includeTitlebarButtons=[],
    x=15,
    y=15,
    height=225,
    width=300,
  }
})=>{
  const[isDraggingY,setIsDraggingY]=useState(false);
  const dispatch=useDispatch();
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
  useEffect(()=>{
    dispatch(createWindow({
      title,icon,id,
      maximized:_maximized,
      closed:_closed
    }));
  },[]);
  return(<>
    <motion.div 
      drag
      dragConstraints={dragConstraint}
      dragListener={!(isDraggingX||isDraggingY)&&draggable}
      dragMomentum={false}
      transition={{duration:.35}}
      initial={{opacity:0,y:-5}}
      animate={ani}
      className={`window ${_maximized?"maximized":""} ${className}`} 
      id={id} 
      style={{height:mHeight,width:mWidth,top:y,left:x}}>
        <div className="tb" id={`${id}_tb`}>
          <div 
            className="ico" id={`${id}_ico`}
            style={{
              backgroundImage:icon?`url('${icon}')`:"",
            }}></div>
          <h1>{title}</h1>
          <div className="bw" id={`${id}_bw`}>
            {includeTitlebarButtons.map((data,index)=>
              <Fragment key={`${generateId(10)}_${btoa(index)}`} >
                {data=="close"?
                  <button 
                    onPointerDownCapture={e=>e.stopPropagation()}
                    className="close"
                    onClick={(e)=>{
                      e.preventDefault();
                      setAni({opacity:0});
                      setClosed(true);
                      dispatch(removeWindow(id));
                      setTimeout(
                        ()=>{document.getElementById(`${id}_tb`).style.display="none"},
                        1000);
                    }}>{"🗙︎"}</button>
                  :null}
                {data=="max"?
                  <button 
                    onPointerDownCapture={e=>e.stopPropagation()}
                    className="max"
                    onClick={(e)=>{
                      e.preventDefault();
                      setMaximized(!_maximized);
                    }}>{_maximized?"🗗︎":"🗖︎"}</button>
                  :null}{/* 🗕︎ */}
            </Fragment>)}
          </div>
        </div>
        <div 
          className="contents" 
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