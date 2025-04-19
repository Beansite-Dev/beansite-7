import { transform } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./solaris.scss";
export const OpenSolaris=atom(false);
export const Solaris=({})=>{
    const[isOpen,_]=useAtom(OpenSolaris);
    const Payload=({})=>{
        const Payload1_Color=()=>{
            document.getElementById("lsdFilter1").classList.add("lsd");
            document.getElementById("lsdFilter2").classList.add("lsd-s");
            document.getElementById("lsdFilter3").classList.add("lsd-l");
            var all=document.getElementsByTagName("*");
            for(var i=0,max=all.length;i<max;i++){
                if(all[i].innerHTML){
                    all[i].style.fontFamily=`glitch${Math.round(Math.random()*9)+1}`;
                    var clr=()=>`#${Math.round(Math.random()*255).toString(16)}${Math.round(Math.random()*255).toString(16)}${Math.round(Math.random()*255).toString(16)}`;
                    var per=(start,end)=>`${Math.round(Math.random()*end-start)+start}%`;
                    all[i].style.color=clr();
                    // var map=(new Array(Math.round(Math.random()*3)+1)).map((i)=>`${clr()},`);
                    var lg=`linear-gradient(
                        ${Math.round(Math.random()*360)}deg,
                        ${clr()} ${per(0,33)},
                        ${clr()} ${per(33,66)},
                        ${clr()} ${per(66,100)})`;
                    console.log(lg);
                    all[i].style.background=lg;
                    all[i].style.borderColor=clr();
                    all[i].style.opacity=`${Math.round(Math.random()*10)+90}`;
                    all[i].style.borderWidth=`${Math.round(Math.random()*4)+1}px`;
                    // all[i].style.fontWeight=`${Math.round(Math.random()*9)+1}00`;
                }
            }
        }
        useEffect(()=>{
            setInterval(()=>{Payload1_Color();},100);
        },[]);
        return(<> 
            {createPortal(<>
                <div id="lsdFilter1" className="screen_filter"></div>
                <div id="lsdFilter2" className="screen_filter"></div>
                <div id="lsdFilter3" className="screen_filter"></div>
            </>,document.body)}
        </>);
    }
    return(isOpen?<Payload/>:null);
}