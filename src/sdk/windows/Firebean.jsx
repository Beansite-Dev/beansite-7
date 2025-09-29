//?refrence
// https://i.ytimg.com/vi/vUO846VZogc/maxresdefault.jpg
// https://base-ui.com/react/components/tabs
import { motion } from 'motion/react';
import "../style/Firebean.scss";
import { Tabs } from '@base-ui-components/react/tabs';
import { atom, useAtom } from 'jotai';
import { Icons } from '../modules/Enum';
import { generateId } from '../modules/Lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
let firstTab=generateId(10);
// const NewTab=()=>{
//   return(<>
//     {/* <motion.div className="NewTabLogo"></motion.div>
//     <motion.input
//       type="text"
//       placeholder="Search"
//       className='NewTabInput'
//     /> */}
//     <iframe src="https://www.google.com/webhp?igu=1" className="embed"/>
//   </>);
// }
const NewTabData=(nid=generateId(10))=>{return({
  title:"New Tab",
  icon:Icons.firebean,
  contentType:"component",
  content:"/gs/helios.html",//"https://www.croxyproxy.com/servers",//"https://edgedcircles.com",
  id:nid,
});};
const FirebeanAtom=atom({
  currentTab:firstTab,
  tabs:[
    NewTabData(firstTab),
  ],
});
export const Firebean=({})=>{
  const[fbdat,setFBDat]=useAtom(FirebeanAtom);
  const Tab=({tabData})=>{
    return(<Tabs.Tab className="Tab" value={tabData.id}>
      <div className="TabElm">
        <motion.div style={{
          backgroundImage: `url("${tabData.icon}")`,
        }} className="icon"></motion.div>
        <span>{tabData.title}</span>
        <motion.div className="close" onClick={(e)=>{
          e.preventDefault();
          setFBDat({...fbdat,
            tabs:fbdat.tabs.length>1
            ?fbdat.tabs.filter(t=>t.id!==tabData.id)
            :fbdat.tabs,
          });
        }}>🗙︎</motion.div>
      </div>
      <svg className="flt_svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="flt_tag">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />    
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </Tabs.Tab>);
  }
  const Panel=({tabData})=>{
    const[url,setUrl]=useState("");
    return(<Tabs.Panel className="Contentbox" value={tabData.id}>
      <motion.div className="Actionbar">
        <motion.button onClick={(e)=>{
          let iframe=document.getElementById(`${tabData.id}_contentFrame`);
          //!fuck javascript
          // document.getElementById(`${tabData.id}_contentFrame`).contentWindow.history.back();
          // document.getElementById(`${tabData.id}_contentFrame`).contentWindow.postMessage('reload','*');
          // iframe.contentWindow.postMessage('goBack', '*');
        }} className="adressbarIcon" id="historyBack">🡰</motion.button>
        <motion.button className="adressbarIcon" id="historyForeward">🡲</motion.button>
        <motion.button className="adressbarIcon" id="reload">V</motion.button>
        {/* <motion.button className="adressbarIcon" id="reload"></motion.button> */}
        <input defaultValue="https://www.google.com/webhp?igu=1" id="search"/>
        <motion.button className="adressbarIcon" id="reload">x</motion.button>
        <motion.button className="adressbarIcon" id="reload">S</motion.button>
      </motion.div>
      <motion.div className='Content'>
        {/* {{tabData.contentType=="component"?tabData.content:null}} */}
        <iframe src={tabData.content} id={`${tabData.id}_contentFrame`} className="embed" onLoad={(e)=>{
          // setUrl(e.target.contentWindow.location.href);
          setUrl(e.target.src);
        }}/>
      </motion.div>
    </Tabs.Panel>);
  }
  return(<>
    <Tabs.Root className="Tabs" 
      value={fbdat.tabs.find((tab)=>tab.id===fbdat.currentTab)?fbdat.currentTab:fbdat.tabs[0].id}
      onValueChange={(value)=>{
        setFBDat({
          ...fbdat,
          currentTab:value,
        });
      }}>
        <Tabs.List className="Tabbar">
          {fbdat.tabs.map((tab,index)=>
            <Tab key={tab.id} tabData={tab} />)}
            <motion.div id="NewTabButtonWrapper" style={{translate:`calc(-3.5% * ${fbdat.tabs.length-1}) 0`,}}>
              <motion.button id="NewTabButton" 
                onClick={(e)=>{if(fbdat.tabs.length<=4){
                  e.preventDefault();
                  const newTabId=generateId(10);
                  setFBDat({
                    ...fbdat,
                    tabs:[...fbdat.tabs,NewTabData(newTabId)],
                    currentTab:newTabId,
                  });
              }}}></motion.button>
              <svg className="flt_svg2" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="flt_tag2">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />    
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                    <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
                  </filter>
                </defs>
              </svg>
            </motion.div>
        </Tabs.List>
        {fbdat.tabs.map((tab,index)=>
          <Panel key={tab.id} tabData={tab} />)}
    </Tabs.Root>
  </>);
}