import tips from "../store/tips";
import { useEffect, useState } from "react";
import "../style/LoadingScreen.scss";
import { motion } from "motion/react";
export const LoadingScreen=()=>{
    const shuffle = (array) => { 
        for (let i=array.length-1;i>0;i--) { 
          const j=Math.floor(Math.random()*(i + 1)); 
          [array[i],array[j]]=[array[j],array[i]]; 
        } return array; 
    };
    const shuffledTips=shuffle(shuffle(tips));
    let i=0;
    const[tip,setTip]=useState(shuffledTips[i]);
    const tipsInterval=setInterval(()=>{
        i++;setTip(shuffledTips[i]);},5000);
    useEffect(() => {
        const onPageLoad=()=>{
            if(document.getElementById("loading")){
                setTimeout(()=>{clearInterval(tipsInterval);},1000);
                document.getElementById("loading").classList.add("fadeout");
                setTimeout(()=>{document.getElementById("loading").style.display="none";},1000);
            }
        };
        if(document.readyState === 'complete'){onPageLoad();}else{
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    },[]);
    return(<motion.div id="loading">
        <motion.div id="loadingIcon">
          <motion.div id="li_c1"></motion.div>
          <motion.div id="li_c2"></motion.div>
          <motion.div id="li_c3"></motion.div>
          <motion.div id="li_c4"></motion.div>
        </motion.div>
        <motion.p id="sBS">Starting Beansite</motion.p>
        <motion.p id="loadingTips">{tip}</motion.p>
  </motion.div>);
};