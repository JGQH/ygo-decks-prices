import Uploader from './components/Uploader';
import { getText, getArray } from './aux/helper'
import { useState, useReducer } from 'react';

function Reducer(_, action) {
  switch (action.status) {
      case 'LOADING':
      case 'ERROR':
      case 'FINISHED':
          return action;
      default:
          throw new Error("Unmatched status of fetching");
  }
}

const App = () => {
  const [file, setFile] = useState(null);
  const [fetcher, dispatch] = useReducer(Reducer, {status:"IDLE"});

  async function getData() {
    try {
      const ydk = await getText(file);
      const ids = JSON.stringify({
        data:getArray(ydk)
      });

      dispatch({status:"LOADING", value:null});

      const response = await fetch(`${process.env.REACT_APP_BACK_END}/process_ydk`, {method:'POST', headers:{'Content-Type':'application/json'}, body:ids});
      const data = await response.json();

      dispatch({status:"FINISHED", value:data});
    } catch(error) {
      console.log(error);
      dispatch({status:"ERROR"})
    }
  }

  return (<>
    <Uploader file={file} setFile={setFile} getData={getData} />
    {fetcher.status === "LOADING" && <p>Loading ydk...</p>}
    {fetcher.status === "ERROR" && <p>Sorry, an error ocurred. Try again!</p>}
    {fetcher.status === "FINISHED" && JSON.stringify(fetcher.value)}
  </>);
}
export default App;