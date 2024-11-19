import { useState } from 'react';
import './style/App.scss';
import { Helmet } from 'react-helmet-async';
import { AppWrapper, Window } from './sdk/sdk';
const App=({})=>{
  return(<>
    <Helmet>
      <title>Beansite 7</title>
      <link rel="icon" type="image/svg+xml" href="" />
    </Helmet>
    <AppWrapper>
      <Window
        data={{
          title:"Test",
          icon:"",
          includeTitlebarButtons:["close","min","max"],
        }}>
          <h1>Hello, World!</h1>
      </Window>
    </AppWrapper>
  </>);
}
export default App;