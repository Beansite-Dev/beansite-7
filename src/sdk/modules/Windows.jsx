import "../style/Window.scss";
import { useState, useCallback, useEffect } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { generateId } from "./Lib";
export const Window=({
  dragConstraint,
  children,
  closed=false,
  draggable=true,
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
  const[ani,setAni]=useState(closed?{opacity:0,y:-5}:{opacity:1,y:0});
  return(<>
    <motion.div 
      drag
      dragConstraints={dragConstraint}
      dragListener={!(isDraggingX||isDraggingY)&&draggable}
      dragMomentum={false}
      transition={{duration:.35}}
      initial={{opacity:0,y:-5}}
      animate={ani}
      className="window" 
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
            {includeTitlebarButtons.map((data,index)=><>
              {data=="close"?
                <button 
                  key={`${generateId(10)}_${btoa(index)}`} 
                  onPointerDownCapture={e=>e.stopPropagation()}
                  className="close"
                  onClick={(e)=>{
                    e.preventDefault();
                    setAni({opacity:0,y:5});
                    setTimeout(
                      ()=>{document.getElementById(`${id}_tb`).style.display="none"},
                      1000);
                  }}>x</button>
                :null}
            </>)}
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