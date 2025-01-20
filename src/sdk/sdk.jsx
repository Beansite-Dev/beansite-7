import { useSelector, useDispatch } from 'react-redux';
import "./style/Index.scss";
import { useRef, createContext, Children, cloneElement } from 'react';
export { Window } from './modules/Windows';
import { Taskbar } from './modules/Taskbar';
import { motion } from 'motion/react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { SettingsMenu } from "./windows/Settings";
import { generateId } from './modules/Lib';
export const AppWrapper=({children})=>{
  const windowWrapperRef=useRef(null);
  const renderChildren=()=>{
    return Children.map(children,(child)=>{
      if(["div"].includes(child.type))return child;
      else return cloneElement(child,{dragConstraint:windowWrapperRef});
    });
  };
  return(<>
    <RecoilRoot>
      <motion.div id="App">
        <motion.div id="windowWrapper" ref={windowWrapperRef}>
          {/* {children} */}
          {renderChildren()}
          {/*//! Illegal Constructor Error */}
          {/* <Window
            dragConstraint={windowWrapperRef}
            className="settings"
            data={{
              title:"Settings",
              icon:"/icons/15.ico",
              id:generateId(10),
              x:15 + 315,
              y:15,
              includeTitlebarButtons:["close","max","min"],
            }}><SettingsMenu/></Window> */}
        </motion.div>
        <Taskbar/>
      </motion.div>
    </RecoilRoot>
  </>);
}