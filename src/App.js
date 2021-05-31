import axios from 'axios';
import { useRef } from 'react'
import { getText, getArray } from './aux/helper'
import { useHandler } from './aux/hooks'
import Uploader from './components/Uploader';
import Visualizer from './components/Visualizer';

const App = () => {
  const table = useRef(null);
  const [fetcher, dispatch] = useHandler();

  async function getYdkPrice(file) {
    try {
      const ydk = await getText(file);
      const ids = { data:getArray(ydk) };

      dispatch("UPLOADING", 0);

      const request = await axios.post(`${process.env.REACT_APP_BACK_END}/process_ydk`, ids, {
        headers: {'Content-Type':'application/json'},
        onUploadProgress: evt => {
          const pCompleted = Math.floor(100 * evt.loaded / evt.total);
          dispatch("UPLOADING", pCompleted)
        },
        onDownloadProgress: evt => {
          const pCompleted = Math.floor(100 * evt.loaded / evt.total);
          dispatch("DOWNLOADING", pCompleted)
        }
      })

      const data = request.data["data"];

      dispatch("FINISHED", data);
    } catch(error) {
      console.log(error);
      dispatch("ERROR", error.toString());
    }
  }

  return (<>
    <div className="uploader-container">
      <h1>YGO Decks Prices</h1>
      <Uploader getYdkPrice={getYdkPrice} isShowing={fetcher.status === "FINISHED"} refTable={table} />
    </div>
    <div className="visualizer-container">
      {fetcher.status === "IDLE" && <p>No info yet, try uploading a .ydk file!</p>}
      {fetcher.status === "UPLOADING" && <p>Uploading ydk ({fetcher.value}%)...</p>}
      {fetcher.status === "DOWNLOADING" && <p>Downloading prices ({fetcher.value}%)...</p>}
      {fetcher.status === "ERROR" && <p>Sorry, an error ocurred. Try again! (<i>{fetcher.value}</i>)</p>}
      {fetcher.status === "FINISHED" && <Visualizer reference={table} data={fetcher.value} />}
    </div>
  </>);
}
export default App;