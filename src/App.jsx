import { useEffect, useState } from 'react';
import './style/App.scss';
import { Helmet } from 'react-helmet-async';
import { AppWrapper, Window } from './sdk/sdk';
import { generateId } from "./sdk/modules/Lib";
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'motion/react';
const App=({})=>{
  const[debugMenuVisibility,setDebugMenuVisibility]=useState(true);
  useEffect(()=>{
    if(!debugMenuVisibility)setTimeout(()=>{
      document.getElementById("DevPreviewContainer").style.display="none";
    },350);
    else document.getElementById("DevPreviewContainer").style.display="flex";
  },[debugMenuVisibility]);
  useHotkeys('ctrl+`',(e)=>{
    e.preventDefault();
    setDebugMenuVisibility(!debugMenuVisibility);
  });
  const[theme,setTheme]=useState("default");
  return(<>
    <Helmet>
      <title>Beansite 7</title>
      <link rel="icon" type="image/svg+xml" href="" />
      <link rel="stylesheet" href="/themes/default.scss" />
    </Helmet>
    <AppWrapper>
      <motion.div 
        transition={{duration:.25}}
        initial={{x:20,opacity:0}}
        whileInView={{
          x:debugMenuVisibility?0:20,
          opacity:debugMenuVisibility?1:0}}
        id="DevPreviewContainer">
          <h1>Dev Preview</h1>
          <p>
            This is a VERY early preview of Beansite 7, meaning it's lacking nearly all 
            features and any feature that is implemented probably will be modified or 
            removed
          </p>
          <p>Pro tip: Hide this menu using "ctrl+`"</p><br/>
          <p>
            Currently planned features:<br/>
            - Themes
          </p><br/>
          <p>
            Currently Improvement from XP:<br/>
            - Window Script Efficiency<br/>
            - Animations<br/>
          </p>
      </motion.div>
      <Window
        className="welcome"
        data={{
          title:"Welcome!",
          icon:"/icons/15.ico",
          id:generateId(10),
          includeTitlebarButtons:["close","min","max"],
        }}>
          <h1>Welcome To Beansite 7!</h1>
      </Window>
    </AppWrapper>
  </>);
}
export default App;