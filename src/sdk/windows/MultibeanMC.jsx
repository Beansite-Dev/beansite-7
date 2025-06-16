
import { motion } from "motion/react";
import "../style/apps/MultibeanMC.scss";
import { Icons } from "../modules/Enum";
import { generateId } from "../modules/Lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapsible } from '@base-ui-components/react/collapsible';
import { useEffect, useRef, useState } from "react";
import { faArrowUpRightFromSquare, faChevronRight, faCloudArrowDown, faCopy, faDeleteLeft, faFolder, faFolderClosed, faFolderOpen, faFolderPlus, faGear, faNewspaper, faPlay, faPlus, faQuestionCircle, faTag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MD5 } from "crypto-js";
import { mcv } from "../store/mcv";
export const MultibeanMC=({})=>{
  const d=new Date();
  const f=new Intl.DateTimeFormat('en-US',{
    hour:'numeric',
    minute:'numeric',
    hour12:true,
  });
  const currentDate=`${d.getMonth()}/${d.getDate()}/${String(d.getFullYear()).slice(2)} ${f.format(d)}`;
  function generateUsername(){
    const adjectives=["Cool","Brave","Clever","Swift","Quiet","Sunny","Wild","Calm","Bold","Sharp"];
    const nouns = ["Tiger","Eagle","Wolf","Fox","Lion","Bear","Hawk","Snake","Shark","Horse"];
    const numbers=Math.floor(Math.random()*100);
    const randomAdjective=adjectives[Math.floor(Math.random()*adjectives.length)];
    const randomNoun=nouns[Math.floor(Math.random()*nouns.length)];
    return`${randomAdjective}${randomNoun}${numbers}`;
  }
  const username=generateUsername();
  function generateGravatarUrl(email,size=40,defaultImage='identicon') {
    const trimmedEmail=email.trim().toLowerCase();
    const hash=MD5(trimmedEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;
  }
  const MultiBeanMCWrapper=({})=>{
    const[selectedItem,setSelectedItem]=useState({name:"Eaglercraft 1.8.8",...mcv["Eaglercraft 1.8.8"]});
    const Release=({
      name,icon,url,id
    })=>{
      return(<>
        <motion.div id={id} className="Release" onClick={(e)=>{
          e.preventDefault();
          setSelectedItem({
            ...mcv[name],name
          });
        }}>
          <div className="icon" style={{
            backgroundImage:`url("${icon}")`
          }}></div>
          <span className="rname">{name}</span>
        </motion.div>
      </>);
    }
    return(<>
      <motion.div id="mbmcwrap">
        <motion.nav>
          <motion.button className="navitem">
            <span className="icon">
              <FontAwesomeIcon icon={faPlus}/>
            </span>
            Add Instance
          </motion.button>
          <hr/>
          <motion.button className="navitem">
            <span className="icon">
              <FontAwesomeIcon icon={faFolder}/>
            </span>
            Folders
          </motion.button>
          <motion.button className="navitem">
            <span className="icon">
              <FontAwesomeIcon icon={faGear}/>
            </span>
            Settings
          </motion.button>
          <motion.button className="navitem">
            <span className="icon">
              <FontAwesomeIcon icon={faQuestionCircle}/>
            </span>
            Help
          </motion.button>
          <motion.button className="navitem">
            <span className="icon">
              <FontAwesomeIcon icon={faCloudArrowDown}/>
            </span>
            Update
          </motion.button>
          <hr/>
          <motion.span id="userBox">
            <motion.span id="userIcon" style={{
              backgroundImage:`url("${generateGravatarUrl(username+"@gmail.com")}")`
            }}></motion.span>
            {username}
          </motion.span>
        </motion.nav>
        <motion.div id="itemDisplay">
          <motion.div id="idicon" style={{
            backgroundImage:`url("${selectedItem.icon}")`,
          }}></motion.div>
          <motion.h1>{selectedItem.name}</motion.h1>
          <hr/>
          <motion.button className="iditem" id="mmbmcLaunch" onClick={(e)=>{
            e.preventDefault();
            var win=window.open("",selectedItem.name,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100");
            win.document.documentElement.innerHTML=`
              <title>${selectedItem.name}</title>
              <link rel="icon" type="image/x-icon" href="${selectedItem.icon}">
              <iframe src="${selectedItem.url}" 
                style="
                  height:100dvh;
                  width:100dvw;
                  position:fixed;
                  top:50%;
                  left:50%;
                  translate:-50% -50%;" />
            `;
          }}>
            <span className="icon">
              <FontAwesomeIcon icon={faPlay}/>
            </span>
            Launch
          </motion.button>
          <hr/>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faGear}/>
            </span>
            Edit
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faTag}/>
            </span>
            Change Group
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faFolder}/>
            </span>
            Folder
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faFolderPlus}/>
            </span>
            Export
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faCopy}/>
            </span>
            Copy
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faTrash}/>
            </span>
            Delete
          </motion.button>
          <motion.button className="iditem">
            <span className="icon">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </span>
            Create Shortcut
          </motion.button>
          <hr/>
        </motion.div>
        <motion.div id="statusBar">
          <motion.div id="topBar">
            <span className="ord1">
              <FontAwesomeIcon icon={faNewspaper}/>
              MultibeanMC Release 2.4, now available</span>
            <span><FontAwesomeIcon icon={faNewspaper}/>More News</span>
          </motion.div>
          <motion.div id="bottomBar">
            <span className="ord1">
              {selectedItem.name}, last played on {currentDate} for{'\u00A0'}
              {Math.floor((Math.random()*58))+1}min {Math.floor((Math.random()*58))+1}s{'\u00A0'}
              total played {Math.floor((Math.random()*10))}d {Math.floor((Math.random()*22))+1}h{'\u00A0'}
              {Math.floor((Math.random()*58))+1}min
            </span>
            <hr/>
            <span>
              Total Playtime: {Math.floor((Math.random()*30))}d {Math.floor((Math.random()*22))+1}h{'\u00A0'}
              {Math.floor((Math.random()*58))+1}min
            </span>
          </motion.div>
        </motion.div>
        <motion.div id="mainInstanceWrapper">
          <Collapsible.Root className="mbmcCollapsible" defaultOpen>
            <Collapsible.Trigger className="mbmcCollapsibleTrigger">
              <FontAwesomeIcon icon={faChevronRight} className="mbmcCollapsibleIcon" />
              Vanilla
            </Collapsible.Trigger>
            <Collapsible.Panel className="mbmcCollapsiblePanel">
              {Object.keys(mcv).filter(n=>mcv[n].type=="vanilla").map(vn=><Release
                name={vn} 
                key={mcv[vn].id}
                icon={mcv[vn].icon} 
                url={mcv[vn].url} 
                id={mcv[vn].id}/>)}
            </Collapsible.Panel>
          </Collapsible.Root>
          <Collapsible.Root className="mbmcCollapsible" defaultOpen>
            <Collapsible.Trigger className="mbmcCollapsibleTrigger">
              <FontAwesomeIcon icon={faChevronRight} className="mbmcCollapsibleIcon" />
              Modded
            </Collapsible.Trigger>
            <Collapsible.Panel className="mbmcCollapsiblePanel">
              {Object.keys(mcv).filter(n=>mcv[n].type=="modded").map(vn=><Release
                name={vn} 
                key={mcv[vn].id}
                icon={mcv[vn].icon} 
                url={mcv[vn].url} 
                id={mcv[vn].id}/>)}
            </Collapsible.Panel>
          </Collapsible.Root>
        </motion.div>
      </motion.div>
    </>);
  }
  return(<MultiBeanMCWrapper/>);
};