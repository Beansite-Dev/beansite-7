import { useState } from 'react';
import './style/App.scss';
import { Helmet } from 'react-helmet-async';
import { AppWrapper, Window } from './sdk/sdk';
import { generateId } from "./sdk/modules/Lib";
import { useHotkeys } from 'react-hotkeys-hook';
const App=({})=>{
  const[debugMenuVisibility,setDebugMenuVisibility]=useState(false);
  useHotkeys('ctrl+`',(e)=>{
    e.preventDefault();
    setDebugMenuVisibility(!debugMenuVisibility);
  });
  return(<>
    <Helmet>
      <title>Beansite 7</title>
      <link rel="icon" type="image/svg+xml" href="" />
    </Helmet>
    <AppWrapper>
      <Window
        data={{
          title:"Test",
          icon:"/icons/15.ico",
          id:generateId(10),
          includeTitlebarButtons:["close","min","max"],
        }}>
          <h1>Hello, World!</h1>
      </Window>
    </AppWrapper>
  </>);
}
export default App;