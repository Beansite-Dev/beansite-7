// styles
import './style/App.scss';
// external libraries
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHotkeys } from 'react-hotkeys-hook';
import { motion } from 'motion/react';
// components
import { AppWrapper, Window } from './sdk/sdk';
import { OpenSolaris, Solaris } from './components/solaris';
import { Icons } from './sdk/modules/Enum';
import { generateId } from "./sdk/modules/Lib";
// states
import { useAtom } from 'jotai';
import { winStore } from './sdk/store/Windows';
import { _CHANGELOG } from './changelog';
// windows
import { Beanshell } from './sdk/windows/Beanshell';
import { Beanpowered } from './sdk/windows/Beanpowered';
import { MultibeanMC } from './sdk/windows/MultibeanMC';
import { SettingsMenu } from './sdk/windows/Settings';
import { Firebean } from './sdk/windows/Firebean';
// firebase
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { put } from "@vercel/blob";
// const{url}=await put('articles/blob.txt',
//   'Hello World!',{
//     access:'public'
//   });
export const _DEBUG=false;//REMEMBER TO CHANGE WHEN DEPLOYED
export const firebaseConfig={
  apiKey: "AIzaSyBncUTzQsaN86K0kA1vNv4JJ3siCetvFlY",
  authDomain: "beansite7.firebaseapp.com",
  projectId: "beansite7",
  storageBucket: "beansite7.firebasestorage.app",
  messagingSenderId: "571629888807",
  appId: "1:571629888807:web:c87fe4fcb8725a1f24f502",
  measurementId: "G-N2SB8TPT98"
};
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const App=({})=>{
  const[_,setSolarisOpen]=useAtom(OpenSolaris);
  const desktopShortcutsList=[
    {
      title: "Welcome!",
      icon: Icons.application,
      target: "welcome",
      pos: [0,0]
    },{
      title: "BeanShell",
      icon: Icons.commandPrompt,
      target: "beanshell",
      pos: [1,0]
    },{
      title: "Beanpowered",
      icon: Icons.beanpowered,
      target: "beanpowered",
      pos: [2,0]
    },{
      title: "MultibeanMC",
      icon: Icons.multibeanmc,
      target: "multibeanmc",
      pos: [3,0]
    },{
      title: "Settings",
      icon: Icons.configApplication,
      target: "settings",
      pos: [4,0]
    },{
      title: "Firebean",
      icon: Icons.firebean,
      target: "firebean",
      pos: [0,1]
    },
  ];
  const[debugMenuVisibility,setDebugMenuVisibility]=useState(false);
  useEffect(()=>{
    document.body.className="default";
    if(!_DEBUG)logEvent(analytics, 'page_view');
  },[]);
  //!not in use
  useEffect(()=>{
    if(!debugMenuVisibility)setTimeout(()=>{
      document.getElementById("DevPreviewContainer").style.display="none";
    },350);
    else document.getElementById("DevPreviewContainer").style.display="flex";
  },[debugMenuVisibility]);
  useHotkeys('ctrl+`',(e)=>{
    e.preventDefault();
    if(_DEBUG)setDebugMenuVisibility(!debugMenuVisibility);
  });
  /* const GameLoaderWindow=({dragConstraint})=>{
    const[glt,sGlt]=useAtom(glData);
    useEffect(()=>{
      console.table(glt);
    });
    return(<>
      <Window
        className="gameloader"
        // closed
        dragConstraint={dragConstraint}
        customWindowStyling={glt.closed
          ?{display:"none",pointerEvents:"none"}
          :{display:"auto",pointerEvents:"auto"}}
        data={{
          title:glt.title,
          icon: glt.icon,
          id:generateId(10),
          // height: 350,
          // width: 500,
          x:(innerWidth-300)/2,
          y:(innerHeight-225)/2,
          includeTitlebarButtons:["close","max","min"],
        }}>
            
      </Window>
    </>);
  } */
 const QuickAccessShortcut=({
  name,target,id,icon
 })=>{
  const[Windows,setWindows]=useAtom(winStore);
  const OpenApp=()=>{
    setWindows([
      ...Windows.filter(win=>win.className!==target),
      {...Windows.filter(win=>win.className===target)[0],
        closed:false,min:false,max:false}
    ]);
  }
  return(<>
    <div onClick={(e)=>{
      e.preventDefault();
      OpenApp();
    }} className='qcitem' id={id}>
      <div className='icon' style={{backgroundImage:`url(${icon})`}}></div>
      <span>{name}</span>
    </div>
  </>);
 }
  return(<>
    <Helmet>
      <title>Beansite 7</title>
      <link rel="icon" type="image/svg+xml" href="" />
      <link rel="stylesheet" href="/themes/default.scss" />
    </Helmet>
    <Analytics/>
    <SpeedInsights/>
    <AppWrapper desktopShortcutsList={desktopShortcutsList} StartMenuApps={desktopShortcutsList}>
      {/* <div id="bloomfx"></div> */}
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
          <h1>Welcome To Beansite 7!</h1><div id="logo"></div>
          <p>Quick Access</p>
          <div id="quickAccess">
            <QuickAccessShortcut 
              name="Beanshell"
              target="beanshell"
              icon={Icons.commandPrompt}
              id={generateId(10)}/>
            <QuickAccessShortcut 
              name="MultibeanMC"
              target="multibeanmc"
              icon={Icons.multibeanmc}
              id={generateId(10)}/>
            <QuickAccessShortcut 
              name="Settings"
              target="settings"
              icon={Icons.configApplication}
              id={generateId(10)}/>
          </div>
      </Window>
      <Window
        className="changelog"
        data={{
          title:"Changelog",
          icon:"/icons/68.ico",
          id:generateId(10),
          x:15,
          y:245,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <h1>Changelog - {_CHANGELOG.v}<br/><span>{_CHANGELOG.d}</span></h1>
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
      <Window
        className="beanpowered"
        // closed
        customContentBoxStyling={{
          background: "#171d25 !important",
          border: "none",
          overflow: "hidden",
        }}
        data={{
          title:"Beanpowered",
          icon: Icons.beanpowered,
          id:generateId(10),
          // height: 350,
          // width: 500,
          x:330,
          y:15,
          height: 445,
          width: 700,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <Beanpowered />
      </Window>
      <Window
        className="settings"
        closed
        data={{
          title:"Settings",
          icon: Icons.configApplication,
          id:generateId(10),
          x:15+15,
          y:15+15,
          height: 350,
          width: 500,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <SettingsMenu/>
      </Window>
      <Window
        className="multibeanmc"
        closed
        data={{
          title:"MultibeanMC",
          icon: Icons.multibeanmc,
          id:generateId(10),
          // height: 350,
          // width: 500,
          // x:330+15,
          x:15+15,
          y:15+15,
          height: 445,
          width: 700,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <MultibeanMC/>
      </Window>
      <Window
        className="firebean"
        closed
        // expandContentBoxIntoTitlebar
        hideTitleInTitlebar
        customContentBoxStyling={{
          border: "none",
          overflow: "hidden",
          padding: "0",
          background: "transparent",
          top: "16px",
          height: "calc(100% - 19px)",
        }}
        data={{
          title:"Firebean",
          icon: Icons.firebean,
          id:generateId(10),
          // height: 350,
          // width: 500,
          // x:330+15,
          x:15+(2*15),
          y:15+(2*15),
          height: 445,
          width: 700,
          includeTitlebarButtons:["close","max","min"],
        }}>
          <Firebean />
      </Window>
      {/* <GameLoaderWindow/> */}
      {_DEBUG?
        <Window
          className="debug"
          closed
          data={{
            title:"Debug Menu",
            icon: Icons.configApplication,
            id:generateId(10),
            // height: 350,
            // width: 500,
            x:330,
            y:255,
            includeTitlebarButtons:["close","max","min"],
          }}>
            <button 
              onClick={(e)=>{
                e.preventDefault();
                setSolarisOpen(true);
              }}
              className='button1'>Run Solaris.exe</button>
        </Window>
      :null}
      <Solaris/>
    </AppWrapper>
  </>);
};
export default App;