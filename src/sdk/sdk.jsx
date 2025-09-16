// external modules
import { useRef, createContext, Children, cloneElement } from 'react';
import { motion } from 'motion/react';
// internal components
export { Window } from './modules/Windows';
import { Taskbar } from './modules/Taskbar';
import { Desktop } from './modules/Desktop';
import { SettingsMenu } from "./windows/Settings";
import { generateId } from './modules/Lib';
import { ErrorBoundary } from './modules/core/ErrorBoundary';
import { LoadingScreen } from './modules/LoadingScreen';
// styling
import "./style/Index.scss";

export const AppWrapper=({children,desktopShortcutsList=[],StartMenuApps=[]})=>{
  const AppWrapperContents=({})=>{
    const windowWrapperRef=useRef(null);
    const renderChildren=()=>{
      return Children.map(children,(child)=>{
        if(child&&child.type){
          if(["div"].includes(child.type))return child;
          else return cloneElement(child,{dragConstraint:windowWrapperRef});
        }
      });
    };
    return(<>
      <LoadingScreen/>
      <motion.div id="App">
        <motion.div 
          id="windowWrapper" 
          ref={windowWrapperRef}
          /* onClick={(e)=>{
            if(e.target.id==="windowWrapper")e.stopPropagation();
          }} */>
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
        <Desktop appsList={desktopShortcutsList}/>
        <Taskbar StartMenuApps={StartMenuApps}/>
      </motion.div>
    </>);
  }
  return(<>
    <ErrorBoundary>
      <AppWrapperContents></AppWrapperContents>
    </ErrorBoundary>
  </>);
}