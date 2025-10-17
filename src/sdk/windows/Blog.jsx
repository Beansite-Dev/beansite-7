import { motion } from "motion/react";
import { Tabs } from '@base-ui-components/react/tabs';
import { generateId } from "../modules/Lib";
import "../style/apps/Blog.scss";
const Posts=[
    //? release soon
    {
        title: "Improvments from XP",
        id: "improvefromxp",
        pinned: false,
        uuid: generateId(10),
        author: "Tyler",
        date: "10/15/2025",
        headerbg: "/wallpapers/dessert.png",
        content:<>
            <h1>Improvements</h1>
            <p>
                I figured since now we're out of beta,
                I might as well go over all the improvements and planned feature 
                thus far from XP. 
            </p>
            <p>
                For one, the efficiency is a LOT better. Comparing XP and 7, 7 loads
                up to 70% faster. It's codebase is also far more managable than XP, 
                and it uses better libraries. One of the major improvements was changing
                google related scripts, and using jotai over redux for global state management
            </p>
            <p>
                I'm also proud of the UI improvements. 7 scales way better on different monitors 
                and resolutions as a result of switching from using primarily vmin (which has scaling 
                issues) based on screen viewport ratios to rem and px, which scale better and look far 
                better. This also improves the accuracy. 
            </p>
        </>
    },
    {
        title: "First Entry",
        id: "init",
        pinned: true,
        uuid: generateId(10),
        author: "Tyler",
        date: "10/15/2025",
        headerbg: "/wallpapers/seeds.png",
        content:<>
            <h1>Hello Again</h1>
            <p>
                I figured since Beansite is starting to actually 
                take shape the way I'd liked it to, I figured it 
                was time I implemented a blog to it. I'm mostly 
                going to use this for changelogs and announcements, 
                but I could also give guides and other useful assets.
            </p>
            <p>
                I want to keep this relatively brief, and emphasize more 
                of the update content, which speaking of, I'm happy to 
                announce that we're out of beta and in production!
            </p>
        </>,
    }
];
export const Blog=({})=>{
    return(<>
        <motion.div id="BlogWrapper">
            <Tabs.Root 
                className="BlogTabRoot" 
                defaultValue={Posts.filter(itm=>itm.pinned)[0].uuid} 
                onValueChange={(e)=>console.log(e)}>
                    <Tabs.List className="BlogList">
                        {/* <Tabs.Tab className="BlogTab" value="overview">
                            Overview
                        </Tabs.Tab> */}
                        {Posts.map(data=><Tabs.Tab
                            className="BlogTab" 
                            value={data.uuid}
                            style={{backgroundImage:`
                                url("${data.headerbg}"),
                                linear-gradient(to left,#15151590,#20202050)
                            `}}
                            key={data.uuid}>
                                {data.title}
                                {/* <span className="bgspan" ></span> */}
                            </Tabs.Tab>)}
                        <Tabs.Indicator className="BlogIndicator" />
                    </Tabs.List>
                    {/* <Tabs.Panel className="BlogPanel" value="overview">
                        <h1>Overview</h1>
                    </Tabs.Panel> */}
                    {Posts.map(data=><Tabs.Panel
                        className="BlogPanel" 
                        value={data.uuid}
                        key={data.uuid}>
                            <motion.div className="BlogHeader">
                                <motion.h1>{data.title}</motion.h1>
                                {/* <hr/> */}
                                <motion.div className="RowWrap">
                                    <motion.span className="bauth">{data.author}</motion.span>
                                    <motion.span className="bullet">•</motion.span>
                                    <motion.span className="bdate">{data.date}</motion.span>
                                </motion.div>
                                <motion.div 
                                    style={{backgroundImage:`url("${data.headerbg}")`}}
                                    className="BlogHBG"></motion.div>
                            </motion.div>
                            {data.content}
                            <br/>
                            <span className="RowWrap">
                                <span style={{
                                    fontSize:".875rem",
                                    color:"#656565",
                                    width: "100%",
                                    textAlign:"center"}}>M1dnight © 2025 | All rights resverved</span>
                            </span>
                    </Tabs.Panel>)}
            </Tabs.Root>
        </motion.div>
    </>);
}