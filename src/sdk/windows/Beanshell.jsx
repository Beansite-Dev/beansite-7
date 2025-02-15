import { atom, useAtom } from "jotai";
import { motion } from "motion/react";
import { generateId } from "../modules/Lib";
import "../style/Beanshell.scss";
import { useEffect, useState } from "react";
const beanshellLogAtom=atom([
  //test log anatomy
  {
    type:"log", //log type, types:{log,warn,error}
    id:generateId(10),
    // contents:"Welcome To Beanshell! To get started, type \"help\"", //simple log contents
    contents:[
      "Welcome To ",
      { //custom properties example
        content:"Beanshell",
        style:"rainbow",
        decoration:"bui"
      },
      "!"
    ]
  },
  {
    type:"log",
    id:generateId(10),
    contents:[
      {
        style: "text_lightgray",
        content: "To get started, type ",
      },
      {
        content:`"help"`,
        style: "text_lightgray",
        decoration:"i"
      },
    ]
  },
  {
    type:"newline-half",
    id:generateId(10),
  },
  {
    type:"log",
    id:generateId(10),
    contents:[
      {content:"_ ",style:"hl_red"},
      {content:"_ ",style:"hl_redorange"},
      {content:"_ ",style:"hl_orange"},
      {content:"_ ",style:"hl_yellow"},
      {content:"_ ",style:"hl_green"},
      {content:"_ ",style:"hl_blue"},
      {content:"_ ",style:"hl_cyan"},
      {content:"_ ",style:"hl_purple"},
      {content:"_ ",style:"hl_pink"},
      {content:"_ ",style:"hl_black"},
      {content:"_ ",style:"hl_gray"},
      {content:"_ ",style:"hl_white"},
    ]
  },
  {
    type:"log",
    id:generateId(10),
    contents:[
      {content:"##",style:"text_red",decoration:"bui"},
      {content:"##",style:"text_redorange",decoration:"bui"},
      {content:"##",style:"text_orange",decoration:"bui"},
      {content:"##",style:"text_yellow",decoration:"bui"},
      {content:"##",style:"text_green",decoration:"bui"},
      {content:"##",style:"text_blue",decoration:"bui"},
      {content:"##",style:"text_cyan",decoration:"bui"},
      {content:"##",style:"text_purple",decoration:"bui"},
      {content:"##",style:"text_pink",decoration:"bui"},
      {content:"##",style:"text_black",decoration:"bui"},
      {content:"##",style:"text_gray",decoration:"bui"},
      {content:"##",style:"text_white",decoration:"bui"},
    ]
  },
  // {
  //   type:"newline-half",
  //   id:generateId(10),
  // },
]);
export const Beanshell=()=>{
  const[logs,setLogs]=useAtom(beanshellLogAtom);
  const bsh={
    log:(content,style="",decoration="")=>{
      setLogs([
        ...logs,
        {
          type:"log",
          id:generateId(10),
          contents:[
            {
              content,
              id:generateId(10),
              style,
              decoration,
            }
          ],
        },
      ]);
    }
  }
  useEffect(()=>{
    console.table(logs);
  },[logs]);
  const[OhMyBshStatus,setOhMyBshStatus]=useState(true);
  const[OhMyBshDir,setOhMyBshDir]=useState("~");
  const Eval=(x)=>{
    if(!x){
      setOhMyBshStatus(true);
      return;
    }
    const y=x.match(/(?:[^"\s]+|"(?:[^"]|\\")*")+/g);
    console.log(y);
    if(y){
      const cmd=y[0];
      const props=y.shift();
      switch(cmd){
        case "clear":
        case "cls":
          setOhMyBshStatus(true);
          setLogs([]);
        break;
        case "neofetch":
          setOhMyBshStatus(true);
          //mb7 neofetch art
          //         %%%%%     
          //        %%%%%%%    
          //  %%%%%%%%%%%%%%   
          // %%%%%%%%%%%%%%%%  
          //%%%%%%%%  %%%%%%%  
          //%%%%%%    %%%%%%   
          //%%%%%% %%%%%%%     
          //  %%% %   %%%%%%%  
          //      %    %%    % 
          //      %%%       %  
          //        %%%%%%%%   
          setLogs([
            ...logs,
            {type:"log",id:generateId(10),contents:[
              {content:`         %%%%%       `,id:generateId(10),style: "text_red",},
              {content:`Admin`,id:generateId(10),style:"text_blue"},
              {content:`@`,id:generateId(10),style:"text_lightgray"},
              {content:`mb7`,id:generateId(10),style:"text_blue"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`        %%%%%%%      `,id:generateId(10),style: "text_red",},
              {content:`---------`,id:generateId(10),style:"text_gray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`  %%%%%%`,id:generateId(10),style: "text_blue",},{content:`%%%%%%%%     `,id:generateId(10),style: "text_red",},
              {content:`OS: `,id:generateId(10),style:"text_blue"},
              {content:`Beansite 7 x86_64`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:` %%%%%%%%`,id:generateId(10),style: "text_blue",},{content:`%%%%%%%%    `,id:generateId(10),style: "text_red",},
              {content:`Kernel: `,id:generateId(10),style:"text_blue"},
              {content:`4.23.3-mdnt-zen-1`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`%%%%%%%%  `,id:generateId(10),style: "text_blue",},{content:`%%%%%%%    `,id:generateId(10),style: "text_red",},
              {content:`Packages: `,id:generateId(10),style:"text_blue"},
              {content:`1172 (Beanman)`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`%%%%%%    `,id:generateId(10),style: "text_blue",},{content:`%%%%%%     `,id:generateId(10),style: "text_red",},
              {content:`Shell: `,id:generateId(10),style:"text_blue"},
              {content:`bsh 5.2.37`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`%%%%%% `,id:generateId(10),style: "text_blue",},{content:`%%%%%%%       `,id:generateId(10),style: "text_green",},
              {content:`DE: `,id:generateId(10),style:"text_blue"},
              {content:`GBEANE 4.2`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`  %%% `,id:generateId(10),style: "text_blue",},{content:`%   %%%%%%%    `,id:generateId(10),style: "text_green",},
              {content:`CPU: `,id:generateId(10),style:"text_blue"},
              {content:`shItel Celeron N4120`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`      %    %%    %   `,id:generateId(10),style: "text_green",},
              {content:`GPU: `,id:generateId(10),style:"text_blue"},
              {content:`shItel UHD Graphics 600`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`      %%%       %    `,id:generateId(10),style: "text_green",},
              {content:`Memory: `,id:generateId(10),style:"text_blue"},
              {content:`3578MiB / 2048Mib`,id:generateId(10),style:"text_lightgray"},
            ],},
            {type:"log",id:generateId(10),contents:[
              {content:`        %%%%%%%%     `,id:generateId(10),style: "text_green",},
            ],},
            {type:"log",id:generateId(10),contents:[
              `                     `,
              {content:"   ",style:"hl_red"},
              {content:"   ",style:"hl_redorange"},
              {content:"   ",style:"hl_orange"},
              {content:"   ",style:"hl_yellow"},
              {content:"   ",style:"hl_green"},
              {content:"   ",style:"hl_blue"},
            ],},
            {type:"log",id:generateId(10),contents:[
              `                     `,
              {content:"   ",style:"hl_cyan"},
              {content:"   ",style:"hl_purple"},
              {content:"   ",style:"hl_pink"},
              {content:"   ",style:"hl_black"},
              {content:"   ",style:"hl_gray"},
              {content:"   ",style:"hl_white"},
            ],},
          ]);
        break;
        default:
          setOhMyBshStatus(false);
          setLogs([
            ...logs,
            {
              type:"log",
              id:generateId(10),
              contents:[
                {
                  content:`${cmd} : The term '${cmd}' is not recognized. please check the spelling and try again.`,
                  id:generateId(10),
                  style: "text_red",
                },
              ],
            },
            {
              type:"log",
              id:generateId(10),
              contents:[
                {
                  content:`At line:1 char:1`,
                  id:generateId(10),
                  style: "text_red",
                },
              ]
            },
            {
              type:"log",
              id:generateId(10),
              contents:[
                {
                  content:`+ ${cmd}`,
                  id:generateId(10),
                  style: "text_red",
                },
              ]
            },
            {
              type:"log",
              id:generateId(10),
              contents:[
                {
                  content:`+ ${("~").repeat(cmd.length)}`,
                  id:generateId(10),
                  style: "text_red",
                },
              ]
            },
          ]);
      }
    }else{
      setOhMyBshStatus(false);
      return;
    }
  }
  const Log=({data:{
    type,
    id,
    contents,
  }})=>{
    return(<>
      {type=="log"?<div id={`bshline${id}`} className={`bshl ${type}`}>
        {contents.map((data,index)=>typeof data=="object"?
          <span key={index} style={{
            fontWeight: "decoration" in data?
              `${data.decoration.includes("b")?"bold":"auto"}`
            :"auto",
            fontStyle: "decoration" in data?
              `${data.decoration.includes("i")?"italic":"auto"}`
            :"auto",
            textDecoration: "decoration" in data?
              `${data.decoration.includes("u")?"underline":""}
              ${data.decoration.includes("s")?" line-through":""}`
              .replace(/(\r\n|\n|\r)/gm,"")
            :"auto",
          }} className={
          data.style?
          ["rainbow",...[
            "red",
            "pink",
            "purple",
            "blue",
            "cyan",
            "green",
            "yellow",
            "orange",
            "redorange",
            "black",
            "gray",
            "lightgray",
            "white",
          ].map(clr=>[`hl_${clr}`,`text_${clr}`]).flat()]
          .includes(data.style)?data.style:"":""}>
            {data.content}</span>
        :<span key={index}>{data}</span>)}
      </div>
      :type=="newline"?<br/>
      :type=="newline-half"?<br className="nlhalf"/>:null}
    </>);
  }
  return(<>
    <div id="BeanshellConsoleWrapper">
      {logs.map(data=>
        <Log data={data} key={data.id}/>)}
      <br className="nlhalf"/>
      <div className="bshl ohmybsh">
        <span className="startBlock">  Admin </span>
        <span className="midBlock"> 🗀{OhMyBshDir} </span>
        <span className={`endBlock ${OhMyBshStatus?"":"error"}`}> {OhMyBshStatus?"✓":"✕"} </span>
        <span> <input
          type="text"
          autoComplete="off"
          onChange={(e)=>{e.target.style.width=`${e.target.value.length + 1}ch`;}}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              Eval(e.target.value);
              e.target.value="";
              document.getElementById("BeanshellConsoleWrapper").scrollTop=
                document.getElementById("BeanshellConsoleWrapper").scrollHeight;
            }
          }}
          id="commandInput"/></span>
      </div>
    </div>
  </>);
}