import { atom, useAtom } from "jotai";
import { motion } from "motion/react";
import { generateId } from "../modules/Lib";
import "../style/Beanshell.scss";
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
      "! To get started, type ",
      {
        content:`"help"`,
        decoration:"i"
      },
    ]
  }
]);
export const Beanshell=()=>{
  const[logs,setLogs]=useAtom(beanshellLogAtom);
  const Log=({data:{
    type,
    id,
    contents,
  }})=>{
    return(<>
      <div id={`bshline${id}`} className={`bshl ${type}`}>
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
          }} className={data.style?["rainbow"].includes(data.style)?data.style:"":""}>
            {data.content}</span>
        :<span key={index}>{data}</span>)}
      </div>
    </>)
  }
  return(<>
    <div id="BeanshellConsoleWrapper">
      {logs.map(data=><Log data={data} key={data.id}/>)}
    </div>
  </>);
}