import { useSelector } from "react-redux";
import  "../style/Taskbar.scss";
import { motion } from "motion/react";
import { useEffect } from "react";
import { generateId } from "./Lib";
export const Taskbar=({})=>{
    const Window=useSelector(state=>state.win);
    useEffect(()=>{
        console.table(Window);
    },[Window]);
    return(<>
        <motion.div 
            id="Taskbar" 
            initial={{y:5,opacity:0}} 
            transition={{duration:.35,}}
            animate={{y:0,opacity:1,}}>
                <motion.div id="tb_itemWrapper">
                    <motion.button className="item" id="startButton"></motion.button>
                    {Window.map((data,index)=>
                        <motion.button 
                            style={{
                                backgroundImage:`url("${data?data.icon:'/icons/15.ico'}")`,
                            }}
                            className="item open"
                            key={`${data?data.id:generateId(10)}_${btoa("tbi")}`}>
                                <motion.div className="tooltip">
                                    {data?data.title:""}
                                </motion.div>
                            </motion.button>)}
                </motion.div>
        </motion.div>
    </>);
}