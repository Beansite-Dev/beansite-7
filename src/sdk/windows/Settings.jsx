import { Window } from "../sdk";
import { generateId } from "../modules/Lib";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { motion, Reorder, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { put } from "@vercel/blob";
// import { Editor } from '@monaco-editor/react';
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
        font:"segoe",
});
const CSSAtom=atom("");
const CSSEditor=({})=>{
    const[cssa,setCssa]=useAtom(CSSAtom);
    const updateCSS=(e)=>{setCssa(e.target.value);}
    const handleTab = (e) => {
        if(e.key=='Tab'){
            e.preventDefault();
            const start=e.target.selectionStart;
            const end=e.target.selectionEnd;
            e.target.value=e.target.value.substring(0,start)+"    "+e.target.value.substring(end);
            e.target.selectionStart=e.target.selectionEnd=start+4;
            setCssa(e.target.value);
        }
        if(e.key=="{"){
            const start=e.target.selectionStart;
            const end=e.target.selectionEnd;
            e.target.value=e.target.value.substring(0,start)+"}"+e.target.value.substring(end);
            e.target.selectionStart=e.target.selectionEnd=start;
            setCssa(e.target.value);
        }
        if(e.key==":"){
            const start=e.target.selectionStart;
            const end=e.target.selectionEnd;
            e.target.value=e.target.value.substring(0,start)+";"+e.target.value.substring(end);
            e.target.selectionStart=e.target.selectionEnd=start;
            setCssa(e.target.value);
        }
        if(e.key=="\""){
            const start=e.target.selectionStart;
            const end=e.target.selectionEnd;
            e.target.value=e.target.value.substring(0,start)+"\""+e.target.value.substring(end);
            e.target.selectionStart=e.target.selectionEnd=start;
            setCssa(e.target.value);
        }
    }
    return(<>
        <textarea
            height="12rem"
            value={cssa}
            onChange={updateCSS}
            onKeyDown={handleTab}
            /></>);
    // return(<Editor
    //     height="12rem"
    //     width="100%"
    //     language="css"
    //     theme="vs-dark"
    //     value={cssa}
    //     onChange={updateCSS}>
    // </Editor>);
}
const CSS=({})=>{
    const[cssa,_]=useAtom(CSSAtom);
    return(<style>{cssa}</style>);
}
export const SettingsMenu=({})=>{
    // localStorage.removeItem('mb7-settings'); //!reset
    const[settings,setSettings]=useAtom(SettingsAtom);
    document.body.className=`${settings.theme} font-${settings.font}`;
    // const[code,setCode]=useState('// some code');
    useEffect(()=>{
        localStorage.setItem('mb7-settings',JSON.stringify(settings));
        console.log(localStorage.getItem("mb7-settings"));
        document.body.className=`${settings.theme} font-${settings.font}`;
    },[settings]);
    const BackgroundSelector=({})=>{
        const[bgl,sbgl]=useState([
            {id:1,name:"Default",srctype:"url",src:"/wallpapers/default.png"},
            {id:2,name:"Technology",srctype:"url",src:"/wallpapers/technology.png"},
            {id:3,name:"Aurora",srctype:"url",src:"/wallpapers/aurora.png"},
            {id:4,name:"Beach",srctype:"url",src:"/wallpapers/beach.png"},
            {id:5,name:"Dessert",srctype:"url",src:"/wallpapers/dessert.png"},
            {id:6,name:"Dots",srctype:"url",src:"/wallpapers/dots.png"},
            {id:7,name:"Glass",srctype:"url",src:"/wallpapers/glass.png"},
            {id:8,name:"Leaves",srctype:"url",src:"/wallpapers/leaves.png"},
            {id:9,name:"Seeds",srctype:"url",src:"/wallpapers/seeds.png"},
            {id:10,name:"Waterfall",srctype:"url",src:"/wallpapers/waterfall.png"},
            {id:11,name:"Windows",srctype:"url",src:"/wallpapers/windows.png"},
            {id:12,name:"Grid",srctype:"url",src:"/wallpapers/grid.png"},
            ...settings.savedWallpapers
        ]);
        // useEffect(()=>{
        //     alert(JSON.stringify(Object.keys(settings).filter(key=>
        //         key!=='savedWallpapers').reduce((obj,key)=>{
        //             obj[key]=settings[key];
        //             return obj;
        //         },{})).length);
        // });
        return(<>
            <motion.h2>Storage</motion.h2>
            <motion.div id="storageBar">
                <motion.div 
                    style={{
                        width:`${JSON.stringify(
                            Object.keys(settings).filter(key=>
                                key!=='savedWallpapers').reduce((obj,key)=>{
                                    obj[key]=settings[key];
                                    return obj;
                                },{})).length
                            /(50000)}%`,
                    }}
                    className="barSect red"></motion.div>
                <motion.div 
                    style={{
                        width:`${JSON.stringify(settings.savedWallpapers).length
                            /(50000)}%`,
                    }}
                    className="barSect yellow"></motion.div>
                <motion.div 
                    className="barSect gray"></motion.div>
            </motion.div>
            <motion.div className="keyitm">
                <span className="sqr red"></span>
                &nbsp;=System Files 
            </motion.div>
            <motion.div className="keyitm">
                <span className="sqr yellow"></span>
                &nbsp;=Documents/Pictures
            </motion.div>
            <motion.div className="keyitm">
                <span className="sqr gray"></span>
                &nbsp;=Other Files 
            </motion.div>
            <motion.p className="caption">
                Remember, this goes up when you upload wallpapers. 
                I wish it could hold more, but this is an issue with 
                chrome itself, not your device
            </motion.p>
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
                    {!(typeof data.id==='number')?<>
                        <motion.button
                            className="delBtn"
                            onClick={(e)=>{
                                e.preventDefault();
                                // sbgl(bgl.filter(item=>item.id!=data.id));
                                // alert("clicked del");
                                e.stopPropagation();
                                setSettings({
                                    ...settings,
                                    savedWallpapers:[
                                        // ...settings.savedWallpapers,
                                        ...settings.savedWallpapers
                                            .filter(item=>item.id!=data.id),
                                    ],
                                });
                                // alert(JSON.stringify(settings.savedWallpapers));
                                // alert(JSON.stringify(settings));
                            }}>
                        </motion.button>
                    </>:null}
                    <div className="bgWrap" style={{backgroundImage:`url("${data.src}")`,}}>
                        {/* {data.name} */}
                    </div>
                </motion.div>)}
                <motion.div className="AddButtonWrapper">
                    <input 
                        onChange={(e)=>{
                            const selectedFile=e.target.files[0];
                            if(selectedFile){
                                // console.log('Selected file:', selectedFile.name);const blob = await put('avatar.jpg', imageFile, {
                                const r=new FileReader();
                                const r2=new FileReader();
                                // r2.onload=async(e2)=>{
                                //     const blob=await put(
                                //         selectedFile.name, 
                                //         e2.target.result,{
                                //         access:'public',
                                //     });
                                // }
                                r.onload=(e2)=>{
                                    const fC=e2.target.result;
                                    setSettings({
                                        ...settings,
                                        backgroundImage:fC,
                                        savedWallpapers:[
                                            ...settings.savedWallpapers,
                                            {
                                                id:generateId(10),
                                                name:selectedFile.name,
                                                srctype:"file",
                                                src:fC,
                                            }
                                        ]
                                    });
                                    // console.log('File content:',fileContent);
                                };
                                r.readAsDataURL(selectedFile);
                                r2.readAsText(selectedFile);
                            }
                        }}
                        // onClick={(e)=>{alert("file prompting");}} 
                        type="file" 
                        id="bgUpload" 
                        style={{
                            visibility:"hidden",
                            height:"0",
                            width:"0",
                            display:"none",
                        }}></input>
                    <motion.button className="AddButton" onClick={(e)=>{try{
                        e.preventDefault();
                        document.getElementById("bgUpload").click();
                    }catch(e){alert(e);}}}>
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
                                {/* <option value="experimentaldark">Experimental Dark</option> */}
                                <option value="pink">Pink</option>
                                <option value="red">Red</option>
                                <option value="purple">Purple</option>
                                <option value="mint">Mint</option>
                                <option value="forest">Forest</option>
                                <option value="ocean">Ocean</option>
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
            <motion.h2>Custom CSS</motion.h2>
            <motion.p className="caption">
                Custom CSS is an advanced feature for users 
                who want more control over their styling. CSS 
                itself is a very useful skill to learn and a majority 
                of it makes up beansite. If you'de like to learn more, 
                you may go to <motion.a href="https://w3schools.com/css">W3 Schools</motion.a> to learn 
                how to use it
            </motion.p>
            <CSSEditor/>
            <motion.button className="reset" onClick={(e)=>{
                localStorage.clear();
                location.reload();
            }}>Reset</motion.button>
        </>);
    }
    return(<>
        {createPortal(<>
            <motion.div className="wallpaper" style={{
                backgroundImage:`url("${settings.backgroundImage}")`,
                backgroundSize:settings.backgroundSize,
                backgroundRepeat:settings.backgroundRepeat,
            }}></motion.div>
            <CSS/>
        </>,document.body)}
        <motion.h1>Settings</motion.h1>
        <BackgroundSelector/>
    </>);
};