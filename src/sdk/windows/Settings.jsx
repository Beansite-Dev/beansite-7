import { Window } from "../sdk";
import { generateId } from "../modules/Lib";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { motion, Reorder, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { DndContext } from "@dnd-kit/core";
// import { SortableContext } from '@dnd-kit/sortable';
// import { ReactSortable } from "react-sortablejs";
export const SettingsAtom=atom(
    localStorage.getItem("mb7-settings")&&(()=>{
        const requiredKeys=[
            "backgroundImage",
            "backgroundSize",
            "backgroundRepeat",
            "savedWallpapers",
            "theme",
            "font",
        ];
        const settings=JSON.parse(localStorage.getItem("mb7-settings"));
        return settings&&
            Array.isArray(Object.keys(settings)) &&
            requiredKeys.every(key => Object.keys(settings).includes(key));
    })()?JSON.parse(localStorage.getItem("mb7-settings")):{
        backgroundImage:"/wallpapers/default.png",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        savedWallpapers:[],
        theme:"default",
});
export const SettingsMenu=({})=>{
    // localStorage.removeItem('mb7-settings'); //!reset
    const[settings,setSettings]=useAtom(SettingsAtom);
    document.body.className=`${settings.theme} font-${settings.font}`;
    useEffect(()=>{
        localStorage.setItem('mb7-settings',JSON.stringify(settings));
        console.log(localStorage.getItem("mb7-settings"));
        document.body.className=`${settings.theme} font-${settings.font}`;
    },[settings]);
    const BackgroundSelector=({})=>{
        const[bgl,sbgl]=useState([
            {id:1,name:"Default",srctype:"url",src:"/wallpapers/default.png"},
            {id:2,name:"Aurora",srctype:"url",src:"/wallpapers/aurora.png"},
            {id:3,name:"Grid",srctype:"url",src:"/wallpapers/grid.png"},
            ...settings.savedWallpapers
        ]);
        return(<>
            <motion.h2>Background Selector</motion.h2>
            <motion.div className="backgroundSelector">
                {/*//! NOT WORKING */}
                {/* <ReactSortable list={bgl} setList={sbgl}>
                    {bgl.map((item)=>(
                        <div key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable> */}
                {bgl.map(data=><motion.div 
                    className="backgroundItem"
                    key={data.id}
                    onClick={(e)=>{
                        setSettings({
                            ...settings,
                            backgroundImage:data.src,
                        });
                    }}>
                    <div className="bgWrap" style={{backgroundImage:`url("${data.src}")`,}}>
                        {/* {data.name} */}
                    </div>
                </motion.div>)}
                <motion.div className="AddButtonWrapper">
                    <motion.button className="AddButton">
                        <FontAwesomeIcon className="icon" icon={faPlus} />
                    </motion.button>
                </motion.div>
            </motion.div>
            <motion.div className="backgroundSettings">
                <motion.div className="item">
                    <label>Picture Position</label>
                    <div className="customSelect" style={{height:"3.5rem"}}>
                        <div 
                            className="bgp"
                            style={{
                                backgroundImage:`url("${settings.backgroundImage}")`,
                                backgroundSize:settings.backgroundSize,
                                backgroundRepeat:settings.backgroundRepeat,
                            }}></div>
                        <select 
                            defaultValue={settings.backgroundSize}
                            onChange={(e)=>{
                                setSettings({
                                    ...settings,
                                    backgroundSize:e.target.value,
                                });
                            }}>
                                <option value="cover">Cover</option>
                                <option value="contain">Contain</option>
                        </select>
                    </div>
                </motion.div>
                <motion.div className="item">
                    <label>Picture Repeat</label>
                    <div className="customSelect">
                        <select 
                            defaultValue={settings.backgroundRepeat}
                            onChange={(e)=>{
                                setSettings({
                                    ...settings,
                                    backgroundRepeat:e.target.value,
                                });
                            }}>
                                <option value="repeat">Repeat</option>
                                <option value="no-repeat">No Repeat</option>
                        </select>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div className="backgroundSettings">
                <motion.div className="item">
                    <label>Theme</label>
                    <div className="customSelect">
                        <select 
                            defaultValue={settings.theme}
                            onChange={(e)=>{
                                setSettings({
                                    ...settings,
                                    theme:e.target.value,
                                });
                            }}>
                                <option value="default">Default</option>
                                <option value="dark">Dark</option>
                        </select>
                    </div>
                </motion.div>
                <motion.div className="item">
                    <label>Font</label>
                    <div className="customSelect">
                        <select 
                            defaultValue={settings.font}
                            onChange={(e)=>{
                                setSettings({
                                    ...settings,
                                    font:e.target.value,
                                });
                            }}>
                                <option value="segoe">Segoe</option>
                                <option value="tahoma">Tahoma</option>
                                <option value="comic">Comic Sans</option>
                                <option value="times">Times New Roman</option>
                        </select>
                    </div>
                </motion.div>
            </motion.div>
        </>);
    }
    return(<>
        {createPortal(<>
            <motion.div className="wallpaper" style={{
                backgroundImage:`url("${settings.backgroundImage}")`,
                backgroundSize:settings.backgroundSize,
                backgroundRepeat:settings.backgroundRepeat,
            }}></motion.div>
        </>,document.body)}
        <motion.h1>Settings</motion.h1>
        <BackgroundSelector/>
    </>);
};