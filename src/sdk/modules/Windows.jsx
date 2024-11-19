import "../style/Window.scss";
import { useState, useCallback } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
export const Window=({
  dragConstraint,
  children,
  data:{
    title,
    icon,
    id,
    includeTitlebarButtons,
    x=0,
    y=0,
    height=280,
    width=360,
  }
})=>{
  const [isDraggingY,setIsDraggingY]=useState(false);
  const mHeight=useMotionValue(height);
  const handleDragY=useCallback((event, info)=>{
    let newHeight=mHeight.get()+info.delta.y;
    if(newHeight>150&&newHeight<2000)mHeight.set(mHeight.get()+info.delta.y);
  },[]);
  const [isDraggingX,setIsDraggingX]=useState(false);
  const mWidth=useMotionValue(width);
  const handleDragX=useCallback((event, info)=>{
    let newWidth=mWidth.get()+info.delta.x;
    if(newWidth>150&&newWidth<2000)mWidth.set(mWidth.get()+info.delta.x);
  },[]);
  return(<>
    <motion.div 
      drag
      dragConstraints={dragConstraint}
      dragMomentum={false}
      initial={{opacity:0,y:5}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:.15,delay:.15}}
      className="window" 
      id={id} 
      style={{height:mHeight,width:mWidth}}>
        <div className="tb" id={`${id}tb`}>
          <h1>{title}</h1>
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
          onDragEnd={() => {
            setIsDraggingY(false);
          }}
          onDragStart={() => {
            setIsDraggingY(true);
          }}></motion.div>
        <motion.div
          drag="x"
          className="resizeX"
          dragConstraints={{top: 0,left:0,right:0,bottom:0}}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDragX}
          onDragEnd={() => {
            setIsDraggingX(false);
          }}
          onDragStart={() => {
            setIsDraggingX(true);
          }}></motion.div>
    </motion.div>
  </>);
}