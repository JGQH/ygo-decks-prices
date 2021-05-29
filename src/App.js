import axios from 'axios';
import Uploader from './components/Uploader';
import { getText, getArray } from './aux/helper'
import { useState, useReducer } from 'react';
import Visualizer from './components/Visualizer';

function Reducer(_, action) {
  switch (action.status) {
      case 'DOWNLOADING':
      case 'UPLOADING':
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
      const ids = { data:getArray(ydk) };

      dispatch({status:"UPLOADING", value:0});

      const request = await axios.post(`${process.env.REACT_APP_BACK_END}/process_ydk`, ids, {
        headers: {'Content-Type':'application/json'},
        onUploadProgress: evt => {
          const pCompleted = Math.floor(100 * evt.loaded / evt.total);
          dispatch({status:"UPLOADING", value:pCompleted})
        },
        onDownloadProgress: evt => {
          const pCompleted = Math.floor(100 * evt.loaded / evt.total);
          dispatch({status:"DOWNLOADING", value:pCompleted})
        }
      })

      const data = request.data["data"];

      dispatch({status:"FINISHED", value:data});
    } catch(error) {
      console.log(error);
      dispatch({status:"ERROR", value:error.toString()})
    }
  }

  return (<>
    <div className="uploader-container">
      <h1>YGO Decks Prices</h1>
      <Uploader file={file} setFile={setFile} getData={getData} />
    </div>
    <div className="visualizer-container">
      {fetcher.status === "IDLE" && <p>No info yet, try uploading a .ydk file!</p>}
      {fetcher.status === "UPLOADING" && <p>Uploading ydk ({fetcher.value}%)...</p>}
      {fetcher.status === "DOWNLOADING" && <p>Downloading prices ({fetcher.value}%)...</p>}
      {fetcher.status === "ERROR" && <p>Sorry, an error ocurred. Try again! (<i>{fetcher.value}</i>)</p>}
      {fetcher.status === "FINISHED" && <Visualizer data={fetcher.value} />}
    </div>
  </>);
}
export default App;