import { useEffect, useState } from 'react';
import './style/App.scss';
import { Helmet } from 'react-helmet-async';
import { AppWrapper, Window } from './sdk/sdk';
import { generateId } from "./sdk/modules/Lib";
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'motion/react';
import { Icons } from './sdk/modules/Enum';
import { Beanshell } from './sdk/windows/Beanshell';
const App=({})=>{
  const _CHANGELOG={
    "v":"v0.9.4",
    "cm":"Nobody's gonna get all the hidden jokes in BeanShell bc i dont think theyre even ever heard of Neofetch",
    "c":[
      "Added Beanshell",
      "Added Beanshell Syntax Highlighting",
      "Implemented OhMyBsh to Bsh",
      "Implemented Neofetch to Bsh",
      "Style Tweaks",
      "Fixed State Reload issue in Taskbar",
      "Fixed taskbar rendering unloaded windows items",
    ]
  };
  const desktopShortcutsList=[
    {
      title: "Welcome!",
      icon: Icons.application,
      target: "welcome",
      pos: [0,0]
    },
    {
      title: "BeanShell",
      icon: Icons.commandPrompt,
      target: "beanshell",
      pos: [0,1]
    },
  ];
  const[debugMenuVisibility,setDebugMenuVisibility]=useState(true);
  /* useEffect(()=>{
    if(!debugMenuVisibility)setTimeout(()=>{
      document.getElementById("DevPreviewContainer").style.display="none";
    },350);
    else document.getElementById("DevPreviewContainer").style.display="flex";
  },[debugMenuVisibility]);
  useHotkeys('ctrl+`',(e)=>{
    e.preventDefault();
    setDebugMenuVisibility(!debugMenuVisibility);
  }); */
  useEffect(()=>{
    document.body.className="default";
  },[]);
  return(<>
    <Helmet>
      <title>Beansite 7</title>
      <link rel="icon" type="image/svg+xml" href="" />
      <link rel="stylesheet" href="/themes/default.scss" />
    </Helmet>
    <AppWrapper desktopShortcutsList={desktopShortcutsList}>
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
          {/* <p>Pro tip: Hide this menu using "ctrl+`"</p><br/> */}
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
          icon:Icons.application,
          id:generateId(10),
          x:15,
          y:15,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <h1>Welcome To Beansite 7!</h1>
      </Window>
      <Window
        className="changelog"
        data={{
          title:"Changelog",
          icon:"/icons/68.ico",
          id:generateId(10),
          x:330,
          y:15,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <h1>Changelog - {_CHANGELOG.v}</h1>
          <p>{_CHANGELOG.cm}</p>
          <ul>
            {_CHANGELOG.c.map((d,i)=><li key={i}>{d}</li>)}
          </ul>
      </Window>
      <Window
        className="beanshell"
        closed
        data={{
          title:"BeanShell",
          icon: Icons.commandPrompt,
          id:generateId(10),
          height: 350,
          width: 500,
          x:30,
          y:30,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <Beanshell />
      </Window>
    </AppWrapper>
  </>);
};
export default App;