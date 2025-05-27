import { atom, useAtom } from "jotai";
import { motion } from "motion/react";
import "../style/apps/Beanpowered.scss";
import { Icons } from "../modules/Enum";
import { generateId } from "../modules/Lib";
import { winStore } from "../store/Windows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowLeft, faArrowRight, faDownload, faGear, faHeart, faInfoCircle, faPlay, faPlus, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from '@base-ui-components/react/tabs';
import games from "../store/games";
import { useEffect, useRef, useState } from "react";
// export const glData=atom({
//   title:"Gameloader",
//   gameUrl:"",
//   icon:Icons.gamesDirectory,
//   closed:true,
// });
export const Beanpowered=({})=>{
  const[Windows,setWindows]=useAtom(winStore);
  const[searchRes,setSearchRes]=useState(games);
  const GameUI=({gamedata,gamename})=>{
    const s=useRef(null);
    // const[offScreen,setOffScreen]=useState(false);
    const ScrollBG=(elm)=>{
      var scrolltotop=elm.scrollTop;
      var xvalue="center";
      var factor=.15;
      var yvalue=`calc(50% + ${scrolltotop*factor}px)`;
      console.log(yvalue)
      document.getElementById(`tabheader${gamedata.id}`).style.backgroundPosition=xvalue+" "+yvalue;
    }
    useEffect(()=>{
      document.getElementById(`tabpanel${gamedata.id}`).addEventListener("scroll",(e)=>{
        ScrollBG(e.target);
      });
    },[]);
    const GUILaunchButton=({})=>{
      // const[glt,sGlt]=useAtom(glData);
      return(<motion.button 
        id="GUI_launch"
        onClick={(e)=>{
          e.preventDefault();
          var win=window.open("",gamename,"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=360,top=100,left=100");
          win.document.documentElement.innerHTML=`
            <title>${gamename}</title>
            <link rel="icon" type="image/x-icon" href="${`/apps/beanpowered/gicon/${gamedata.id}.png`}">
            <iframe src="${gamedata.url}" 
              allowfullscreen
              style="
                height:100dvh;
                width:100dvw;
                position:fixed;
                top:50%;
                left:50%;
                translate:-50% -50%;"/>`;
        }}>
        <FontAwesomeIcon icon={faPlay} /> Launch
      </motion.button>);
    }
    return(<>
      {/* {offScreen?<>
        <motion.div className="GUI_offscreen">

        </motion.div>
      </>:null} */}
      <motion.div 
        ref={s}
        id={`tabheader${gamedata.id}`}
        style={{backgroundImage:`url("/apps/beanpowered/gbanner/${gamedata.id}.png")`}}
        className="GUI_Header" /* onWheel={()=>{DetectOffscreen();}} */>
        {<motion.div className="GUI_BGFade"></motion.div>}
      </motion.div>
      <motion.div className="GUI" /* onWheel={()=>{DetectOffscreen();}} */>
        <motion.div 
          style={{backgroundImage:`url("/apps/beanpowered/gicon/${gamedata.id}.png")`}}
          className="GUI_icon"></motion.div>
        <motion.div className="GUI_ribbon">
          <GUILaunchButton />
          <motion.div className="infoWrapper">
            <motion.span className="infoWrapperHeader">Usage Time</motion.span>
            <motion.span className="infoWrapperValue">{Math.floor((Math.random()*100)*10)/10} hours</motion.span>
          </motion.div>
          <div className="spacer"/>
          <motion.button 
            // onClick={(e)=>{alert("im not adding that useless functionality bruh. u aint gonna use it anyway")}} 
            className="GUI_ActionButton">
            <FontAwesomeIcon icon={faGear} />
          </motion.button>
          <motion.button 
            // onClick={(e)=>{alert("im not adding that useless functionality bruh. u aint gonna use it anyway")}} 
            className="GUI_ActionButton">
            <FontAwesomeIcon icon={faInfoCircle} />
          </motion.button>
          <motion.button 
            // onClick={(e)=>{alert("im not adding that useless functionality bruh. u aint gonna use it anyway")}} 
            className="GUI_ActionButton">
            <FontAwesomeIcon icon={faHeart} />
          </motion.button>
        </motion.div>
        <motion.div className="GUI_selectionWrapper">
          <motion.div className="GUI_selectionTabs">
            <motion.button className="GUI_selectionTab">Store Page</motion.button>
            <motion.button className="GUI_selectionTab">Community Hub</motion.button>
            <motion.button className="GUI_selectionTab">Discussions</motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>);
  }
  return(<>
    <div id="bp_appwrapper">
      <motion.div
        id="bp_navbar">
          <motion.button 
            className="bpnb_navbtn">
              <FontAwesomeIcon icon={faArrowLeft} />
          </motion.button>
          <motion.button 
            className="bpnb_navbtn">
              <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
          <br/>
          <motion.button
            className="bpnb_button selected"
            onClick={()=>{
              //? working poc
              /* setWindows([
                ...Windows.filter(win=>win.className!=="gameloader"),
                {...Windows.filter(win=>win.className==="gameloader")[0],
                  //closed:!Windows.filter(win=>win.className==="gameloader")[0].closed,
                  ///?or
                  closed:false,
                  min:false,
                  max:false}
              ]); */
            }}
            id="">Library</motion.button>
          <motion.button
            className="bpnb_button"
            id="">User</motion.button>
      </motion.div>
      
    <motion.div
      id="bp_footer">
        <motion.button className="bpf_button bottom">
          <div><FontAwesomeIcon icon={faPlus} /></div> Add a Game
        </motion.button>
        <motion.button className="bpf_button center">
          <div><FontAwesomeIcon icon={faDownload} /></div> Manage Downloads
        </motion.button>
        <motion.button className="bpf_button right">
          Friends & Chat <div><FontAwesomeIcon icon={faUserFriends} /></div> 
        </motion.button>
    </motion.div>
    <motion.div
      id="bpsb_searchbar">
        <motion.input
          onChange={(e)=>{
            /* setSearchRes(Object.filter(games,item=>
              games.find(item))); */
            setSearchRes(e.target.value?
              Object.keys(games)
              .filter(key=>key.toLowerCase().includes(e.target.value.toLowerCase()))
              .reduce((obj,key) => {
                obj[key]=games[key];
                return obj;
              },{}):games)
          }}
          id="bp_SearchBar">
        </motion.input>
    </motion.div>
    <Tabs.Root className="bp_tabs" defaultValue="slope">
      <Tabs.List className="bp_sidebar">
        {Object.keys(searchRes).map(name=>
          <Tabs.Tab key={games[name].id} className="bpsb_item" value={games[name].id}>
            <motion.div 
              className="bpsbi_icon"
              style={{backgroundImage:`url("/apps/beanpowered/gicon/${games[name].id}.png")`}}>
            </motion.div> <span className="bpsbi_txt">{name}</span>
          </Tabs.Tab>)}
        {/* <Tabs.Indicator className="bp_TabIndicator" /> */}
      </Tabs.List>
      {Object.keys(games).map(name=>
        <Tabs.Panel 
          key={games[name].id} 
          className="bp_panel" 
          id={`tabpanel${games[name].id}`}
          value={games[name].id}>
            <GameUI gamedata={games[name]} gamename={name} />
        </Tabs.Panel>)}
    </Tabs.Root>
    </div>
  </>);
}