import { useSelector, useDispatch } from 'react-redux';
import "./style/Index.scss";
import { useRef, createContext, Children, cloneElement } from 'react';
export { Window } from './modules/Windows';
import { Taskbar } from './modules/Taskbar';
import { motion } from 'motion/react';
export const AppWrapper=({children})=>{
  const windowWrapperRef=useRef(null);
  const renderChildren=()=>{
    return Children.map(children,(child)=>{
      if(["div"].includes(child.type))return child;
      else return cloneElement(child,{dragConstraint:windowWrapperRef});
    });
  };

  return(<>
    <motion.div id="App">
      <motion.div id="windowWrapper" ref={windowWrapperRef}>
        {/* {children} */}
        {renderChildren()}
      </motion.div>
      <Taskbar/>
    </motion.div>
  </>);
}